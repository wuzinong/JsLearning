let callCount = 0;

function fakeAPICall(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            callCount++;
            console.log("calls Made:"+callCount);
            resolve();
        },300);
    });
}
fakeAPICall();
fakeAPICall();
fakeAPICall();

function debounce(callback){
    let timeoutId;
    return function(){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback,800);
    }
}

const debouncedFakeApiCall = debounce(fakeAPICall)

// all these calls cancel each other
// Until the last call finally happens after 800 ms
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall()
debouncedFakeApiCall() // 4