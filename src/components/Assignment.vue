<template>
  <AssignmentBlock
    :theme="theme"
  >
    <div class="assignment">
      <div class="assignment__group">
        <TitleBlock>{{ currentAssignment.title }}</TitleBlock>
        <div class="assignment__btn">Edit</div>
      </div>
      <div class="assignment__description">{{ currentAssignment.description }}</div>
      <div class="assignment__details">
        <div class="assignment__grade">
          <span
            v-if="getUserIsStudent"
          >{{ currentGrade + '/' + currentAssignment.max_point }} points</span>
          <span
            v-else
          >max. {{ currentAssignment.max_point }} points</span>
        </div>
        <div class="assignment__dates">{{ formatDate(currentAssignment.startDate) + ' – ' + formatDate(currentAssignment.endDate) }}</div>
      </div>
    </div>
  </AssignmentBlock>
  <AssignmentAnswer
    v-if="getUserIsStudent"
    :update-current-grade="updateCurrentGrade"
  />
  <StudentsAnswers
    v-else
  />
</template>

<script>
import StudentsAnswers from '@/components/StudentsAnswers.vue'
import AssignmentAnswer from '@/components/AssignmentAnswer.vue'
import {
  AssignmentBlock,
  TitleBlock
} from "../styles/styledBlocks.js"
import { mapGetters } from 'vuex'

export default {
  name: 'Assignment',
  components: {
    StudentsAnswers, AssignmentAnswer, AssignmentBlock, TitleBlock
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'formatDate'],
  data() {
    return ({
      currentGrade: '-',
      assignment: {
        "id": 1,
        "title": "Database Fundamentals",
        description: "Mummichog; orange roughy mora deep sea anglerfish bluntnose knifefish Chinook salmon titan triggerfish, brook lamprey?",
        "startDate": "2023-01-08T12:30:00.000+00:00",
        "endDate": "2023-01-08T12:30:00.000+00:00",
        "max_point": 8.0
      },
    })
  },
  methods: {
    updateCurrentGrade(grade) {
      this.currentGrade = grade
    },
  },
  computed: {
    ...mapGetters(['getUserIsStudent']),
    currentAssignment() {
      return this.assignment
    },
  },
}
</script>
