type MyExclude2<T, U> = any;

type A1 = "a" | "b" | "c";
type B1 = "a";
type C1 = MyExclude2<A1, B1>; // C = "b" | "c"
