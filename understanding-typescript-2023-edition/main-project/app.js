// const person: {
//     name: string;
//     age: number;
// } = {
var person = {
    name: 'Peter',
    age: 34,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'programmer'] //union type
};
person.role.push('admin');
// person.role[1] = 10;
var favoriteActivities; //any special type of TypeScript
favoriteActivities = ['Sports'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    // console.log(hobby.map());//error
}
