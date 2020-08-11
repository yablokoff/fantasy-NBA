
/*
    Базовый класс обёртки для storage.
 */
export const Store = function() {};
Store.prototype.STORE_KEY = 'store_key';


/*
    Форматирование данных.
 */
Store.prototype._formatting = function(data) {
    return data;
};


/*
    Сохранение в storage.
 */
Store.prototype.set = function(data) {
    const json = JSON.stringify(this._formatting(data));
    localStorage.setItem(this.STORE_KEY, json);
    return json;
};


/*
    Получение данных из storage.
 */
Store.prototype.get = function() {
    let data;
    const json = localStorage.getItem(this.STORE_KEY);
    try {
        data = JSON.parse(json);
    } catch (err) {
        data = null
    }
    return data;
};


/*
    Удаление из storage.
 */
Store.prototype.clear = function() {
    localStorage.removeItem(this.STORE_KEY);
};
