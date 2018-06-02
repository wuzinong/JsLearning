
//Class
class Greeter{
    greeting:string;
    constructor(message:string){
        this.greeting = message;
    }
    greet(){
        return "Hello, "+this.greeting;
    }
}
let greeter = new Greeter("world"); 
// 这个类有3个成员：一个叫做 greeting的属性，一个构造函数和一个 greet方法。
// 你会注意到，我们在引用任何一个类成员的时候都用了 this。 它表示我们访问的是类的成员。
// 最后一行，我们使用 new构造了 Greeter类的一个实例。 它会调用之前定义的构造函数，创建一个 Greeter类型的新对象，并执行构造函数初始化它。

//继承
//在TypeScript里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类

class Animal{
    move(distanceInMeters:number=0){
        console.log(`Animal moved ${distanceInMeters} m`);
    }
}
class Dog extends Animal{
   bark(){
       console.log("Woof!Woof!");
   }
}
const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

//这个例子展示了最基本的继承：类从基类中继承了属性和方法。 这里， Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。
//因为 Dog继承了 Animal的功能，因此我们可以创建一个 Dog的实例，它能够 bark()和 move()。
//下面我们来看个更加复杂的例子。
class Animal2{
    name:string;
    constructor(theName:string){this.name = theName;}
    move(distanceInMeters:number=0){
        console.log(`${this.name} moved ${distanceInMeters} m`);
    }
}
class Snake extends Animal2{
    constructor(name:string){super(name);}
    move(distanceInMeters=5){
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends Animal2{
    constructor(name:string){super(name);}
    move(distanceInMeters=45){
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom:Animal2 = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);

//这个例子展示了一些上面没有提到的特性。 这一次，我们使用 extends关键字创建了 Animal的两个子类： Horse和 Snake。
//与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。
//这个例子演示了如何在子类里可以重写父类的方法。 Snake类和 Horse类都创建了 move方法，它们重写了从 Animal继承来的 move方法，使得 move方法根据不同的类而具有不同的功能。 注意，即使 tom被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法：

// Slithering...
// Sammy the Python moved 5m.
// Galloping...
// Tommy the Palomino moved 34m.


//公共，私有与受保护的修饰符
//默认为 public
//你也可以明确的将一个成员标记成 public。 我们可以用下面的方式来重写上面的 Animal类：

class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

//理解 private
//当成员被标记成 private时，它就不能在声明它的类的外部访问。比如：

class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.

// TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。
// 然而，当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。
// 下面来看一个例子，更好地说明了这一点：
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.