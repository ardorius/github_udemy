// const person: {
//     name: string;
//     age: number;
// } = {

const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]//tuple
}= {
    name: 'Peter',
    age: 34,
    hobbies: ['Sports','Cooking'],
    role: [2, 'programmer']//union type
};

// person.role.push('admin');//push is allow error for tuple
// person.role[1] = 10;
// person.role = [0, 'admin', 'user'];

let favoriteActivities: string[];//any special type of TypeScript

favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase());
    // console.log(hobby.map());//error
}