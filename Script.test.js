const assert = require('assert').strict;
const script = require("./Script.js");
function Some(a, b){
    it("some", function(){
        assert.equal(a, b);
    });
}
Some(script.a, script.a1);
Some(script.a1, script.b);