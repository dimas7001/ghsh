<template>
    {{ info }}
</template>

<script>
import {
  SubtitleBlock,
  CommitsBlock
} from "@/styles/styledBlocks.js"

export default {
  name: 'StudentsList',
  components: {
    SubtitleBlock, CommitsBlock
  },
  inject: ['theme', 'goTo'],
  data() {
    return ({
      info: [
        {
          id: '1',
          name: 'name',
          surname: 'surname'
        },
        {
          id: '2',
          name: 'name1',
          surname: 'surname1'
        },
        {
          id: '3',
          name: 'name2',
          surname: 'surname2'
        },
      ]
    })
  },
}
</script>

