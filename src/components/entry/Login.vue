<template>
  <LoginBlock>
    <div class="login">
      <form
        class="login__form"
        @submit="login"
      >
        <input
          class="login__name"
          placeholder="Your login please"
          name="login"
          type="text"
          autocomplete="on"
          v-model="loginData.username"
        >
        <input
          class="login__password"
          placeholder="And password"
          name="password"
          type="password"
          autocomplete="on"
          v-model="loginData.password"
        >
        <div
          class="login__submit"
          :class="{'login__submit_inactive': !formDataFull}"
          @click="login"
        >
          Enter
        </div>
      </form>
      <div class="login__or">or</div>
      <div
        class="login__registration"
        @click="goTo({ name: 'registration' })"
      >
        Register ⇛
      </div>
    </div>
  </LoginBlock>
</template>

<script>
import { LoginBlock } from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import { sendPOST, sendGET } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Login',
  components: {
    LoginBlock
  },
  data() {
    return ({
      loginData: {
        username: '',
        password: ''
      },
      access_token: ''
    })
  },
  inject: ['ifRouteNameIs', 'goTo'],
  methods: {
    ...mapMutations(['SET_USER_TOKENS', 'SET_USER_IS_STUDENT']),
    async login() {
      await sendPOST(endpoints.login, {}, this.loginData)
      .then(res => {
        if (res.access_token) {
          this.SET_USER_TOKENS(res)
          this.getRole()
        }
      })
    },
    async getRole() {
      await sendGET(endpoints.role, {"Authorization": `Bearer ${this.getAccessToken}`})
      .then(res => {
        if (res) {
          this.SET_USER_IS_STUDENT(res.role === 'student' ? true : false)
          this.goTo({ name: 'courses' })
        }
      })
    },
    // getGHAccessToken() {
      // await sendGET("http://25.59.188.46:8080/api/v1/student/github/provide-access", {"Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbi10eXBlIjoiYWNjZXNzLXRva2VuIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfU1RVREVOVCJ9XSwic3ViIjoiam9obiIsImlhdCI6MTY4NDY2NTQ3MCwiZXhwIjoxNjg1MjY1NDcwfQ.msVDXeBd4wetaaG_rwVjVb4zQW0nMgSTPPtg7J9THFA`}
      // )
      // .then(res => {
      //   if (res) {
      //     console.log(res)
      //     // window.open(URL, "_target")
      //   }
      // })

    //   fetch("http://25.59.188.46:8080/api/v1/student/github/provide-access", {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbi10eXBlIjoiYWNjZXNzLXRva2VuIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfU1RVREVOVCJ9XSwic3ViIjoiam9obiIsImlhdCI6MTY4NDY2NTQ3MCwiZXhwIjoxNjg1MjY1NDcwfQ.msVDXeBd4wetaaG_rwVjVb4zQW0nMgSTPPtg7J9THFA"
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(res => console.log(res))
    //   .catch(e => console.error(e))
    // }
  },
  computed: {
    ...mapGetters(['getAccessToken']),
    formDataFull() {
      return this.loginData.username && this.loginData.password
    }
  },
}
</script>
