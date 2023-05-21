<template>
  <WorkflowBlock
    :theme="theme"
  >
    <TitleBlock>Course Title</TitleBlock>
    <!-- <div class="wf-item__group">
      <div
        @click="downloadFile"
      >click to save</div>
    </div> -->
    <NewItemBlock
      :theme="theme"
      class="courses__create"
      @click="addArticle"
    />
    <div
      class="wf-item__group"
      v-if="anyAssignmentExist"
    >
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
    <div class="wf-item__no-items">
      This course is empty :(
      <br>
      Add some articles with +
    </div>
  </WorkflowBlock>
</template>

<script>
import { SearchBlock, WorkflowBlock, TitleBlock, Controls, NewItemBlock } from "../styles/styledBlocks.js"
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'Workflow',
  components: {
    SearchBlock, WorkflowBlock, TitleBlock, Controls, NewItemBlock
  },
  props: {
    
  },
  emits: ['toggle-overlay', 'toggle-alert'],
  inject: ['theme', 'themeInfo', 'goTo'],
  data() {
    return ({

    })
  },
  methods: {
    ...mapMutations(['DELETE_ASSIGNMENT']),
    deleteAssignment(id) {
      // $emit('ask-question', 'Do you really want to delete this assignment?', this.DELETE_ASSIGNMENT)
      this.DELETE_ASSIGNMENT(id)
    },
    async downloadFile() {
      axios({
        url: 'http://25.59.188.46:8080/api/v1/student/courses/1/task/1/download',
        method: 'GET',
        headers: {"Authorization": `Bearer ${this.getAccessToken}`},
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
      
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'file.docx');
        document.body.appendChild(fileLink);
      
        fileLink.click();
      })
    },
    addArticle() {
      console.log('addArticle triggered')
    },
  },
  computed: {
    ...mapGetters(['getAssignments', 'getAccessToken']),
    anyAssignmentExist() {
      return this.getAssignments ? true : false
    }
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
