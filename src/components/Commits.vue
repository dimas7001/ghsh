<template>
  <CommitsBlock
    :theme="theme"
  >
    <SubtitleBlock>Commits</SubtitleBlock>
    <div class="commit__wrapper">
      <a
        class="commit"
        v-for="commit in commits"
        :key="commit.answerID"
        :href="commits.commitLink"
        target="_blank"
        @click="goTo({ name: 'answer', params: { answerID: commit.answerID } })"
      >
        <div class="commit__branch">{{ commit.commitBranch }}</div>
        <div class="commit__hach">{{ commit.commitHash }}</div>
        <div class="commit__message">{{ commit.commitMessage }}</div>
        <div class="commit__time">{{ commit.commitTime }}</div>
      </a>
    </div>
  </CommitsBlock>
</template>

<script>
import {
  SubtitleBlock,
  CommitsBlock
} from "@/styles/styledBlocks.js"

export default {
  name: 'Commits',
  components: {
    SubtitleBlock, CommitsBlock
  },
  inject: ['theme', 'goTo'],
  data() {
    return ({
      commits: [
        {
          commitID: "com1234",
          commitBranch: "master",
          commitMessage: "init or not init commit",
          commitTime: "2 minutes ago",
          commitHash: "a70f6b",
          commitLink: "https://github.com/dimas7001/ghsh",
        },
        {
          commitID: "com1284",
          commitBranch: "master",
          commitMessage: "init or not init commit",
          commitTime: "2 minutes ago",
          commitHash: "a70f6b",
          commitLink: "https://github.com/dimas7001/ghsh",
        },
        {
          commitID: "com7334",
          commitBranch: "master",
          commitMessage: "init or not init commit",
          commitTime: "2 minutes ago",
          commitHash: "a7cf6b",
          commitLink: "https://github.com/dimas7001/ghsh",
        },
      ]
    })
  },
}
</script>

