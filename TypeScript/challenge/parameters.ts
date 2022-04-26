//Implement the built-in Parameters generic without using it.

const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: {a: 'A'}): void => {}
const baz = (): void => {}

type A = MyParameters<typeof foo>;//[string, number]
type B = MyParameters<typeof bar>;//[boolean, {a: 'A'}]
type C = MyParameters<typeof baz>;//[]

type MyParameters<T extends (...args:any[])=>any>=T extends (...args:infer R)=>any?R:[]