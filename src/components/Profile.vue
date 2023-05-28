<template>
  
  <!-- for activity pass data with props -->
  <Activity
    :theme="theme"
  />
  <Commits
    :theme="theme"
  >
    <SubtitleBlock>Repo Activity Chart</SubtitleBlock>
  </Commits>
</template>

<script>
import StudentsAnswers from '@/components/StudentsAnswers.vue'
import Activity from '@/components/Activity.vue'
import Commits from '@/components/Commits.vue'
import {
  AssignmentBlock,
  TitleBlock,
  SubtitleBlock,
  AnswerInfoBlock,
} from "@/styles/styledBlocks.js"
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    StudentsAnswers, AssignmentBlock, TitleBlock, SubtitleBlock, AnswerInfoBlock, Activity, Commits
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme'],
  data() {
    return ({
      profileInfo: {}
    })
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(['getUserIsStudent']),
    currentAssignment() {
      return {}
    },
  },
}

// { profile for student
//     "id": 1,
//     "firstname": "John",
//     "lastname": "Doe",
//     "group": "Group A",
//     "age": 21,
//     "email": "johndoe@example.com",
//     "telegram_contact": "@johndoe",
//     "registration_date": "2023-01-08T12:30:00.000+00:00",
//     "passed_tasks": []
// }

// { profile for teacher
//     "id": 1,
//     "firstname": "Kostyantin",
//     "lastname": "Zhereb",
//     "email": "koszher@gmail.com",
//     "age": 33,
//     "telegram_contact": "zhereb"
// }


</script>

