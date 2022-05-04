type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }

  type DeepReadonly<T> = T extends object? {
      readonly [K in keyof T]:DeepReadonly<T[K]>
  }: T
  
  type Todo2 = DeepReadonly<X> // should be same as `Expected`