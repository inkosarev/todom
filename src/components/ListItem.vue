<template>
  <div v-else :class="{checked: item.check}">{{ item.text }}</div>
</template>

<script>
  /**
   * Пункт внутри заметки
   * */
  export default {
    name: "ListItem",
    props: {
        /**
         * Объект пункта заметки
         * @type {Object}
         * */
        item: {
            type: Object,
            required: true,
        },
    },
  }
</script>

<style>
  .checked {
    text-decoration: line-through;
    color: grey;
  }
</style>
