 
//   import {Multiply} from './test2';
   let dom = document.querySelector(".test");
//    dom.innerHTML = Multiply(5,3);
   dom.style.color = "purple";
   let id = require.resolve("./test2");
   let btn = document.querySelector(".lazyload");
   let num = 1;
   btn.addEventListener("click",function(){
       
       import(
           /* webpackChunkName:"mychunk" */
           /* webpackMode:"lazy" */
           './test2').then(o=>{
            dom.innerHTML = o.Multiply(num,num++)+"---"+id;
            num+=1;
       });
   })
 