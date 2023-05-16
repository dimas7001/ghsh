<template>
  <ActivityBlock>
    <SubtitleBlock>Repo Activity Chart</SubtitleBlock>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </ActivityBlock>
</template>

<script>
import {
  ActivityBlock,
  SubtitleBlock
} from "../styles/styledBlocks.js"
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'Activity',
  components: {
    ActivityBlock, SubtitleBlock, Bar
  },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>