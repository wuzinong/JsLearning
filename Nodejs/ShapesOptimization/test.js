let a = {x:1,y:2,z:3};

let b = {};
b.x = 1;
b.y=2;
b.z = 3;

console.log("a is", a);
console.log("b is", b);
console.log("a and b have same map:", %HaveSameMap(a, b));


let c = {};
c.x = 1;
c.y=2;
c.z = 3;

console.log("b is", b);
console.log("c is", c);
console.log("b and c have same map:", %HaveSameMap(b, c));

// node --allow-natives-syntax test.js