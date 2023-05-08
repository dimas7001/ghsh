<template>
  <!-- <SearchBlock
    placeholder="To search please enter at least 3 signs"
    :theme="theme"
    v-model="searchValue"
  /> -->
  <!-- <NewNote
    :theme="theme"
    @click="$emit('toggle-overlay')"
  /> -->
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
        </div>
      </div>
    </div>
    <div class="wf-item__no-items">This course is empty :(</div>
  </WorkflowBlock>
</template>

<script>
import { SearchBlock, WorkflowBlock, TitleBlock } from "../styles/styledBlocks.js"
import NewNote from '@/components/NewNote.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Workflow',
  components: {
    SearchBlock, WorkflowBlock, TitleBlock, NewNote
  },
  props: {
    themeInfo: Object,
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'goTo'],
  data() {
    return ({
      searchValue: '',
      notesWasHidden: false,  //flag if any notes were hidden by search
    })
  },
  methods: {
    ...mapMutations([ //vuex mutations helper
      
    ]),
    openControls(id) {  //open controls of note with specific id
      document.getElementById(id).classList.toggle('note_controls-mode')
    },
    closeControls(id) { //close controls of note with specific id
      let element = document.querySelector(`.note_controls-mode#${id}`)
      if (element)
        element.classList.toggle('note_controls-mode')
    },
    filterNotes() { //filter currently shown notes based on searchValue
      let searchValueLC = this.searchValue.toLowerCase()
      document.querySelectorAll('.note__wrapper').forEach(note => {
        let title = note.querySelector('.note__title').textContent.toLowerCase()
        let content = note.querySelector('.note__content').textContent.toLowerCase()
        if (!title.includes(searchValueLC) && !content.includes(searchValueLC)) { //if title or content of note don't have searchValue
          note.style.display = 'none' //hide note
          if (!this.notesWasHidden) //if no notes was hidden yet
            this.notesWasHidden = true
        }
      })
    },
    showHiddenNotes() { //shows all hidden by search notes
      document.querySelectorAll('.note__wrapper[style="display: none;"]').forEach(note => note.removeAttribute('style'))
      this.notesWasHidden = false
    }
  },
  computed: {
    ...mapGetters(['getAssignments']), //vuex getters helper
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
