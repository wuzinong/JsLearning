//JavaScript already has a typeof operator you can use in an expression context:
//Prings "string"
console.log(typeof "Hello world")

// This isn’t very useful for basic types, but combined with other type operators, 
// you can use typeof to conveniently express many patterns. For an example, 
// let’s start by looking at the predefined type ReturnType<T>.
//  It takes a function type and produces its return type:
type Predicate = (x:unknown) => boolean;
type K = ReturnType<Predicate>

//If we try to use ReturnType on a function name, we see an instructive error:

function f() {
    return { x: 10, y: 3 };
  }
type P = ReturnType<f>;

//Remember that values and types aren’t the same thing. To refer to the type that the value f has, we use typeof:
type P2 = ReturnType<typeof f>

//Limitations
//TypeScript intentionally limits the sorts of expressions you can use typeof on.
//Specifically, it’s only legal to use typeof on identifiers (i.e. variable names) or their properties. 
//This helps avoid the confusing trap of writing code you think is executing, but isn’t:

// Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?");

