//Give an array, transform into an object type and the key/value must in the given array.
//For example
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type TupleToObject<T extends readonly string[]> = {
    [K in T[number]]:K
}
const t3 = typeof tuple;

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}