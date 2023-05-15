<template>
  <LoginBlock>
    <div class="login">
      <form
        class="login__form"
        @submit.prevent="login"
      >
        <input
          class="login__name"
          placeholder="Your login please"
          type="text"
          v-model="name"
        >
        <input
          class="login__password"
          placeholder="And password"
          type="password"
          v-model="password"
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

export default {
  name: 'Login',
  components: {
    LoginBlock
  },
  data() {
    return ({
      name: '',
      password: '',
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
