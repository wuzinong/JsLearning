// At the heart of most useful programs, we have to make decisions based on input. 
// JavaScript programs are no different, but given the fact that values can be easily introspected,
//  those decisions are also based on the types of the inputs. 
// Conditional types help describe the relation between the types of inputs and outputs.
interface Animal {
    live():void;
}
interface Dog extends Animal{
    woof():void;
}

type example1 = Dog extends Animal ? number:string;

interface IdLabel {
    id: number /* some fields */;
  }
  interface NameLabel {
    name: string /* other fields */;
  }
   
  function createLabel(id: number): IdLabel;
  function createLabel(name: string): NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
  }

//   These overloads for createLabel describe a single JavaScript function that makes a choice based on the types of its inputs. Note a few things:

// If a library has to make the same sort of choice over and over throughout its API, this becomes cumbersome.
// We have to create three overloads: 
// one for each case when we’re sure of the type (one for string and one for number), 
// and one for the most general case (taking a string | number). 
// For every new type createLabel can handle, the number of overloads grows exponentially.
//Instead, we can encode that logic in a conditional type:
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

  //We can then use that conditional type to simplify our overloads down to a single function with no overloads.

  function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
  }
   
  let a = createLabel("typescript");
     
  //let a: NameLabel
   
  let b = createLabel(2.8);
     
  //let b: IdLabel
   
  let c = createLabel(Math.random() ? "hello" : 42);
  //let c: NameLabel | IdLabel