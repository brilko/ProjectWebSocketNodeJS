/**
 * (Б.1)Чтение из базы данных. request()
 * Ожидание: При запросе к базе данных сервер получает очередные 100 тыс. значений.
 * values[] = request(); // В массив values записываются 100 тыс. значений из базы данных.
 */

const dataBase = require("../../WebSocket/test.js").testDB;
const assert = require("assert");

describe("База данных", function(){
    it("request возвращает 100 тыс чисел", function(){
        dataBase().then((values) => {
            assert.strictEqual(values.length, 100000); 
            assert.strictEqual(IsAllIsNumber(values), true);
        }); 
    });
});

function IsAllIsNumber(numArray){
    for (const num of numArray) {
        if(isNaN(num))
            return false;
    }
    return true;
}