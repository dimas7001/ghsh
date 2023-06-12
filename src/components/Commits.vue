<template>
  <CommitsBlock
    :theme="theme"
    v-cloak
  >
    <SubtitleBlock>Commits</SubtitleBlock>
    <div class="commits__wrapper">
      <a
        class="commit"
        v-for="commit in repoActivity"
        :key="commit.date"
        :href="commit.github_commit_url"
        target="_blank"
      >
        <div
          class="commit__branch"
          :title="listBranches(commit.branch_names)"
        >
          <span
            v-if="commit.branch_names.length === 1"
          >
            {{ commit.branch_names[0] }}
          </span>
          <span
            v-else
          >
            {{ commit.branch_names.length }} branches
          </span>
        </div>
        <div class="commit__message">{{ commit.message }}</div>
        <div class="commit__time">{{ formatDate(commit.date) }}</div>
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
  props: {
    repoActivity: Array,
  },
  inject: ['theme', 'goTo', 'formatDate'],
  data() {
    return ({
      // commits: [
      //   {
      //     commitID: "com1234",
      //     commitBranch: "master",
      //     commitMessage: "init or not init commit",
      //     commitTime: "2 minutes ago",
      //     commitHash: "a70f6b",
      //     commitLink: "https://github.com/dimas7001/ghsh",
      //   },
      //   {
      //     commitID: "com1284",
      //     commitBranch: "master",
      //     commitMessage: "init or not init commit",
      //     commitTime: "2 minutes ago",
      //     commitHash: "a70f6b",
      //     commitLink: "https://github.com/dimas7001/ghsh",
      //   },
      //   {
      //     commitID: "com7334",
      //     commitBranch: "master",
      //     commitMessage: "init or not init commit",
      //     commitTime: "2 minutes ago",
      //     commitHash: "a7cf6b",
      //     commitLink: "https://github.com/dimas7001/ghsh",
      //   },
      // ]
    })
  },
  methods: {
    listBranches(arr) {
      let str = ""
      arr.forEach((branch, i) => {
        if (i) str += ', '
        str += branch
      })
      return str
    },
  },
}
</script>

