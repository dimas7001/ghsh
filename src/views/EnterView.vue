<template>
  <Login
    v-if="ifRouteNameIs(['login'])"
  />
  <Registration
    v-if="ifRouteNameIs(['registration'])"
  />
</template>

<script>
import { Body, Container } from "@/styles/styledBlocks.js"
import Login from '@/components/Login.vue'
import Registration from '@/components/Registration.vue'

export default {
  name: 'EnterView',
  components: {
    Body, Container, Login, Registration
  },
  data() {
    return {
      
    }
  },
  inject: ['ifRouteNameIs', 'goTo'],
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    
  },
}
</script>
