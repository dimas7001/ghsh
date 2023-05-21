<template>
  <RegistrationBlock>
    <div class="login">
      <form
        class="registration__form"
        @submit.prevent="login"
      >
        <input
          class="registration__name"
          placeholder="Your name please"
          type="text"
          v-model="registrationData.name"
        >
        <input
          class="registration__name"
          placeholder="Surname"
          type="text"
          v-model="registrationData.surname"
        >
        <input
          class="registration__name"
          placeholder="Your group"
          type="text"
          v-model="registrationData.group"
        >
        <input
          class="registration__name"
          placeholder="Email"
          type="text"
          v-model="registrationData.email"
        >
        <input
          class="registration__name"
          placeholder="Your Telegram tag"
          type="text"
          v-model="registrationData.telegram"
        >
        <input
          class="registration__name"
          placeholder="Please repeat password"
          type="checkbox"
          id="is-teacher"
          v-model="registrationData.isTeacher"
        >
        <label for="is-teacher">Are you a techer?</label>
        <input
          class="registration__password"
          placeholder="Password"
          type="password"
          v-model="registrationData.password"
        >
        <input
          class="registration__password"
          placeholder="Please repeat password"
          type="password"
          v-model="registrationDataCheck.password"
        >
        <div
          class="registration__submit"
          :class="{'registration__submit_inactive': !formDataFull}"
          @click="login"
        >
          Register
        </div>
      </form>
      <div class="registration__or">or</div>
      <div
        class="registration__registration"
        @click="goTo({ name: 'login' })"
      >
        ⇚ Login
      </div>
    </div>
  </RegistrationBlock>
</template>

<script>
import { RegistrationBlock } from "@/styles/styledBlocks.js"

export default {
  name: 'Registration',
  components: {
    RegistrationBlock
  },
  data() {
    return ({
      registrationData: {
        name: '',
        surname: '',
        group: '',
        email: '',
        telegram: '',
        isTeacher: false,
        password: ''
      },
      registrationDataCheck: {
        password: '',
      }
    })
  },
  inject: ['ifRouteNameIs', 'goTo'],
  methods: {
    login() {
      this.goTo({ name: 'courses' })
    }
  },
  computed: {
    formDataFull() {
      return this.name && this.password
    }
  }
}
</script>
