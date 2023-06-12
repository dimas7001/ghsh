<template>
  <CreateEditBlock
    :theme="theme"
  >
    <TitleBlock
      v-if="ifRouteNameIs(['create_course'])"
    >Create Course</TitleBlock>
    <TitleBlock
      v-else
    >Update Course</TitleBlock>
    <form>
      <input
        placeholder="Course name"
        type="text"
        v-model="newCourse.title"
      >
      <textarea
        class="create-edit__input_descr"
        placeholder="Course description"
        rows="5"
        v-model="newCourse.description"
      ></textarea>
      <div class="create-edit__input-group">
        <input
          type="date"
          v-model="newCourse.start_date"
        >
        <input
          type="date"
          v-model="newCourse.end_date"
        >
      </div>
      <div class="create-edit__input-group create-edit__input-group_hints">
        <span>Start Date</span>
        <span>End Date</span>
      </div>
      <div
        class="create-edit__btn"
        v-if="ifRouteNameIs(['create_course'])"
        @click="submit"
      >Create Course</div>
      <div
        class="create-edit__btn"
        v-else
        @click="submitUpdate"
      >Update Course</div>
    </form>
  </CreateEditBlock>
</template>

<script>
import { CoursesBlock, TitleBlock, NewItemBlock, Controls, CreateEditBlock } from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import { sendPOST, sendGET, sendPUT } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'CreateEditCourse',
  components: {
    CoursesBlock, TitleBlock, NewItemBlock, Controls, CreateEditBlock
  },
  props: {
  },
  emits: [],
  inject: ['theme', 'themeInfo', 'goTo', 'formatDate', 'ifRouteNameIs'],
  data() {
    return ({
      newCourse: {
        title: '',
        description: '',
        start_date: '',
        end_date: ''
      },
      course: [
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
    async submit() {
      await sendPOST(endpoints.createCourse, {"Authorization": `Bearer ${this.getAccessToken}`}, this.newCourse)
      .then(res => {
        if (res.id) {
          console.log(res)
          this.goTo({ name: 'courses' })
        }
      })
    },
    async submitUpdate() {
      await sendPUT(endpoints.editCourse(this.$route.params.courseID), {"Authorization": `Bearer ${this.getAccessToken}`}, this.getUpdatedCourse)
      .then(res => {
        if (res.successful_action) {
          console.log(res)
          this.goTo({ name: 'courses' })
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserIsStudent']),
    currentCourses() {
      return this.course
    },
    getUpdatedCourse() {
      return {
        title: this.newCourse.title,
        description: this.newCourse.description,
        start_date: this.newCourse.start_date,
        end_date: this.newCourse.end_date 
      }
    },
  },
  async mounted() {
    if (this.ifRouteNameIs(['edit_course']))
      await sendGET(
        endpoints.courseByIDTeacher(this.$route.params.courseID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res) {
          // res.start_date = this.formatDate(res.start_date)
          // res.end_date = this.formatDate(res.end_date)
          this.newCourse = this.course = res
        }
      })
  }
}

// { post, create course
//     "title": "Computer Science",
//     "description": "Computer Science description"
// }

// request to server only if route name is edit_course
</script>
