/**
 * Пунк списка внутри заметки
 * */
export class ListItem {
    /**
     * Условный уникальный идентификатор
     * @type {String}
     */
    id = Date.now().toString();

    /**
     * Флаг, определяющий пункт как [не]отмеченный
     * @type {Boolean}
     */
    check = false;

    /**
     * Текст пункта заметки
     * @type {String}
     */
    text = '';
}