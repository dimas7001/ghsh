<template>
  <AssignmentBlock
    :theme="theme"
  >
    <div class="assignment">
      <TitleBlock>{{ answer.task.title }}</TitleBlock>
      <div class="assignment__description">{{ answer.task.description }}</div>
      <div class="assignment__details">
        <div class="assignment__dates">{{ formatDate(answer.task.start_date) + ' – ' + formatDate(answer.task.end_date) }}</div>
      </div>
      <div class="assignment__rate">
        <SubtitleBlock>Your Feedback</SubtitleBlock>
        <div class="assignment__input-group">
          <input
          class="assignment__grade-input assignment__grade-input_grade"
          type="number"
          placeholder="Grade"
          min="0"
          :max="answer.task.max_point"
          v-model="formData.point"
        >
        <input
          class="assignment__grade-input assignment__grade-input_comment"
          type="text"
          placeholder="Leave you comment please"
          v-model="formData.educator_comment"
        >
        </div>
        <div
          class="assignment__btn"
          @click="saveGrade"
        >Save Feedback</div>
      </div>
    </div>
  </AssignmentBlock>
  <AnswerInfoBlock
    :theme="theme"
  >
    <SubtitleBlock
      @click="goTo({ name: 'user_profile', params: { userID: `${routeParams.studentID}` } })"
    >{{ studentInfo.firstname + ' ' + studentInfo.lastname + ' - ' + studentInfo.group }}</SubtitleBlock>
    <div class="answer-info__line answer-info__line_grade">
      <span class="answer-info__line-title">Grade:</span>
      {{ answer.point }}/{{ answer.task.max_point }}
    </div>
    <div class="answer-info__line answer-info__line_link">
      <span class="answer-info__line-title">GitHub Link:</span>
      <a :href="answer.github_reference">{{ answer.github_reference }}</a>
    </div>
    <div class="answer-info__line answer-info__line_document">
      <span class="answer-info__line-title">Report:</span>
      <a
        @click.prevent="downloadReport"
      >{{ answer.reference }}</a>
    </div>
    <div class="answer-info__line answer-info__line_comment">
      <span class="answer-info__line-title">Comment:</span>
      {{ answer.student_comment }}
    </div>
    <div class="answer-info__line answer-info__line_submitted">
      <span class="answer-info__line-title">Submitted:</span>
      {{ formatDate(answer.submission_date) }}
    </div>
    <div class="answer-info__line answer-info__line_comment">
      <span class="answer-info__line-title">Inspections:</span>
      <div class="answer-info__line-labels">
        <div
          class="answer-info__label"
          v-for="inspection in inspections"
          :key="inspection.filename"
        >
          {{ inspection.filename }}
          <span v-if="inspection.is_exist">✔</span>
          <span v-else>✘</span>
        </div>
      </div>
    </div>
  </AnswerInfoBlock>
  <!-- for activity pass data with props -->
  <Activity
    :repo-activity="repoActivity"
  />
  <Commits
    :repo-activity="repoActivity"
  />
</template>

<script>
import StudentsAnswers from '@/components/StudentsAnswers.vue'
import Activity from '@/components/Activity.vue'
import Commits from '@/components/Commits.vue'
import {
  AssignmentBlock,
  TitleBlock,
  SubtitleBlock,
  AnswerInfoBlock,
} from "@/styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import { sendPOST, sendGET, sendDELETE } from "@/requests/requests"
import endpoints from "@/requests/endpoints"
import axios from 'axios'

export default {
  name: 'Answer',
  components: {
    StudentsAnswers, AssignmentBlock, TitleBlock, SubtitleBlock, AnswerInfoBlock, Activity, Commits
  },
  emits: ['toggle-alert'],
  inject: ['theme', 'formatDate', 'goTo', 'routeParams'],
  data() {
    return ({
      formData: {
        point: '',
        educator_comment: ""
      },
      studentInfo: {},
      answer: {
        "id": 1,
        "reference": "lab1_john.pdf",
        "point": 8.0,
        "task": {
          "id": 1,
          "title": "Database Fundamentals",
          "max_point": 8.0
        },
        "github_reference": "https://github.com/UnforgettableDew/SecurityPart",
        "is_assessed": true,
        "educator_comment": "great",
        "student_comment": "Long-finned char silver dollar yellowtail clownfish mooneye slimy mackerel rohu roosterfish rockling fire bar danio icefish cow shark.",
        "submission_date": "2023-01-08T12:30:00.000+00:00"
      },
      inspections: [
        {
          "filename": ".gitignore",
          "is_exist": true
        },
        {
          "filename": "README.md",
          "is_exist": true
        }
      ],
      repoActivity: [
        {
          date: '01/01/2001',
          github_commit_url: 'https://github.com/dimas7001/ghsh',
          branch_names: ['master'],
          message: "Pacific cod Rasbora lefteye flounder",
        },
        {
          date: '01/01/2001',
          github_commit_url: 'https://github.com/dimas7001/ghsh',
          branch_names: ['master', 'development'],
          message: "on, wolf-eel bluefish deepwater flath",
        },
        {
          date: '01/01/2001',
          github_commit_url: 'https://github.com/dimas7001/ghsh',
          branch_names: ['master', 'development'],
          message: "rivuline bigmouth buffal",
        },
      ],
    })
  },
  methods: {
    async saveGrade() {
      if (Number(this.newGrade) > this.answer.task.max_point)
        this.$emit("toggle-alert", "The grade is higher, than a maximum one")
      else if (Number(this.newGrade) === this.answer.point)
        this.$emit("toggle-alert", "The grade is the same")
      else
        await sendPOST(endpoints.gradeAnswer(this.routeParams.courseID, this.routeParams.studentID, this.routeParams.assignmentID), {"Authorization": `Bearer ${this.getAccessToken}`}, this.formData)
        .then(res => {
          if (res) {
            console.log("saveGrade triggered, correct input")
          }
        })
    },
    async downloadReport() {
      axios({
        url: endpoints.downloadReport(this.routeParams.courseID, this.routeParams.studentID, this.routeParams.assignmentID),
        method: 'GET',
        headers: {"Authorization": `Bearer ${this.getAccessToken}`},
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
      
        fileLink.href = fileURL;
        // console.log(fileURL)
        fileLink.setAttribute('download', this.answer.reference);
        document.body.appendChild(fileLink);
      
        fileLink.click();
      })
    },
    async uploadStudentAnswer() {
      await sendGET(
        endpoints.studentAnswer(this.routeParams.courseID, this.routeParams.studentID, this.routeParams.assignmentID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res.passed_task) {
          this.answer = res.passed_task
          this.studentInfo = res.student
          this.formData.point = res.passed_task.point
          this.formData.educator_comment = res.passed_task.educator_comment
        }
      })
    },
    async uploadRepoActivity() {
      await sendGET(
        endpoints.repoActivity(this.routeParams.courseID, this.routeParams.studentID, this.routeParams.assignmentID),
        {"Authorization": `Bearer ${this.getAccessToken}`}
      )
      .then(res => {
        if (res.repository_url) {
          let commitsArr = [],
              positionsToDelete = []

          res.commit_list
            .forEach(branch => {
              let branchName = branch.branch_name
              branch.commits.forEach(commit => {
                commit['branch_names'] = [branchName]
                commitsArr.push(commit)
              })
            })

          commitsArr.forEach((commit, i) => {
            let commitLink = commit.github_commit_url

            for (let j = i + 1; j < commitsArr.length; j ++) {
              if (commitLink === commitsArr[j].github_commit_url) {
                commitsArr[i].branch_names = commitsArr[i].branch_names.concat(commitsArr[j].branch_names)
                positionsToDelete.push(j)
              }
            }
          })

          positionsToDelete = [...new Set(positionsToDelete)]

          positionsToDelete.reverse().forEach(pointer => {
            commitsArr.splice(pointer, 1)
          })

          this.repoActivity = commitsArr
        }
      })
    },
    fakeUploadRepoActivity() {
      let fakeRes = {commit_list:[
        {
          "branch_name": "branch-ready",
          "commits": [
            {
              "author": "UnforgettableDew",
              "message": "add new functionality",
              "date": "2023-05-24T19:27:56.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/c7e6d0526c817ffcfd96de68d885e13ba76a7d48"
            },
            {
              "author": "UnforgettableDew",
              "message": "start/end and submission date added",
              "date": "2023-05-22T12:49:10.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/1dcc0bfaf8231759f2821277fdf65c578e2fce49"
            },
            {
              "author": "UnforgettableDew",
              "message": "start/end and submission date added",
              "date": "2023-05-21T11:00:44.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/16e007f7eff585306de0d53afabb10a41b3e0633"
            },
            {
              "author": "UnforgettableDew",
              "message": "file upload/download added",
              "date": "2023-05-15T16:26:15.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/dbbcdfe0102c6c337271e9c4eacde95f67461f5f"
            },
            {
              "author": "UnforgettableDew",
              "message": "updated",
              "date": "2023-05-15T08:20:03.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/7fd100cb70d374e7d539c94ca976f8cd8e37b54e"
            },
            {
              "author": "UnforgettableDew",
              "message": "github added",
              "date": "2023-05-13T16:41:53.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/1828f0643a9360f2667bbc51bca290f05c34aa61"
            },
            {
              "author": "UnforgettableDew",
              "message": "education logic",
              "date": "2023-05-13T11:15:32.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/04a35bef40c852316f720bfcd066712165c1d012"
            },
            {
              "author": "UnforgettableDew",
              "message": "basic auth",
              "date": "2023-04-26T13:34:17.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/a8e573cffd7c3d78fdb10b196f6f7a4f9dbe9169"
            },
            {
              "author": "UnforgettableDew",
              "message": "basic db functionality",
              "date": "2023-04-25T08:44:13.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/00d6a763e96fb1c5b7f9587673e169946ae4ae87"
            }
          ]
        },
        {
          "branch_name": "develop",
          "commits": [
            {
              "author": "UnforgettableDew",
              "message": "basic db functionality",
              "date": "2023-04-25T08:44:13.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/00d6a763e96fb1c5b7f9587673e169946ae4ae87"
            }
          ]
        },
        {
          "branch_name": "feature-basic-auth",
          "commits": [
            {
              "author": "UnforgettableDew",
              "message": "code refactored",
              "date": "2023-05-21T11:00:44.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/202db538c723dcedacf32449dded3fd2bc233684"
            },
            {
              "author": "UnforgettableDew",
              "message": "file upload/download added",
              "date": "2023-05-15T16:26:15.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/dbbcdfe0102c6c337271e9c4eacde95f67461f5f"
            },
            {
              "author": "UnforgettableDew",
              "message": "updated",
              "date": "2023-05-15T08:20:03.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/7fd100cb70d374e7d539c94ca976f8cd8e37b54e"
            },
            {
              "author": "UnforgettableDew",
              "message": "github added",
              "date": "2023-05-13T16:41:53.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/1828f0643a9360f2667bbc51bca290f05c34aa61"
            },
            {
              "author": "UnforgettableDew",
              "message": "education logic",
              "date": "2023-05-13T11:15:32.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/04a35bef40c852316f720bfcd066712165c1d012"
            },
            {
              "author": "UnforgettableDew",
              "message": "basic auth",
              "date": "2023-04-26T13:34:17.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/a8e573cffd7c3d78fdb10b196f6f7a4f9dbe9169"
            },
            {
              "author": "UnforgettableDew",
              "message": "basic db functionality",
              "date": "2023-04-25T08:44:13.000+00:00",
              "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/00d6a763e96fb1c5b7f9587673e169946ae4ae87"
            }
          ]
        }
      ]}

      let commitsArr = [],
          positionsToDelete = []

      fakeRes.commit_list
        .forEach(branch => {
          let branchName = branch.branch_name
          branch.commits.forEach(commit => {
            commit['branch_names'] = [branchName]
            commitsArr.push(commit)
          })
        })

      commitsArr.forEach((commit, i) => {
        let commitLink = commit.github_commit_url

        for (let j = i + 1; j < commitsArr.length; j ++) {
          if (commitLink === commitsArr[j].github_commit_url) {
            commitsArr[i].branch_names = commitsArr[i].branch_names.concat(commitsArr[j].branch_names)
            positionsToDelete.push(j)
          }
        }
      })

      positionsToDelete = [...new Set(positionsToDelete)]

      positionsToDelete.reverse().forEach(pointer => {
        commitsArr.splice(pointer, 1)
      })

      commitsArr.sort((a, b) => {
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
      })

      this.repoActivity = commitsArr
    },
  },
  computed: {
    ...mapGetters(['getAccessToken']),
  },
  async mounted() {
    this.uploadStudentAnswer()
    // this.uploadRepoActivity()
    this.fakeUploadRepoActivity()
  }
}

// 

// [ default file existance check
//     {
//         "filename": ".gitignore",
//         "is_exist": true
//     },
//     {
//         "filename": "README.md",
//         "is_exist": true
//     }
// ]





</script>
