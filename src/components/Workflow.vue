<template>
  <WorkflowBlock
    :theme="theme"
  >
    <TitleBlock>Course Title</TitleBlock>
    <div class="wf-item__group">
      <div
        class="wf-item__wrapper"
        v-for="assignment in getAssignments"
        @click="goTo({ name: 'assignment', params: { assignmentID: `${assignment.id}` } })"
        :key="assignment.id"
      >
        <div
          class="wf-item"
          :id="assignment.id"
          v-cloak
        >
          <div class="wf-item__name">
            {{ assignment.name }}
          </div>
          <div
            class="wf-item__descr"
            v-html="assignment.description"
          ></div>
          <Controls
            class="controls"
            :theme="theme"
          >
            <div
              class="controls__edit"
              @click.stop="$emit('toggle-overlay', 'edit', assignment.id, assignment.name, assignment.description)"
            >
              <img
                :src="require(`@/assets/img/icons/edit/edit_${themeInfo.themeMode === 'light' ? 'b' : 'w'}.png`)"
                alt="edit"
              >
            </div>
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
      </div>
    </div>
    <div class="wf-item__no-items">This course is empty :(</div>
  </WorkflowBlock>
</template>

<script>
import { SearchBlock, WorkflowBlock, TitleBlock, Controls } from "../styles/styledBlocks.js"
import NewNote from '@/components/NewNote.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Workflow',
  components: {
    SearchBlock, WorkflowBlock, TitleBlock, Controls
  },
  props: {
    themeInfo: Object,
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'goTo'],
  data() {
    return ({

    })
  },
  methods: {
    ...mapMutations(['DELETE_ASSIGNMENT']),
    deleteAssignment(id) {
      // $emit('ask-question', 'Do you really want to delete this assignment?', this.DELETE_ASSIGNMENT)
      this.DELETE_ASSIGNMENT(id)
    }
  },
  computed: {
    ...mapGetters(['getAssignments']),
  },
  watch: {
    $props: {
      handler() { //when notes type changes discard search results if search was active
        if (this.searchValue) {
          this.notesWasHidden = false
          this.searchValue = ''
        }
      },
      deep: true,
    },
    searchValue() {
      if (this.searchValue.length > 2)  //if searchValue length > 2 start search
        this.filterNotes()
      else if (this.notesWasHidden) //if searchValue length < 2 show all hidden notes if exist
        this.showHiddenNotes()
    },
  },
}
</script>
