import { DependencyList, useCallback, useRef } from "react";
import { AnyFunction } from "../utils";

export default function useCllbackRef<T extends AnyFunction>(
  callback?: T,
  deps: DependencyList = []
) {
  const ref = useRef(callback);
  ref.current = callback;
}
