function* foo() {
  let response1 = yield fetch("https://baidu.com");
  console.log("response1 ", response1);
  let response2 = yield fetch("https://bing.com");
  console.log("response2 ", response2);
}

let gen = foo();
function getGenPromise(gen) {
  gen.next().value;
}

getGenPromise(gen)
  .then((response) => {
    console.log("response1");
    console.log(response);
    return getGenPromise(gen);
  })
  .then((response) => {
    console.log("response2");
    console.log(response);
  });

//-------------------------------------------------------------------

async function foo() {
  console.log("foo");
}

async function bar() {
  console.log("bar start");
  await foo();
  console.log("bar end");
}

console.log("script start");
setTimeout(() => {
  console.log("setTimeout", 0);
}, 0);
bar();
new Promise((resolve) => {
  console.log("promise executor");
  resolve();
}).then(() => {
  console.log("promise then");
});

console.log("script end");
