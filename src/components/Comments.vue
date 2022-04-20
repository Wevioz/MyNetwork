<script lang="ts">
import { PropType } from '@vue/runtime-core';
export default {
  name: 'CommentComponent',
  data() {
    return {};
  },
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },
  methods: {
    created() {},
  },
};
</script>

<template>
  <br>
  <hr style="opacity: 0.2">
  <br>
  <div style="display: flex; justify-content: space-between">
    <b style="font-weight: bold">{{ this.comment.pseudo }}</b>
    <span style="display: inline-block; align-self: flex-end">
      le {{ new Date(this.comment.createdAt).toLocaleString() }}</span
    >
  </div>
  <p>{{ this.comment.content }}</p>
</template>
