<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
    integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <router-view />
</template>

<script>
  import { computed } from 'vue'
  // add function that gets values from localStorage, store a complete state in localStorage
  
  export default {
    methods: {
      ifRouteNameIs(arr) {
        let res = false,
            routeName = this.getRoute

        arr.forEach(sbstr => {
          if (routeName === sbstr)
            res = true
        })

        return res
      },
      goTo(here) {
        this.$router.push(here)
      },
      formatDate(date) {
        if (date)
          return date.substring(0, 10).replaceAll('-','/')
        else
          return ''
      },
    },
    computed: {
      getRoute() {
        return this.$route.name
      },
      routeParams() {
        return this.$route.params
      },
    },
    provide() {
      return {
        ifRouteNameIs: this.ifRouteNameIs,
        goTo: this.goTo,
        formatDate: this.formatDate,
        routeParams: computed(() => this.routeParams),
      }
    },
  }
</script>

<style lang="sass">
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-Black.ttf")
    font-weight: 900
    font-style: normal
    font-display: swap
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-ExtraBold.ttf")
    font-weight: 800
    font-style: normal
    font-display: swap
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-Bold.ttf")
    font-weight: 700
    font-style: normal
    font-display: swap
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-SemiBold.ttf")
    font-weight: 600
    font-style: normal
    font-display: swap
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-Medium.ttf")
    font-weight: 500
    font-style: normal
    font-display: swap
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-Regular.ttf")
    font-weight: 400
    font-style: normal
    font-display: swap
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-Light.ttf")
    font-weight: 300
    font-style: normal
    font-display: swap
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-ExtraLight.ttf")
    font-weight: 200
    font-style: normal
    font-display: swap
  @font-face
    font-family: "NotoSans"
    src: url("assets/fonts/NotoSans/NotoSans-Thin.ttf")
    font-weight: 100
    font-style: normal
    font-display: swap
  *
    box-sizing: border-box
  [v-cloak]
    display: none
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0
  input[type=number]
    -moz-appearance: textfield
</style>
