/**
 * (Б.1)Чтение из базы данных. request()
 * Ожидание: При запросе к базе данных сервер получает очередные 200 тыс. значений.
 * values[] = request(); // В массив values записываются 200 тыс. значений из базы данных.
 */

const dataBase = require("../../Server/DataBase.js");
const assert = require("assert");

describe("База данных", function(){
    it("request возвращает 200 тыс чисел", function(){
        var numArray = dataBase.Request();
        assert.strictEqual(numArray.length, 200000); 
        assert.strictEqual(IsAllIsNumber(numArray), true);
    });
});

function IsAllIsNumber(numArray){
    for (const num of numArray) {
        if(isNaN(num))
            return false;
    }
    return true;
}