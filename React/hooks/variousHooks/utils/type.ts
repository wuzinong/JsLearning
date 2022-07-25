/* eslint-disable @typescript-eslint/ban-types */

export type AnyString = string & {};

export type AnyFunction = (...args: any[]) => any;

/** Basic dictionary typing. */
export type Dict<T = any> = Record<string, T>;
