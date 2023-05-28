<template>
  <form>
    <br><br>
    <input
      class=""
      placeholder="Assignment name"
      type="text"
      v-model="assignment.title"
    >
    <br>
    <input
      class=""
      placeholder="Assignment description"
      type="text"
      v-model="assignment.description"
    >
    <br>
    <input
      class=""
      placeholder="Assignment max. grade"
      type="number"
      v-model="assignment.max_point"
    >
    <br>
    <input
      class=""
      type="date"
      v-model="assignment.startDate"
    >
    <br>
    <input
      class=""
      type="date"
      v-model="assignment.endDate"
    >
    <br>
    <input
      class=""
      placeholder="Assignment files inspections"
      type="text"
      v-model="inspections"
    >
    <br><br>
    <div
      class="btn"
      @click="login"
    >
      ||Send||
    </div>
  </form>
</template>

<script>
import StudentsAnswers from '@/components/StudentsAnswers.vue'
import AssignmentAnswer from '@/components/AssignmentAnswer.vue'
import {
  AssignmentBlock,
  TitleBlock
} from "@/styles/styledBlocks.js"
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
      inspections: "README.md",
      assignment: {
        "id": 1,
        "title": "Database Fundamentals",
        description: "Mummichog; orange roughy mora deep sea anglerfish bluntnose knifefish Chinook salmon titan triggerfish, brook lamprey?",
        "startDate": "2023-01-08T12:30:00.000+00:00",
        "endDate": "2023-01-08T12:30:00.000+00:00",
        "max_point": 8.0,
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



//custom checks field as an input with " ;" separation
</script>
