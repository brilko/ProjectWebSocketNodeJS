<<<<<<< HEAD
const assert = require('assert').strict;
const script = require("./Script.js");
function Some(a, b){
    it("some", function(){
        assert.equal(a, b);
    });
}
Some(script.a, script.a1);
Some(script.a1, script.b);
=======
const assert = require('assert').strict;
const script = require("./Script.js");
function Some(a, b){
    it("some", function(){
        assert.equal(a, b);
    });
}
Some(script.a, script.a1);
Some(script.a1, script.b);
>>>>>>> 50b48ebf61c199d6751fe0611c3f9f6d1666cf29
Some(script.a, script.b);