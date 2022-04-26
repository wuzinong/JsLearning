interface Todo{
    title:string;
    description:string;
}

type MyReadOnly<T> = {
    readonly[K in keyof T]:T[K]
}

let todo2:MyReadOnly<Todo> = {
    title:"hey",
    description:"footbar"
}
todo2.title = "Hello"
todo2.description = "barfoo"