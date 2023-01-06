function add(n1: number, n2: number) {
    return n1 + n2;
}


function printResult(num: number): void{
    console.log('Result: ' + num);
}

function printResult2(num: number): undefined{
    console.log('Result: ' + num);
    return;
}

printResult(add(5, 12));
printResult2(add(7, 12));

// let combineValues: Function;
let combineValues: (a: number, b:number) => number;//function type

combineValues = add;
// combineValues = printResult;
// combineValues = 5;

console.log(combineValues(8,8));

// let someValue:undefined;