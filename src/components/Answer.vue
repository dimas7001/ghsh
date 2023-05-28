<template>
  <AssignmentBlock
    :theme="theme"
  >
  {{ filterRepoData }}
    <div class="assignment">
      <div class="assignment__group">
        <TitleBlock>{{ answer.task.title }}</TitleBlock>
        <div class="assignment__rate">
          <input
            class="assignment__grade-input"
            type="text"
            placeholder="Grade"
            v-model="newGrade"
          >
          <div
            class="assignment__btn"
            @click="saveGrade"
          >Save The Grade</div>
        </div>
      </div>
      <div class="assignment__description">{{ 'ADD_COMMENT'/*answer.task.description*/ }}</div>
      <div class="assignment__details">
        <div class="assignment__dates">{{ 'MISSING_STARTING_DATE'/*formatDate(currentAssignment.startDate)*/ + ' – ' + 'MISSING_FINISH_DATE'/*formatDate(currentAssignment.endDate)*/ }}</div>
      </div>
    </div>
  </AssignmentBlock>
  <AnswerInfoBlock
    :theme="theme"
  >
    <SubtitleBlock>{{ 'ADD_NAME_SURNAME_GROUP'/*answer.studentName + ' ' + answer.studentSurname + ' - ' + answer.studentGroup*/ }}</SubtitleBlock>
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
      <a :href="answer.reference">{{ answer.reference }}</a>
    </div>
    <div class="answer-info__line answer-info__line_comment">
      <span class="answer-info__line-title">Comment:</span>
      {{ answer.student_comment }}
    </div>
    <div class="answer-info__line answer-info__line_submitted">
      <span class="answer-info__line-title">Submitted:</span>
      {{ answer.submission_date }}
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
    :repoActivity="repoActivity"
  />
  <Commits>
    <SubtitleBlock>Repo Activity Chart</SubtitleBlock>
  </Commits>
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
} from "../styles/styledBlocks.js"
import { mapGetters } from 'vuex'

export default {
  name: 'Answer',
  components: {
    StudentsAnswers, AssignmentBlock, TitleBlock, SubtitleBlock, AnswerInfoBlock, Activity, Commits
  },
  emits: ['toggle-alert'],
  inject: ['theme', 'formatDate'],
  data() {
    return ({
      newGrade: '',
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
          "commits": [
              {
                  "author": "UnforgettableDew",
                  "message": "basic db functionality",
                  "date": "2023-04-25T08:44:13.000+00:00",
                  "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/00d6a763e96fb1c5b7f9587673e169946ae4ae87"
              }
          ],
          "branch_name": "develop"
        },
        {
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
            ],
            "branch_name": "feature-basic-auth"
        }
      ],
    })
  },
  methods: {
    saveGrade() {
      if (Number(this.newGrade) > this.answer.task.max_point)
        this.$emit("toggle-alert", "The grade is higher, than a maximum one")
      else if (Number(this.newGrade) === this.answer.point)
        this.$emit("toggle-alert", "The grade is the same")
      else
        console.log("saveGrade triggered, correct input")   
    }
  },
  computed: {
    filterRepoData() {
      let commitsArr = []
      this.repoActivity
        .forEach(branch => commitsArr.push(...branch.commits))

      for (let i = 0; i < commitsArr.length; i++)
        console.log(commitsArr.some(commit => commit === commitsArr[i]))


      console.log(commitsArr)
      return 1
    }
  },
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

// [
//     {
//         "commits": [
//             {
//                 "author": "UnforgettableDew",
//                 "message": "basic db functionality",
//                 "date": "2023-04-25T08:44:13.000+00:00",
//                 "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/00d6a763e96fb1c5b7f9587673e169946ae4ae87"
//             }
//         ],
//         "branch_name": "develop"
//     },
//     {
//         "commits": [
//             {
//                 "author": "UnforgettableDew",
//                 "message": "code refactored",
//                 "date": "2023-05-21T11:00:44.000+00:00",
//                 "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/202db538c723dcedacf32449dded3fd2bc233684"
//             },
//             {
//                 "author": "UnforgettableDew",
//                 "message": "file upload/download added",
//                 "date": "2023-05-15T16:26:15.000+00:00",
//                 "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/dbbcdfe0102c6c337271e9c4eacde95f67461f5f"
//             },
//             {
//                 "author": "UnforgettableDew",
//                 "message": "updated",
//                 "date": "2023-05-15T08:20:03.000+00:00",
//                 "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/7fd100cb70d374e7d539c94ca976f8cd8e37b54e"
//             },
//             {
//                 "author": "UnforgettableDew",
//                 "message": "github added",
//                 "date": "2023-05-13T16:41:53.000+00:00",
//                 "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/1828f0643a9360f2667bbc51bca290f05c34aa61"
//             },
//             {
//                 "author": "UnforgettableDew",
//                 "message": "education logic",
//                 "date": "2023-05-13T11:15:32.000+00:00",
//                 "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/04a35bef40c852316f720bfcd066712165c1d012"
//             },
//             {
//                 "author": "UnforgettableDew",
//                 "message": "basic auth",
//                 "date": "2023-04-26T13:34:17.000+00:00",
//                 "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/a8e573cffd7c3d78fdb10b196f6f7a4f9dbe9169"
//             },
//             {
//                 "author": "UnforgettableDew",
//                 "message": "basic db functionality",
//                 "date": "2023-04-25T08:44:13.000+00:00",
//                 "github_commit_url": "https://github.com/UnforgettableDew/SecurityPart/commit/00d6a763e96fb1c5b7f9587673e169946ae4ae87"
//             }
//         ],
//         "branch_name": "feature-basic-auth"
//     }
// ]



</script>
