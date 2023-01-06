// const person: {
//     name: string;
//     age: number;
// } = {
var person = {
    name: 'Peter',
    age: 34,
    hobbies: ['Sports', 'Cooking']
};
var favoriteActivities; //any special type of TypeScript
favoriteActivities = ['Sports'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
