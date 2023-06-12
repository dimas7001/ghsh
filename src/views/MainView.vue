<template>
  <Body :theme="getCurrentTheme">
    <Header
      :sidebar-hidden="sidebarHidden"
      @toggle-sidebar="toggleSidebar"
      @update-theme="updateTheme"
      @update-theme-mode="updateThemeMode"
    />
    <Sidebar
      :sidebar-hidden="sidebarHidden"
    />
    <Container
      :class="{'container_s': !sidebarHidden}"
      :theme="getCurrentTheme"
    >
      <Courses
        v-if="ifRouteNameIs(['courses'])"
        @toggle-overlay="toggleOverlay"
        :courses-update-flag="coursesUpdateFlag"
      />
      <Workflow
        v-if="ifRouteNameIs(['course'])"
        @toggle-alert="toggleAlert"
      />
      <Assignment
        v-if="ifRouteNameIs(['assignment'])"
      />
      <StudentsList
        v-if="ifRouteNameIs(['students'])"
      />
      <Statistics
        v-if="ifRouteNameIs(['statistics'])"
      />
      <CreateEditCourse
        v-if="ifRouteNameIs(['create_course', 'edit_course'])"
      />
      <CreateEditAssignment
        v-if="ifRouteNameIs(['create_assignment', 'edit_assignment'])"
      />
      <Settings
        v-if="ifRouteNameIs(['settings'])"
      />
      <Profile
        v-if="ifRouteNameIs(['user_profile', 'lecturer_profile'])"
      />
      <Answer
        v-if="ifRouteNameIs(['answer']) && !getUserIsStudent"
        @toggle-alert="toggleAlert"
      />
    </Container>
    <Overlay
      :overlay-hidden="overlayHidden"
      @toggle-overlay="toggleOverlay"
      @toggle-alert="toggleAlert"
      @update-courses="updateCourses"
    />
    <Alert
      :alert-info="alertInfo"
      @toggle-alert="toggleAlert"
    />
  </Body>
</template>

<script>
import { computed } from 'vue'
import themes from '@/styles/themes.js'
import { Body, Container } from "@/styles/styledBlocks.js"
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Courses from '@/components/Courses.vue'
import Workflow from '@/components/Workflow.vue'
import Assignment from '@/components/Assignment.vue'
import StudentsList from '@/components/StudentsList.vue'
import Statistics from '@/components/Statistics.vue'
import CreateEditCourse from '@/components/create_edit/CreateEditCourse.vue'
import CreateEditAssignment from '@/components/create_edit/CreateEditAssignment.vue'
import Settings from '@/components/Settings.vue'
import Profile from '@/components/Profile.vue'
import Answer from '@/components/Answer.vue'
import Overlay from '@/components/Overlay.vue'
import Alert from '@/components/Alert.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MainView',
  components: {
    Body, Header, Sidebar, Container, Courses, Workflow, Assignment, StudentsList, Statistics, CreateEditCourse, CreateEditAssignment, Settings, Profile, Answer, Overlay, Alert
  },
  data() {
    return {
      sidebarHidden: true,
      themeInfo: {
        theme: 'default',
        themeMode: 'light'
      },
      alertInfo: {
        alertActive: false,
        alertMessage: '',
      },
      overlayHidden: true,
      coursesUpdateFlag: 0,
    }
  },
  inject: ['ifRouteNameIs', 'goTo'],
  methods: {
    ...mapMutations(['CLEAR_CURRENT_COURSE_ID']),
    toggleSidebar() { //opening/closing the sidebar
      this.sidebarHidden = !this.sidebarHidden
    },
    toggleOverlay() {
      this.overlayHidden = !this.overlayHidden
    },
    toggleAlert(message = '') { //show/hide alert block
      this.alertInfo.alertMessage = message
      this.alertInfo.alertActive = message !== ''
    },
    updateTheme(newTheme) { //updates theme variable when theme changed
      this.themeInfo.theme = newTheme
      this.toggleAlert(`The theme was changed to ${newTheme}`)
    },
    updateThemeMode(newThemeMode) { //updates themeMode variables when theme mode changed
      this.themeInfo.themeMode = newThemeMode
      this.toggleAlert(`The theme mode was changed to ${newThemeMode}`)
    },
    updateCourses() {
      this.coursesUpdateFlag++
    }
  },
  computed: {
    getCurrentTheme() { //return current theme
      return themes[this.themeInfo.theme][this.themeInfo.themeMode]
    },
  },
  watch: {
    $route(to) {
      if (to.name == "courses")
        this.CLEAR_CURRENT_COURSE_ID()
    }
  },
  provide() {
    return {
      theme: computed(() => this.getCurrentTheme),
      themeInfo: this.themeInfo
    }
  },
}
</script>
