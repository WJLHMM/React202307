import Schema from "async-validator";
console.log(Schema.warning);
Schema.warning = function () {};
