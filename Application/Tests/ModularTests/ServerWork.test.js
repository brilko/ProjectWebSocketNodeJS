/**
 * (Б.2)Обработка полученных значений. processValues(values)
 * Ожидание: В каждой очередной тысяче значений отбирается максимальное.
 * processedValues = porcessValues(values); // В массив processedValues записывается 200 значений.
 */

const serverWork = require("../../WebSocket/app.js");
const assert = require("assert");

const lengthOfOneBlock = 200;
const countBlocks = 500;
const regularNumbersInterval = [0, 10];
const expectedNumbersInterval = [20, 30];

describe("Работа сервера", function(){
    it("Функция фильтра значений", function(){
        var expectedArray = GenerateExpectedArray();
        var rawNumArray = GenerateRawNumberArray(expectedArray);

        var actualArray = serverWork.processValues(rawNumArray);

        assert.strictEqual(actualArray.length, countBlocks);
        assert.deepStrictEqual(actualArray, expectedArray);
    });
});

function GenerateExpectedArray() {
    var expectedArray = [];
    for(var j = 0; j < countBlocks; j++){
        expectedArray[j] = GetRandomIntInInterval(expectedNumbersInterval);
    }
    return expectedArray;
}

function GenerateRawNumberArray(expectedArray) {
    var rawNumArray = [];
    for(var j = 0; j < countBlocks; j++){
        for(var i = 0; i < lengthOfOneBlock; i++){
            rawNumArray[i + j * lengthOfOneBlock] = GetRandomIntInRange(regularNumbersInterval);
        }
        rawNumArray[j * lengthOfOneBlock] = expectedArray[j];
    }
    return rawNumArray;
}

function GetRandomIntInInterval(array){
    return GetRandomIntInRange(array[0], array[1]);
}

function GetRandomIntInRange(min, max){
    return min + Math.floor(Math.random * (max - min + 1));
}