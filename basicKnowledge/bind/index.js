function foo(something) {
    this.a = something
  }
  
  var obj1 = {};
  
  var bar = foo.bind(obj1);
  bar(2);
  
  console.log(obj1.a);  // 2
  
  var baz = new bar(3);
  console.log(obj1.a);  //2
  console.log(baz.a);  //3


  if(!Function.prototype.bind){
     Function.prototype.bind = function(oThis){
        if(typeof this !== 'function'){
            throw new TypeError('Function.prototype.bind - hat is trying to be bound is not callable')
        }
  
        var aArgs = Array.prototype.slice.call(arguments,1),
            fToBind = this,
            fNOP = function(){},
            fBound = function(){
                return fToBind.apply(this instanceof fNOP
                                     ? this   //当 new 一个return出来的对象（fBound）的时候
                                     : oThis || this, 
                                     aArgs.concat(Array.prototype.slice.call(arguments))); //var a = xxx.bind(obj,parm1,parm2) ,a(parm3,parm4) 连接参数 
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
     }
  }


  
