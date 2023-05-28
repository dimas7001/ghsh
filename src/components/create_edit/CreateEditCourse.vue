<template>
  <form>
    <br><br>
    <input
      class=""
      placeholder="Course name"
      type="text"
      v-model="courses.title"
    >
    <br>
    <input
      class=""
      placeholder="Course descr"
      type="text"
      v-model="courses.description"
    >
    <br>
    <input
      class=""
      placeholder="Course name"
      type="date"
      v-model="courses.start_date"
    >
    <br>
    <input
      class=""
      placeholder="Course name"
      type="date"
      v-model="courses.end_date"
    >
    <br><br>
    <div
      class="btn"
      @click="login"
    >
      ||Send||
    </div>
  </form>
</template>

<script>
import { CoursesBlock, TitleBlock, NewItemBlock, Controls } from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CreateEditCourse',
  components: {
    CoursesBlock, TitleBlock, NewItemBlock, Controls
  },
  props: {
  },
  emits: [],
  inject: ['theme', 'themeInfo', 'goTo', 'formatDate'],
  data() {
    return ({
      courses: [
        {
          id: 1,
          "title": "Back-end",
          "description": "Course for Back-end developers",
          "educator": "Kostyantin Zhereb",
          "start_date": "2023-01-08T12:30:00.000+00:00",
          "end_date": "2023-03-08T12:30:00.000+00:00"
        }
      ]
    })
  },
  methods: {
    ...mapMutations(['ADD_CURRENT_COURSE_ID']),
    goToCourse(id) {
      this.ADD_CURRENT_COURSE_ID(id)
      this.goTo({ name: 'course', params: { courseID: `${id}` } })
    },
    addCourse() {
      console.log("add_course triggered")
    },
  },
  computed: {
    currentCourses() {
      return this.courses
    },
  },
}

// { post, create course
//     "title": "Computer Science",
//     "description": "Computer Science description"
// }

// request to server only if route name is edit_course
</script>
