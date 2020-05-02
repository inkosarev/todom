<template>
  <div>
    <router-link :to="note.id">
      {{ note.title }}
    </router-link>

    <template v-for="(item, index) in note.items">
      <template v-if="index < rows">
        <Item :item="item"/>
      </template>
    </template>
  </div>
</template>

<script>

  import Item from "./ListItem";

  /**
   * Заметка
   * */
  export default {
    name: 'Note',

    props: {
      /**
       * Объект заметки
       * @type {Object}
       * */
      note: {
        type: Object,
        required: true,
      },

      /**
       * Количество отображаемых пунктов для заметки
       * @type {Number}
       * */
      rows: {
        type: Number,
      }
    },

    components: {
      Item,
    },
  }
</script>
