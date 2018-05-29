var Student = /** @class */ (function () {
    function Student(firstName, middleInitial) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.fullName = firstName + " " + middleInitial + " ";
    }
    return Student;
}());
function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
var user = new Student("Name", "M");
console.log(greeter(user));
