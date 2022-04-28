type obj = {
    name:string;
    innerObj:innerObj
    test:unionT
}

type innerObj={
    age:number;
    email:string;
}

type unionT = 'a'|'b'|'c'

type GetType<T> = T extends object ? T extends infer O ? {
    [K in keyof O]:GetType<O[K]>
}:never:T;

type a =  GetType<obj>;



type Example<T> = T extends object? T extends infer O?{
    [K in keyof O]: Example<O[K]>
} :never:T

type b = Example<obj>;

type aaa = "a"|"c"
type c= Example<aaa>