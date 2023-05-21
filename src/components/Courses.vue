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
        v-for="course in getCourses"
        :key="course.id"
        :id="course.id"
        @click="goToCourse(course.id)"
        v-cloak
      >
        <div class="course__name">
          {{ course.name }}
        </div>
        <Controls
            class="controls"
            :theme="theme"
          >
            <div
              class="controls__delete"
              @click.stop="deleteAssignment(assignment.id)"
            >
              <img
                :src="require(`@/assets/img/icons/delete/delete_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
                alt="delete"
              >
            </div>
          </Controls>
      </div>
      <div class="course__no-items">You don't have any courses yet :(</div>
    </div>
  </CoursesBlock>
</template>

<script>
import { CoursesBlock, TitleBlock, NewItemBlock, Controls } from "../styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Courses',
  components: {
    CoursesBlock, TitleBlock, NewItemBlock, Controls
  },
  props: {
  },
  emits: [],
  inject: ['theme', 'themeInfo', 'goTo'],
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
    addCourse() {
      console.log("add_course triggered")
    },
  },
  computed: {
    ...mapGetters(['getCourses']),
  },
}
</script>
