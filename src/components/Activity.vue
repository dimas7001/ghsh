<template>
  <ActivityBlock
    :theme="theme"
  >
    <SubtitleBlock>Repo Activity Chart</SubtitleBlock>
    <span v-html="chartData"></span>
    <canvas
      class="activity__chart"
      id="activityChart"
    ></canvas>
  </ActivityBlock>
</template>

<script>
import {
  ActivityBlock,
  SubtitleBlock
} from "../styles/styledBlocks.js"
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'Activity',
  components: {
    ActivityBlock, SubtitleBlock
  },
  props: {
    repoActivity: Array,
  },
  data() {
    return {
      chartInstance: '',
      chartContext: '',
    }
  },
  inject: ['theme'],
  computed: {
    chartSettings() {
      return {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            data: [12, 19, 3, 5, 22, 13],
            borderWidth: 2,
            fill: true,
            cubicInterpolationMode: 'monotone',
            backgroundColor: `${this.theme.highlights + '30'}`,
            borderColor: this.theme.highlights,
            pointBackgroundColor: this.theme.highlights,
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
                color: this.theme.secondary,
                font: {
                  weight: 600,
                },
              },
              ticks: {
                color: this.theme.secondary,
              },
              grid: {
                display: false,
                color: `${this.theme.highlights + '20'}`,
              },
              border: {
                color: `${this.theme.highlights + '30'}`,
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of commits',
                color: this.theme.secondary,
                font: {
                  weight: 600,
                },
              },
              ticks: {
                color: this.theme.secondary,
              },
              grid: {
                display: false,
                color: `${this.theme.highlights + '20'}`,
              },
              border: {
                color: `${this.theme.highlights + '30'}`,
              },
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      }
    },
    chartData() {
      // let commitsArr = []
      // this.repoActivity
      //   .forEach(branch => commitsArr.push(...branch.commits))

      // let commitsDates = commitsArr
      //   .map(commit => !commitsArr.some(commitInfo => commit === commitInfo))

      // commitsDates = commitsArr.sort()


      // console.log(commitsDates)
      return 1
    },
  },
  mounted() {
    this.chartContext = document.getElementById('activityChart')
    this.chartInstance = new Chart(this.chartContext, this.chartSettings)
  },
  watch: {
    theme() {
      this.chartInstance.destroy()
      this.chartInstance = new Chart(this.chartContext, this.chartSettings)
    },
  },
}
</script>