//根据传入类属性返回该属性的类型

interface Email{
    message:string;
}
type MessageOf<T extends {message:unknown}> = T['message']

type result = MessageOf<Email>;// string

//However, what if we wanted MessageOf to take any type, and default to something like never if a message property isn’t 
// available? We can do this by moving the constraint out and introducing a conditional type:

interface Dog{
    bark():void;
}

type MessageOf2<T> = T extends {message:unknown} ? T["message"] :never 
type test1 = MessageOf2<Email>;//string
type test2 = MessageOf2<Dog>;//never



interface MyIn{
    title:string;
    description:string;
    isCompleted:boolean;
}

type AA = 'a'|'b'|'c'
type BB = 'b'

type ExcludeT<T,K> = T extends K?never:T; 
type CC = ExcludeT<AA,BB>;