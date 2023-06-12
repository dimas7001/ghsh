<template>
  <ActivityBlock
    :theme="theme"
  >
    <SubtitleBlock>Repo Activity Chart</SubtitleBlock>
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
} from "@/styles/styledBlocks.js"
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
      chartData: [],
      chartLabels: []
    }
  },
  inject: ['theme'],
  computed: {
    chartSettings() {
      console.log(this.chartLabels)
      console.log(this.chartData)

      return {
        type: 'line',
        data: {
          labels: ["5 days ago", "4 days ago", "3 days ago", "2 days ago", "1 day ago"],//this.chartLabels
          datasets: [{
            data: [2, 4, 3, 5, 1],//this.chartData
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
  },
  methods: {
    generateChartDataAndLabels() {
      const intervalsAmount = 10,
            msInDay = 1000 * 60 * 60 * 24

      let activity = this.repoActivity,
          repoActivityEnd = new Date(activity[0].date),
          repoActivityStart = new Date(activity[activity.length-1].date),
          repoTimeframe = Math.ceil(Math.abs(repoActivityEnd - repoActivityStart) / msInDay / intervalsAmount),
          caretIntervalEnd = new Date(repoActivityEnd.setHours(23,59,59,999)),
          caretIntervalStart = new Date(this.deductDays(caretIntervalEnd, repoTimeframe + 1).setHours(0,0,0,0)),
          data = [],
          labels = [],
          counter = 0

      for (let i = 0; i < intervalsAmount; i++) {
        if (repoActivityStart > caretIntervalEnd) break

        this.repoActivity.forEach(commit => {
          let commitDate = new Date(commit.date)

          if (commitDate > caretIntervalStart && commitDate <= caretIntervalEnd)
            counter++
        })

        labels.push(`
          ${caretIntervalStart.getDay()}
          ${caretIntervalStart.toLocaleString('default', { month: 'long' }).slice(0, 3)}
          ${`${caretIntervalStart.getFullYear()}`.slice(2, 4)}
        `)
        data.push(counter)
        counter = 0

        caretIntervalEnd = this.deductDays(caretIntervalEnd, repoTimeframe)
        caretIntervalStart = this.deductDays(caretIntervalStart, repoTimeframe)
      }

      this.chartLabels = data
      this.chartData = labels
    },
    addDays(date, days) {
      let newDate = new Date(date)
      newDate.setDate(date.getDate() + days);
      return newDate;
    },
    deductDays(date, days) {
      let newDate = new Date(date)
      newDate.setDate(date.getDate() - days);
      return newDate;
    },
  },
  mounted() {
    this.generateChartDataAndLabels()
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