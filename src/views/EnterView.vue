<template>
  <Body>
    <Login
      v-if="ifRouteNameIs(['login'])"
    />
    <Registration
      v-if="ifRouteNameIs(['registration'])"
      @toggle-alert="toggleAlert"
    />
    <CompleteRegistration
      v-if="ifRouteNameIs(['complete_registration'])"
    />
    <Alert
      :alert-info="alertInfo"
      @toggle-alert="toggleAlert"
    />
  </Body>
</template>

<script>
import { Body, Container } from "@/styles/styledBlocks.js"
import Login from '@/components/entry/Login.vue'
import Registration from '@/components/entry/Registration.vue'
import CompleteRegistration from '@/components/entry/CompleteRegistration.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: 'EnterView',
  components: {
    Body, Container, Login, Registration, CompleteRegistration, Alert
  },
  data() {
    return {
      alertInfo: {
        alertActive: false,
        alertMessage: '',
      },
    }
  },
  inject: ['ifRouteNameIs', 'goTo'],
  methods: {
    toggleAlert(message = '') { //show/hide alert block
      this.alertInfo.alertMessage = message
      this.alertInfo.alertActive = message !== ''
    },
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>
