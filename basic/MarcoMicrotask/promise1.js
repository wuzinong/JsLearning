function executor(resovle, reject) {
  let rand = Math.random();
  console.log(1);
  console.log("rand ", rand);
  if (rand > 0.5) resovle();
  else reject();
}

var p0 = new Promise(executor);
var p1 = p0.then((value) => {
  console.log("succeed-1");
  return new Promise(executor);
});

var p3 = p1.then((val) => {
  console.log("succeed-2");
  return new Promise(executor);
});

var p4 = p3.then((val) => {
  console.log("succeed-3");
  return new Promise(executor);
});
p4.catch((error) => {
  console.log("error");
});

console.log(2);
