<!--
.sidebar
  - change the width if sidebarHidden value changes

.sidebar__item
  - hightlighted if matching type of notes shown
  - emits change of type of notes shown

.sidebar__icon
  - changes the icons depending on themeInfo.themeMode = {'light', 'dark'}
-->
<template>
  <SidebarBlock :theme="theme">
    <div
      class="sidebar"
      :class="{'sidebar_s': sidebarHidden}"
    >
      <div class="sidebar__group">
        <div
          class="sidebar__item"
          :class="{'sidebar__item_active': ifRouteNameIs(['courses'])}"
          @click="goTo({ name: 'courses' })"
        >
          <img
            class="sidebar__icon"
            :src="require(`@/assets/img/icons/notes/notes_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
          >
          <div class="sidebar__label">All Courses</div>
        </div>
        <div class="sidebar__separator"></div>
        <div
          class="sidebar__item"
          :class="{
            'sidebar__item_active': ifRouteNameIs(['course', 'assignment', 'answer', 'create_course', 'edit_course', 'create_assignment', 'edit_assignment', 'lecturer_profile']),
            'sidebar__item_inactive': ifRouteNameIs(['courses', 'settings'])
          }"
          @click="goTo({ name: 'course' })"
        >
          <img
            class="sidebar__icon"
            :src="require(`@/assets/img/icons/workflow/workflow_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
          >
          <div class="sidebar__label">Workflow</div>
        </div>
        <div
          class="sidebar__item"
          :class="{
            'sidebar__item_active': ifRouteNameIs(['students', 'user_profile']),
            'sidebar__item_inactive': ifRouteNameIs(['courses', 'settings'])
          }"
          @click="goTo({ name: 'students' })"
        >
          <img
            :src="require(`@/assets/img/icons/people/people_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
            class="sidebar__icon"
          >
          <div class="sidebar__label">Students</div>
        </div>
        <div
          class="sidebar__item"
          :class="{
            'sidebar__item_active': ifRouteNameIs(['statistics']),
            'sidebar__item_inactive': ifRouteNameIs(['courses', 'settings'])
          }"
          @click="goTo({ name: 'statistics' })"
        >
          <img
            :src="require(`@/assets/img/icons/statistics/statistics_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
            class="sidebar__icon"
          >
          <div class="sidebar__label">Statistics</div>
        </div>
      </div>
      <div class="sidebar__group">
        <div class="sidebar__item"
        @click="logout"
        >
          <img
            :src="require(`@/assets/img/icons/logout/logout_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
            class="sidebar__icon"
          >
          <div class="sidebar__label">Logout</div>
        </div>
      </div>
    </div>
  </SidebarBlock>
</template>

<script>
import { SidebarBlock } from "@/styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Sidebar',
  components: {
    SidebarBlock
  },
  props: {
    sidebarHidden: Boolean,
  },
  inject: ['theme', 'themeInfo', 'ifRouteNameIs', 'goTo'],
  methods: {
    ...mapMutations(['CLEAR_USER_DATA']),
    logout() {
      this.CLEAR_USER_DATA()
      this.goTo({ name: 'login' })
    },
  },
  computed: {
    
  },
}
</script>
