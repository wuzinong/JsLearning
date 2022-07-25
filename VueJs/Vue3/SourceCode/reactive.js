function reactive(target) {
  if (!isObject(target)) return;

  let result = new Proxy(target, {
    get(target, key, receiver) {
      console.log("target ", target);
      console.log("prop ", key);
      console.log("receiver ", receiver);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log("old value ", target[key]);
      console.log("new value ", value);
      return Reflect.set(target, key, value, receiver);
    },
  });
  return result;
}
