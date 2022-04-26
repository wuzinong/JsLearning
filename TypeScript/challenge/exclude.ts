type MyExclude<T,U> = T extends U ? never : T;

//Type 类型 eg：
//T 类型为T: a b c
//U 类型为U: a
//会依次对比 T中的 a在 U中有吗？ 有返回A(上面为never则不返回，即表示如果有就过滤掉)
//再比较T中得b在U中有吗？ 没有就返回b

type A = "a" | "b" | "c"
type B = "a"
type C = MyExclude<A,B> // C = "b" | c
