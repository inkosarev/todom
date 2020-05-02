import Vue from "vue";
import constatns from "../constatns";

/**
 * Заметка
 * */
export class Note {

    /**
     * Условный уникальный идентификатор
     * @type {String}
     * */
    id = Date.now().toString();

    /**
     * Заголовок заметки
     * @type {String}
     * */
    title = constatns.TITLE_OF_NEW_NOTE;

    /**
     * Список пунктов внутри заметки
     * @type {Array<Item>}
     * */
    items = [];

    /**
     * @constructor
     * @param {String} stringifyNote - заметка в формате JSON
     * */
    constructor(stringifyNote = null) {
        if (stringifyNote) {
            const note = JSON.parse(stringifyNote)
            this.title = note.title;
            this.items = [...note.items];
        }
    }

    /**
     * Копирование заметки в целевой объект
     * @param {Note} target - целевой объект
     * */
    copyTo(target) {
        Vue.set(target, 'id', this.id);
        Vue.set(target, 'title', this.title);
        Vue.set(target, 'items', this.items.map(o => ({...o})));
    }
}