//If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? 
//For example if we have Promise<ExampleType> how to get ExampleType?

type MyAwaited<T> = T extends Promise<infer S> ? S extends Promise<any>?MyAwaited<S>:S:T


type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type test1 = MyAwaited<X>
type test2 = MyAwaited<Y>
type test3 = MyAwaited<Z>

//MyAwaited<X>
type error = MyAwaited<number>
