<template>
  <SettingsBlock
    :theme="theme"
  >
    <TitleBlock>Your Personal Settings</TitleBlock>
    <div class="settings__section">
      <SubtitleBlock>Profile Info</SubtitleBlock>
      <form>
        <div class="settings__input-group">
          <input
            placeholder="First name"
            type="text"
            v-model="profileInfo.firstname"
          >
          <input
            placeholder="Second name"
            type="text"
            v-model="profileInfo.lastname"
          >
        </div>
        <div class="settings__input-group">
          <input
            placeholder="Group"
            type="text"
            v-if="getUserIsStudent"
            v-model="profileInfo.group"
          >
          <input
            type="date"
            pattern="\d{2}-\d{2}-\d{4}"
            v-model="profileInfo.birthday"
          >
        </div>
        <input
          placeholder="Email"
          type="email"
          v-model="profileInfo.email"
        >
        <input
          placeholder="Telegram tag"
          type="text"
          v-model="profileInfo.telegram_contact"
        >
        <div
          class="settings__btn"
          :class="{'settings__btn_inactive': !ifProfileInfoChanged}"
          @click="updateProfileInfo"
        >
          Update Profile Info
        </div>
      </form>
    </div>
    <div class="settings__section">
      <SubtitleBlock>GitHub Access</SubtitleBlock>
      <form>
        <input
          placeholder="Your GitHub Token"
          type="text"
          v-model="github_access_token"
        >
        <div class="settings__input-group">
          <div
            class="settings__btn"
            @click="getGHAccessToken"
          >Start GitHub Authorization</div>
          <div
            class="settings__btn"
            :class="{'settings__btn_inactive': !github_access_token}"
            @click="sendGHAccessToken"
          >Save GitHub Access Token</div>
        </div>
      </form>
    </div>
  </SettingsBlock>
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
  SettingsBlock
} from "@/styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import { sendPOST, sendGET, sendPUT } from "@/requests/requests"
import endpoints from "@/requests/endpoints"
import axios from 'axios'

export default {
  name: 'Settings',
  components: {
    StudentsAnswers, AssignmentBlock, TitleBlock, SubtitleBlock, AnswerInfoBlock, Activity, Commits, SettingsBlock
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'routeParams'],
  data() {
    return ({
      github_access_token: "",
      profileInfo: {
        "id": 1,
        "firstname": "John",
        "lastname": "Doe",
        "group": "Group A",
        "email": "johndoe@example.com",
        "telegram_contact": "@johndoe",
        "birthday": "2023-01-08",
        "passed_tasks": []
      },
      oldProfileInfo: {},
    })
  },
  methods: {
    async uploadProfileInfo() {
      await sendGET(
        this.getUserIsStudent ?
        endpoints.profilePersonalStudent :
        endpoints.profilePersonalTeacher,
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          this.profileInfo = res
          Object.entries(res).forEach(item => this.oldProfileInfo[item[0]] = item[1])
        }
      })
    },
    async updateProfileInfo() {
      await sendPUT(
        this.getUserIsStudent ?
        endpoints.profilePersonalStudentEdit :
        endpoints.profilePersonalTeacherEdit,
        {"Authorization": `Bearer ${this.getAccessToken}`},
        this.profileInfo
      )
      .then(res => {
        if (res) {
          console.log('registration worked')
          this.uploadProfileInfo()
        }
      })
    },
    async getGHAccessToken() {
      await sendGET(
        this.getUserIsStudent ?
        endpoints.provideGHAccessStudent :
        endpoints.provideGHAccessTeacher,
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          console.log(res)
          window.open(res.auth, "_target")
        }
      })
    },
    async sendGHAccessToken() {
      await sendPOST(
        this.getUserIsStudent ?
        endpoints.saveGHAccessStudent :
        endpoints.saveGHAccessTeacher,
        {"Authorization": `Bearer ${this.getAccessToken}`},
        {"github_access_token": this.github_access_token}
      )
      .then(res => {
        if (res.successful_action) {
          console.log(res)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getUserIsStudent', 'getAccessToken']),
    ifProfileInfoChanged() {
      let info = Object.values(this.profileInfo),
          oldInfo = Object.values(this.oldProfileInfo)
      for (let i = 0; i < info.length; i++)
        if (info[i] !== oldInfo[i])
          return true
      return false
    },
  },
  async mounted() {
    this.uploadProfileInfo()
    //Object.entries(this.profileInfo).forEach(item => this.oldProfileInfo[item[0]] = item[1]) //line only for development
  }
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
