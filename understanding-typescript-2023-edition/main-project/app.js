function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
function printResult2(num) {
    console.log('Result: ' + num);
    return;
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(5, 12));
printResult2(add(7, 12));
// let combineValues: Function;
var combineValues; //function type
combineValues = add;
// combineValues = printResult;
// combineValues = 5;
console.log(combineValues(8, 8));
// let someValue:undefined;
addAndHandle(10, 20, function (result) {
    console.log(result - 5);
});
