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
          v-model="loginData.name"
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
import { sendPOST } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Login',
  components: {
    LoginBlock
  },
  data() {
    return ({
      loginData: {
        name: '',
        password: ''
      }
    })
  },
  inject: ['ifRouteIncludes', 'goTo'],
  methods: {
    async login() {
      await sendPOST(endpoints.login, {}, this.loginData)
      .then(res => {
        if (res) this.goTo({ name: 'courses' })
      })
    }
  },
  computed: {
    formDataFull() {
      return this.loginData.name && this.loginData.password
    }
  },
}
</script>
