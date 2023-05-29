<template>
  <CoursesBlock
    :theme="theme"
  >
    <TitleBlock>Your Courses</TitleBlock>
    <NewItemBlock
      :theme="theme"
      class="courses__create"
      @click="addCourse"
    />
    <div class="courses__wrapper">
      <div
        class="course"
        v-for="course in currentCourses"
        :key="course.id"
        :id="course.id"
        @click="goToCourse(course.id)"
        v-cloak
      >
        <div class="course__block">
          <div class="course__name">
            {{ course.title }}
          </div>
          <div class="course__teacher">
            {{ course.educator }}
          </div>
        </div>
        <div class="course__block course__block_dates">
          <div class="course__date">
            {{ formatDate(course.start_date) }}
          </div>
          <div class="course__date-separator"></div>
          <div class="course__date">
            {{ formatDate(course.end_date) }}
          </div>
        </div>
        <Controls
          class="controls"
          :theme="theme"
        >
          <div
            class="controls__edit"
            @click.stop="this.goTo({ name: 'edit_course', params: { courseID: `${course.id}` } })"
          >
            <img
              :src="require(`@/assets/img/icons/edit/edit_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
              alt="edit"
            >
          </div>
          <div
            class="controls__delete"
            @click.stop="deleteCourse(course.id)"
          >
            <img
              :src="require(`@/assets/img/icons/delete/delete_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
              alt="delete"
            >
          </div>
        </Controls>
      </div>
      <div class="course__no-items">
        You don't have any courses yet :(
      </div>
      <input type="text" v-model="joinCourseID">
        <span
          v-if="getUserIsStudent"
          @click="joinCourse"
        >||join to course ||</span>
    </div>
  </CoursesBlock>
</template>

<script>
import { CoursesBlock, TitleBlock, NewItemBlock, Controls } from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import { sendPOST, sendGET } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Courses',
  components: {
    CoursesBlock, TitleBlock, NewItemBlock, Controls
  },
  props: {
  },
  emits: [],
  inject: ['theme', 'themeInfo', 'goTo', 'formatDate'],
  data() {
    return ({
      joinCourseID: 0,
      courses: [
        {
          id: 1,
          "title": "Back-end",
          "description": "Course for Back-end developers",
          "educator": "Kostyantin Zhereb",
          "tasks": [
            {
              "id": 1,
              "title": "Database Fundamentals",
              description: "Learn the basics of database design and management",
              "start_date": "2023-01-08T12:30:00.000+00:00",
              "end_date": "2023-01-08T12:30:00.000+00:00",
              "max_point": 8.0
            },
            {
              "id": 2,
              "title": "SQL Queries",
              "description": "Learn how to write SQL queries to retrieve and manipulate data",
              "start_date": "2023-01-10T12:30:00.000+00:00",
              "end_date": "2023-01-15T12:30:00.000+00:00",
              "max_point": 9.0
            },
            {
              "id": 3,
              "title": "Server-side Scripting",
              "description": "Learn how to write server-side scripts using PHP",
              "start_date": "2023-01-16T12:30:00.000+00:00",
              "end_date": "2023-01-20T12:30:00.000+00:00",
              "max_point": 9.0
            },
            {
              "id": 4,
              "title": "API Development",
              "description": "Learn how to develop RESTful APIs for web applications",
              "start_date": "2023-01-21T12:30:00.000+00:00",
              "end_date": "2023-01-23T12:30:00.000+00:00",
              "max_point": 10.0
            },
            {
              "id": 5,
              "title": "Security and Authentication",
              "description": "Learn about web application security and authentication techniques",
              "start_date": "2023-01-24T12:30:00.000+00:00",
              "end_date": "2023-01-30T12:30:00.000+00:00",
              "max_point": 10.0
            }
          ],
          "start_date": "2023-01-08T12:30:00.000+00:00",
          "end_date": "2023-03-08T12:30:00.000+00:00"
        },
        {
          "id": 2,
          "title": "Back-end",
          "description": "Course for Back-end developers",
          "educator": "Kostyantin Zhereb",
          "tasks": [
            {
              "id": 1,
              "title": "Database Fundamentals",
              "description": "Learn the basics of database design and management",
              "start_date": "2023-01-08T12:30:00.000+00:00",
              "end_date": "2023-01-08T12:30:00.000+00:00",
              "max_point": 8.0
            },
            {
              "id": 2,
              "title": "SQL Queries",
              "description": "Learn how to write SQL queries to retrieve and manipulate data",
              "start_date": "2023-01-10T12:30:00.000+00:00",
              "end_date": "2023-01-15T12:30:00.000+00:00",
              "max_point": 9.0
            },
            {
              "id": 3,
              "title": "Server-side Scripting",
              "description": "Learn how to write server-side scripts using PHP",
              "start_date": "2023-01-16T12:30:00.000+00:00",
              "end_date": "2023-01-20T12:30:00.000+00:00",
              "max_point": 9.0
            },
            {
              "id": 4,
              "title": "API Development",
              "description": "Learn how to develop RESTful APIs for web applications",
              "start_date": "2023-01-21T12:30:00.000+00:00",
              "end_date": "2023-01-23T12:30:00.000+00:00",
              "max_point": 10.0
            },
            {
              "id": 5,
              "title": "Security and Authentication",
              "description": "Learn about web application security and authentication techniques",
              "start_date": "2023-01-24T12:30:00.000+00:00",
              "end_date": "2023-01-30T12:30:00.000+00:00",
              "max_point": 10.0
            }
          ],
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
      this.goTo({ name: 'create_course'})
    },
    async joinCourse() {
      await sendPOST(endpoints.joinCourse(this.joinCourseID), {"Authorization": `Bearer ${this.getAccessToken}`}, {})
      .then(res => {
        if (res.successful_action) {
          console.log('joined course')
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserIsStudent']),
    currentCourses() {
      return this.courses
    },
  },
  async mounted() {
    await sendGET(
      this.getUserIsStudent ? endpoints.coursesStudent : endpoints.coursesTeacher,
      {"Authorization": `Bearer ${this.getAccessToken}`}
    )
    .then(res => {
      if (res) {
        this.courses = res
      }
    })
  }
}
</script>
