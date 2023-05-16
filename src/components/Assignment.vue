<template>
  <AssignmentBlock
    :theme="theme"
  >
    <div class="assignment">
      <div class="assignment__group">
        <TitleBlock>{{ currentAssignment.name }}</TitleBlock>
        <div class="assignment__btn">Edit</div>
      </div>
      <div class="assignment__description">{{ currentAssignment.description }}</div>
    </div>
  </AssignmentBlock>
  <AssignmentAnswer
    v-if="getUserRole === 'student'"
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
  inject: ['theme'],
  data() {
    return ({
      
    })
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(['getAssignment', 'getUserRole']),
    currentAssignment() {
      return this.getAssignment(this.$route.params.assignmentID)
    },
  },
}
</script>
