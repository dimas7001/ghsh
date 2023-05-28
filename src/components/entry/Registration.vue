<template>
  <RegistrationBlock>
    <div class="registration">
      <form
        class="registration__form"
      >
        <label
          class="registration__checkbox-wrapper"
          title="Click to switch the role"
        >
          <span
            class="registration__checkbox-box"
            v-html="registrationData.isTeacher ? 'Teacher' : 'Student'"
          ></span>
          <input
            class="registration__checkbox"
            type="checkbox"
            v-model="registrationData.isTeacher"
          >
        </label>
        <input
          class="registration__field"
          placeholder="Your login please"
          type="text"
          v-model="registrationData.login"
        >
        <input
          class="registration__field"
          placeholder="Password"
          type="password"
          v-model="registrationData.password"
        >
        <input
          class="registration__field"
          placeholder="Please repeat password"
          type="password"
          v-model="registrationDataCheck.password"
        >
        <div
          class="registration__submit"
          :class="{'registration__submit_inactive': !formDataFull}"
          @click="register"
        >
          Register
        </div>
      </form>
      <div class="registration__or">or</div>
      <div
        class="registration__redirect"
        @click="goTo({ name: 'login' })"
      >
        ⇚ Login
      </div>
    </div>
  </RegistrationBlock>
</template>

<script>
import { RegistrationBlock } from "@/styles/styledBlocks.js"
import { sendPOST } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Registration',
  components: {
    RegistrationBlock
  },
  data() {
    return ({
      registrationData: {
        login: '',
        isTeacher: false,
        password: '',

      },
      registrationDataCheck: {
        password: '',
      }
    })
  },
  inject: ['goTo'],
  methods: {
    async register() {
      if (this.registrationData.password === this.registrationDataCheck.password) {
        await sendPOST(endpoints.register, {},
          {
            "username": this.registrationData.login,
            "password": this.registrationData.password,
            "confirmed_password": this.registrationDataCheck.password,
            "is_educator": this.registrationData.isTeacher
          }
        )
        .then(res => {
          if (res) {
            console.log('registration worked')
            this.goTo({ name: 'complete_registration' })
          }
        })
      } else {
        this.$emit('toggle-alert', 'Passwords are not the same')
      }
    }
  },
  computed: {
    formDataFull() {
      return this.registrationData.login && this.registrationData.password && this.registrationDataCheck.password
    }
  }
}
</script>
