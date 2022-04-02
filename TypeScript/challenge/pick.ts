interface Todo{
    title:string;
    description:string;
    completed:boolean;
}

type MyPick<T,K extends keyof T> = {
    [P in K]:T[P] //使用in 来遍历联合类型(Union ：'title'|'completed'),那么T[P]即取到了对应类型的值：Todo[title]:string
}

type ToDoPreview = MyPick<Todo,'title'|'completed'>

const todo:ToDoPreview = {
    title:"test",
    completed:false
}