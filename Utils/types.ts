/**
 * Picks keys of an object T where values are of type V.
 * For example, allows getting keys of all properties with string values.
 */
export type KeysMatching<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

type Test1 = {
  A: string;
  B: string;
  C: boolean;
  D: number;
};

type newType = KeysMatching<Test1, string | boolean>;

/**
 * Merges props definitions with override keys taking precedence and source keys being omitted.
 * Useful when resulting type should not merge duplicate keys, but rather take the right side only.
 */
export type RightJoinProps<SourceProps, OverrideProps> = Omit<
  SourceProps,
  keyof OverrideProps
> &
  OverrideProps;
