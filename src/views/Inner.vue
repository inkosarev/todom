<template>
  <div>
    <Menu>
      <router-link to="/" class="button-link">Home</router-link>
      <button @click="saveNoteChange()">Save</button>
      <button @click="undoNoteChange()">Undo</button>
      <button @click="redoNoteChange()">Redo</button>
      <button @click="addItem()">Add</button>
      <button @click="confirm(removeNote, [note.id], 'Удалить заметку?')">Delete</button>
      <button @click="confirm(discardChanges, [note.id], 'Отменить редактирование заметки?')">Discard</button>
    </Menu>

    <input type="text" v-model="note.title">
    <div v-for="item in note.items" class="editable-item">
      <textarea v-model="item.text" cols="30" rows="5">{{ item.text }}</textarea>
      <input type="checkbox" v-model="item.check">
      <button @click="removeItem(item.id)">X</button>
    </div>

  </div>
</template>

<script>
  import Menu from "../components/Menu";
  import Item from "../components/ListItem";
  import confirmation from "../services/confirmation";

  import {Note} from "../model/Note";
  import {ListItem} from "../model/ListItem";

  /**
   * Страница редактирования заметки
   * */
  export default {
    name: 'Inner',

    components: {
        Menu, Item,
    },

    data() {
      return {
        /**
         * Исходное состояние редактируемой заметки
         * @type {Note}
         * */
        origin: new Note(),

        /**
         * Объект редактируемой заметки
         * @type {Note}
         * */
        note: null,

        /**
         * История изменений редактируемой заметки
         * @type {Array<Note>}
         * */
        commits: [],

        /**
         * Индекс объекта изменений в массиве.
         * Используется для отслеживания в цепочке действий undo-redo
         * @type {number}
         * */
        commitIndex: 0,
      }
    },

    beforeMount() {
      // Загрузка заметки для редактирования из locastorage
      const note = localStorage.getItem(this.$route.params.id);

      // Проверка существования заметки и редирект в случае отсутствия
      if (!note) this.$router.replace('/');

      let noteObject = new Note(note);
      let commitNoteObject = new Note(note);

      noteObject.id = this.$route.params.id;
      commitNoteObject.id = this.$route.params.id;

      this.note = noteObject;

      // Первый коммит
      this.note.copyTo(this.origin);
      this.commits.push(commitNoteObject);
    },

    methods: {

      /**
       * Добавление пункт в заметку
       * */
      addItem: function () {
        this.note.items.push(new ListItem());
      },

      /**
       * Удаление пункта заметки
       * */
      removeItem: function (itemId) {
          for (let i = 0; i < this.note.items.length; i++) {
              if (this.note.items[i].id === itemId) {
                  this.note.items.splice(i, 1);
              }
          }
      },

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
       * Приведение заметки к исходному состоянию, отменить редактирование
       * */
      discardChanges() {
        this.commits = [];
        this.origin.copyTo(this.note);
        localStorage.setItem(this.note.id, JSON.stringify(this.note));
      },

      /**
       * Удаление редактируемой заметку
       * @type {String} - уникальный идентификатор заметки
       * */
      removeNote(noteId) {
        localStorage.removeItem(noteId);
        this.$router.replace('/');
      },

      /**
       * Сохранение редактируемой заметки
       * */
      saveNoteChange() {
        let commitNoteObject = new Note();
        this.note.copyTo(commitNoteObject);
        this.commits.push(commitNoteObject);
        this.commitIndex = this.commits.length - 1;
        localStorage.setItem(this.note.id, JSON.stringify(this.note));
      },

      /**
       * Отмена последнего изменения редактируемой заметки
       * */
      undoNoteChange() {
        if (this.commits.length > 1 && this.commitIndex > 0) {
          this.commitIndex--;
          this.commits[this.commitIndex].copyTo(this.note);
        }
      },

      /**
       * Применение предыдущего изменения редактируемой заметки
       * */
      redoNoteChange() {
        if (this.commits.length > 1 && this.commitIndex < this.commits.length - 1) {
          this.commitIndex++;
          this.commits[this.commitIndex].copyTo(this.note);
        }
      },
    }

  }
</script>

<style>
  .editable-item {
    padding: 10px;
    display: flex;
    align-items: center;
  }
</style>