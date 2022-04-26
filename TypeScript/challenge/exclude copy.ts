type MyExclude<T,U> = any

type A = "a" | "b" | "c"
type B = "a"
type C = MyExclude<A,B> // C = "b" | "c"
