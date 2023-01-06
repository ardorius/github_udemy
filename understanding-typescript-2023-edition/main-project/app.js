// console.log('This is my code...!');
function add(n1, n2, showResult, phrase) {
    // if(typeof n1 !== 'number' && typeof n2 !== 'number'){
    //     throw new Error('Incorrect input!');
    // } 
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    return n1 + n2;
}
// let number1: number = 5;// redundance
var number1;
number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
// resultPhrase = 0; //not allowed another type - checking types
add(number1, number2, printResult, resultPhrase);
// console.log(result);
