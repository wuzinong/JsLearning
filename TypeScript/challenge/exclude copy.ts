type MyExclude2<T, U> = any;

type A1 = "a" | "b" | "c";
type B1 = "a" | "b";
type C1 = MyExclude2<A1, B1>; // C1 = "b" | "c"
