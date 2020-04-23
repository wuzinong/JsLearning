//跟踪应用中所有的异步资源
//https://www.jianshu.com/p/4a568dac41ed

// const async_hooks = require('async_hooks');
// const fs = require('fs');
// const eid = async_hooks.executionAsyncId();

// const tid = async_hooks.triggerAsyncId();

// const asyncHook = async_hooks.createHook({
//     init,
//     before,
//     after,
//     destroy,
//     promiseResolve
// });

// asyncHook.enable();
// // asyncHook.disable();


// function init(asyncId,type,triggerAsyncId,resource){

// }

// function before(asyncId){}
// function after(asyncId){}
// function destory(asyncId){}
// function promiseResolve(asyncId){}


// const async_hooks = require('async_hooks');
// const fs = require('fs');
// const hook = async_hooks.createHook({
//     init(asyncId, type, triggerAsyncId, resource) {
//         fs.writeSync(1, `init: asyncId-${asyncId},type-${type},triggerAsyncId-${triggerAsyncId}\n`);
//     },
//     before(asyncId) {
//         fs.writeSync(1, `before: asyncId-${asyncId}\n`);
//     },
//     after(asyncId) {
//         fs.writeSync(1, `after: asyncId-${asyncId}\n`);
//     },
//     destroy(asyncId) {
//         fs.writeSync(1, `destroy: asyncId-${asyncId}\n`);
//     }
// });

// hook.enable();
// console.log('hello');
// console.log("hi");
// hook.disable();    // 注意，这里不要disable，否则只能触发init事件



const fs = require('fs');
const asyncHooks = require('async_hooks');

class MyResource extends asyncHooks.AsyncResource {
    constructor() {
        super('my-resource');
    }

    asyncMethod(callback) {
        this.emitBefore();
        callback();
        this.emitAfter();
    }

    close() {
        this.emitDestroy();
    }
}

const hook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        fs.writeSync(1, `init: asyncId-${asyncId}, type-${type}, triggerAsyncId-${triggerAsyncId}\n`);
    },
    before(asyncId) {
        fs.writeSync(1, `before: asyncId-${asyncId}\n`);
    },
    after(asyncId) {
        fs.writeSync(1, `after: asyncId-${asyncId}\n`);
    },
    destroy(asyncId) {
        fs.writeSync(1, `destroy: asyncId-${asyncId}\n`);
    },
    promiseResolve(asyncId){
        fs.writeSync(1,`promise resolved:${asyncId}\n`);
    }
});

hook.enable();

let resource = new MyResource;
resource.asyncMethod(() => { });
resource.close();

// Promise.resolve(1729).then(() => {
//   });


// hook.disable();    // 注意，这里不要disable，否则将不会触发destroy事件