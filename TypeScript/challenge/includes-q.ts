// Implement the JavaScript Array.includes function in the type system. 
// A type takes the two arguments. The output should be a boolean true or false.
//For example

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Santana'> // expected to be `false`

type Includes<S extends any[], T> = T extends S[number]? true: false