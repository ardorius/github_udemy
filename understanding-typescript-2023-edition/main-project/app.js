// const person: {
//     name: string;
//     age: number;
// } = {
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string]//tuple
// }= {
//     name: 'Peter',
//     age: 34,
//     hobbies: ['Sports','Cooking'],
//     role: [2, 'programmer']//union type
// };
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 5] = "ADMIN";
    Role[Role["READ_ONLY"] = 100] = "READ_ONLY";
    Role["AUTHOR"] = "AUTHOR";
})(Role || (Role = {}));
;
var person = {
    name: 'Peter',
    age: 34,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};
// person.role.push('admin');//push is allow error for tuple
// person.role[1] = 10;
// person.role = [0, 'admin', 'user'];
var favoriteActivities; //any special type of TypeScript
favoriteActivities = ['Sports'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    // console.log(hobby.map());//error
}
if (person.role === Role.ADMIN) {
    console.log('person is admin');
}
