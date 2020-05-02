<template>
  <div>
    <Menu>
      <button @click="addNote">Add</button>
      <button v-if="Object.keys(notes).length"
              @click="confirm(clearNoteList, [], 'Очистить журнал?')"
      >Clear</button>
    </Menu>

    <div v-if="notes.length">
      <h1>Заметок нет</h1>
    </div>

    <div v-else>
      <div v-for="note in Object.entries(notes).sort()" class="list-item">
        <button @click="confirm(removeNote, [note[1].id], 'Удалить заметку?')">X</button>
        <NoteComponent :note="note[1]" :rows="rows"/>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import confirmation from "../services/confirmation";
  import NoteComponent from '../components/Note';
  import Menu from "../components/Menu";
  import constatns from "../constatns";

  import {Note} from '../model/Note';

  /**
   * Главная страница, отображающая заметки
   * без возможности редактрирования,
   * число пунктов которых ограничено.
   * */
  export default {
    name: 'Notes',

    components: {
      NoteComponent, Menu
    },

    data() {
      return {
        /**
         * Количество выводимых в каждой заметке пунктов
         * @type {Number}
         * */
        rows: constatns.NUMBER_OF_SHOWED_ROWS,

        /**
         * Объект, содержащий заметки выводимые на странице
         * @type {Object}
         * */
        notes: {},
      }
    },

    beforeMount() {
      /**
       * Загрузка заметок из локального хранилища
       * */
      for (let x in localStorage) {
        if (+x) {
          this.notes[x] = JSON.parse(localStorage[x]);
        }
      }
    },
    methods: {
      /**
       * Создание окна подтверждения действия на странице
       * @param {Function} callback - функция, которая будет вызвана при подтверждении
       * @param {Array} args - массив аргументов с которыми будет вызван callback
       * @param {String} message - сообщение которое будет отображено в окне подтверждения
       * */
      confirm(callback, args, message) {
        confirmation.showConformation(callback, args, message);
      },

      /**
       * Создание новой заметки и переход к ее редактированию
       * */
      addNote() {
        const note = new Note();
        Vue.set(this.notes, note.id, note);
        localStorage.setItem(note.id, JSON.stringify(note));
        this.$router.push(note.id);
      },

      /**
       * Удаление заметки из списка
       * @param {String} id - уникальный идентификатор заметки
       */
      removeNote(id) {
        Vue.delete(this.notes, id);
        localStorage.removeItem(id);
      },

      /**
       * Удаление всех заметок из списока
       * */
      clearNoteList() {
        this.notes = {};
        localStorage.clear();
      }
    },

  }
</script>

<style>
  .list-item {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    margin: 20px 5px;
    padding: 5px;
  }
</style>