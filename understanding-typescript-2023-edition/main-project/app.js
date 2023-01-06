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
printResult(add(5, 12));
printResult2(add(7, 12));
// let someValue:undefined;
