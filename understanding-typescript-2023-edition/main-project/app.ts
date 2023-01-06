// const person: {
//     name: string;
//     age: number;
// } = {

const person = {
    name: 'Peter',
    age: 34,
    hobbies: ['Sports','Cooking']
};

let favoriteActivities: string[];//any special type of TypeScript

favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase());
    // console.log(hobby.map());//error
}