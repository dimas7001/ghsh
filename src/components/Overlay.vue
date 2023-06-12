<template>
  <OverlayBlock :theme="theme">
    <div
      class="overlay"
      :class="{'overlay_hidden': overlayHidden}"
      @click.self="$emit('toggle-overlay')"
    >
      <form
        class="overlay__form"
        @submit.prevent="joinCourse"
      >
        <SubtitleBlock>Join Course by ID</SubtitleBlock>
        <input
          class="overlay__course-id"
          placeholder="Course ID"
          type="number"
          min="0"
          v-model="courseID"
        >
        <div
          class="overlay__submit"
          :class="!courseID ? 'overlay__submit_inactive' : ''"
          @click="joinCourse"
        >Join Course</div>
      </form>
    </div>
  </OverlayBlock>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { OverlayBlock, SubtitleBlock } from "@/styles/styledBlocks.js"
import { sendPOST, sendGET } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Overlay',
  components: {
    OverlayBlock, SubtitleBlock
  },
  props: {
    overlayHidden: Object
  },
  emits: ['toggle-overlay', 'toggle-alert', 'update-courses'],
  inject: ['theme'],
  data() {
    return ({
      courseID: '',
    })
  },
  methods: {
    async joinCourse() {
      await sendPOST(endpoints.joinCourse(this.courseID), {"Authorization": `Bearer ${this.getAccessToken}`}, {})
      .then(res => {
        if (res.successful_action) {
          this.$emit('toggle-overlay')
          this.$emit('toggle-alert', "You joined a new course")
          this.$emit('update-courses')
        } else {
          this.$emit('toggle-alert', "Oups... Something went wrong :(")
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserIsStudent']),
  },
  watch: {

  },
}
</script>