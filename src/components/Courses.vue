<template>
  <CoursesBlock
    :theme="theme"
  >
    <TitleBlock>Your Courses</TitleBlock>
    <div class="courses__wrapper">
      <div
        class="course"
        v-for="course in getCourses"
        :key="course.id"
        :id="course.id"
        @click="goToCourse(course.id)"
        v-cloak
      >
        <div class="course__name">
          {{ course.name }}
        </div>
      </div>
      <div class="course__no-items">You don't have any courses yet :(</div>
    </div>
  </CoursesBlock>
</template>

<script>
import { CoursesBlock, TitleBlock } from "../styles/styledBlocks.js"
import NewNote from '@/components/NewNote.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Courses',
  components: {
    CoursesBlock, TitleBlock, NewNote
  },
  props: {
  },
  emits: [],
  inject: ['theme', 'goTo'],
  data() {
    return ({
    })
  },
  methods: {
    ...mapMutations(['ADD_CURRENT_COURSE_ID']),
    goToCourse(id) {
      this.ADD_CURRENT_COURSE_ID(id)
      this.goTo({ name: 'course', params: { courseID: `${id}` } })
    },
  },
  computed: {
    ...mapGetters(['getCourses']),
  },
}
</script>
