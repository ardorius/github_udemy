var userInput;
var userName;
userInput = 5;
userInput = 'Peter';
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
    // while(true){}
}
var result = generateError('An error occurred!', 500);
console.log(result);
