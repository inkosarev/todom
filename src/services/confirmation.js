export default {
    /**
     * Флаг видимости окна подтверждения действия
     * type {Boolean}
     * */
    visibility: false,

    /**
     * Сообщение которое будет отображено в окне подтверждения
     * type {String}
     * */
    message: 'message',

    /**
     * функция, которая будет вызвана при подтверждении действия
     * type {Function}
     * */
    callback: () => {},

    /**
     * Массив аргументов, с которыми будет вызвана функция при подтверждении
     * type {Array}
     * */
    args: [],

    /**
     * Создание окна подтверждения действия на странице
     * @param {Function} callback - функция, которая будет вызвана при подтверждении
     * @param {Array} args - массив аргументов с которыми будет вызван callback
     * @param {String} message - сообщение которое будет отображено в окне подтверждения
     * */
    showConformation(callback, args = [], message) {
        this.visibility = true;
        this.message = message;
        this.args = args;
        this.callback = callback;
        document.documentElement.style.overflow = 'hidden';
    },

    /**
     * Реализация выбора пользователя в окне подтверждения действия на странице.
     * Скрывает окно и если пользователь подтверждает действие Вызывает callback.
     * @param {Boolean} confirm - выбор пользователя в окне (true - да, false - нет)
     */
    confirm(confirm) {
        if (confirm) {
            this.callback(...this.args);
        }
        this.visibility = false;
        document.documentElement.style.overflow = 'auto';
    }
}