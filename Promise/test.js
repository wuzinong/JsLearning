//https://juejin.im/post/5ec5eed6e51d45788d1caeec
class Promise {
    callbacks = [];
    state = 'pending';
    value = null;
    constructor(fn){
        fn(this._resolve.bind(this),this._reject.bind(this));
    }

    then(onFulfilled,onReject){
        return new Promise((resolve,reject)=>{
            this._handle({
                onFulfilled:onFulfilled || null,
                onReject:onRejected || null,
                resolve:resolve,
                reject:reject
            })
        })
    }

    catch(onError){
        return this.then(null,onError)
    }

    finally(onDone){
        if( typeof onDone != 'function') return this.then();

        let Promise = this.constructor;
        return this.then(value=>Promise.resolve(onDone()).then(()=>value), reason=> Promise.resolve(onDone()).then(()=>{throw reason}))
    }

    _handle(callback){
        if(this.state === 'pending'){
            this.callbacks.push(callback);
            return;
        }
        let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
        if(!cb){
            cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(this.value);
            return;
        }

        let ret;
        try {
            ret = cb(this.value);
            cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
        }catch(error){
            ret = error;
            cb = callback.reject;
        }finally{
            cb(ret);
        }
    }

    _resolve(value){
        if(value && (typeof value === 'object' || typeof value === 'function')){
            var then = value.then;
            if(typeof then === 'function'){
                then.call(value,this._resolve.bind(this),this._reject.bind(this));
                return;
            }
        }
        this.state = 'fulfilled';
        this.value = value;
        this.callbacks.forEach(callback => this._handle(callback));
    }

    _reject(error){
        this.state = 'rejected';
        this.value = error;
        this.callback.forEach(callback => this._handle(callback));
    }

}


class Promise2 {
    callbacks = [];
    state = 'pending';
    value = null;
    constructor(fn){
        fn(this.resolve.bind(this))
    }
    then(fulfilled){
        if(this.state === 'pending'){
            this.callbacks.push(fulfilled)
        }
        fulfilled(this.value);
        return this;
    }
    resolve(val){
        this.state = 'fulfilled';
        this.value = val;
        this.callbacks.forEach(fn => fn(val))
    }
}


let p = new Promise2(resolve => {
    console.log('同步执行');
    resolve('同步执行');
}).then(tip => {
    console.log('then1', tip);
}).then(tip => {
    console.log('then2', tip);
});

setTimeout(() => {
    p.then(tip => {
        console.log('then3', tip);
    })
});


class Promise3 {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        return new Promise(resolve => {
            this._handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    }
    _handle(callback) {
        if (this.state === 'pending') {
            this.callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if (!callback.onFulfilled) {
            callback.resolve(this.value);
            return;
        }
        var ret = callback.onFulfilled(this.value);
        callback.resolve(ret);
    }
    _resolve(value) {
        this.state = 'fulfilled';//改变状态
        this.value = value;//保存结果
        this.callbacks.forEach(callback => this._handle(callback));
    }
}










/**
 * 模拟异常异步请求
 * @param {*} url
 * @param {*} s
 * @param {*} callback
 */
const mockAjax = (url, s, callback) => {
    setTimeout(() => {
      callback(url + '异步请求耗时' + s + '秒', '出错了!');
    }, 1000 * s)
  }
   
  //demo reject
  new Promise((resolve, reject) => {
   
      mockAjax('getUserId', 1, function (result, error) {
          if (error) {
              reject(error)
          } else {
              resolve(result);
          }
      })
   
  }).then(result => {
      console.log(result);
  }, error => {
      console.log(error);
  });

  

  class PromiseTest{
      callbacks = [];
      state = 'pending';
      value = null;
      constructor(fn){
         fn(tis.resolve.bind(this))
      }
      then(onFulfilled){
          return new Promise(resolve=>{
              this.handle({
                  onFulfilled:onFulfilled,
                  resolve:resove
              })
          })
      }
      handle(callback){
         if(this.state === 'pending'){
             this.callbacks.push(callback);
             return;
         }
         if(!callback.onFulfilled){
             callback.resolve(this.value);
         }
         let ret = callback.onFulfilled(this.value);
         callback.resolve(ret);
      }
      resolve(value){
         if(value && (typeof value === 'object' || typeof value ==='function')){
             let then = value.then;
             if(typeof then === 'function'){
                 then.call(value,this.resolve.bind(this));
             }
         }

         this.state = 'pending';
         this.value = value;
         this.callbacks.forEach(fn=>fn(value))
      }
  }