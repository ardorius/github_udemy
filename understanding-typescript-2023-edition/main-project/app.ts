let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Peter';
if(typeof userInput === 'string'){
    userName = userInput;
}

function generateError(message: string, code: number): never{//never send return value, even undefined
    throw {message: message, errorCode: code};
    // while(true){}
}

const result = generateError('An error occurred!', 500);
console.log(result);