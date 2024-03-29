declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// expect the type of result to be:
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}

type Chainable<T extends object = {}> = {
    option<K extends string, V>(key: K, value: V): Chainable<T & {
      [P in K]: V
    }>
    get(): T
  }
