// console.log('This is my code...!');

function  add(n1: number, n2: number, showResult: boolean, phrase: string){
    // if(typeof n1 !== 'number' && typeof n2 !== 'number'){
    //     throw new Error('Incorrect input!');
    // } 
    const result = n1 + n2;
    if(showResult){
        console.log(phrase + result);    
    }

    return n1 + n2;
}

// let number1: number = 5;// redundance

let number1: number;
number1 = 5;
const number2 = 2.8;

const printResult = true;
let resultPhrase = 'Result is: ';
// resultPhrase = 0; //not allowed another type - checking types

add(number1, number2, printResult, resultPhrase);
// console.log(result);