let callCount = 0;

function fakeAPICall() {
    return new Promise(resolve => {
      setTimeout(() => {
        callCount++
        console.log("Calls Made:" + callCount)
        resolve()
      }, 300)
    })
  }

  
  function throttle(cb){
      let makingCall;
      return function(){
          if(makingCall) return;
        
          makingCall = true;
          setTimeout(()=>{
              makingCall = false;
              cb();
          },1000)
      }
  }

  const throttledFakeApiCall = throttle(fakeAPICall)

// imagine the user starting and stopping typing
// we'll only make a call every 800ms
throttledFakeApiCall() // 1
throttledFakeApiCall()
throttledFakeApiCall()
setTimeout(() => {
  throttledFakeApiCall()
  throttledFakeApiCall()
}, 600)
setTimeout(() => {
  throttledFakeApiCall() // 2
  throttledFakeApiCall()
}, 1200)
setTimeout(() => {
  throttledFakeApiCall()
  throttledFakeApiCall()
}, 1800)
setTimeout(() => {
  throttledFakeApiCall() // 3
  throttledFakeApiCall()
}, 2400)