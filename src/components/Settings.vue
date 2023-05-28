<template>
  <form>
    <br><br>
    <input
      class=""
      placeholder="First name"
      type="text"
      v-model="profileInfo.firstname"
    >
    <br>
    <input
      class=""
      placeholder="Second name"
      type="text"
      v-model="profileInfo.lastname"
    >
    <br>
    <input
      class=""
      placeholder="Group"
      type="text"
      v-model="profileInfo.group"
    >
    <br>
    <input
      class=""
      type="date"
      v-model="profileInfo.birthday"
    >
    <br>
    <input
      class=""
      placeholder="Email"
      type="email"
      v-model="profileInfo.email"
    >
    <br>
    <input
      class=""
      placeholder="Telegram tag"
      type="text"
      v-model="profileInfo.telegram_contact"
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
      profileInfo: {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "group": "Group A",
        "birthday": 21,
        "email": "johndoe@example.com",
        "telegram_contact": "@johndoe",
        "registration_date": "2023-01-08T12:30:00.000+00:00",
        "passed_tasks": []
      }
    })
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(['getUserIsStudent']),
    currentAssignment() {
      return {
        
      }
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
