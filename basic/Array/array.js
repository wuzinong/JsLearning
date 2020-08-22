Array.testfrom = (function(){
    const toStr = Object.prototype.toString;
    const isCallable = fn => typeof fn === 'function' || toStr.call(fn) === '[object Function]';

    const toInteger = value =>{
        const v = Number(value);
        if(isNaN(v)) return 0;
        if(v===0 || !isFinite(v)) return v;
        return (v > 0 ? 1:-1) * Math.floor(Math.abs(v));
    }

    const maxSafeInteger = Number.MAX_SAFE_INTEGER;
    const toLength = value =>{
        const len = toInteger(value);
        return Math.min(maxSafeInteger,Math.max(0,len));
    }

    return function testfrom (arrayLike){
        const that = this;
        if(arrayLike === null) throw new TypeError("Array.from requires an array-like object - not null or undefined")；

        const items = Object(arrayLike);
        let thisArg = '';
        const mapFn = arguments.length > 1 ? arguments[1] : void 0;
        if(typeof mapFn !== 'undefined'){
            if(!isCallable(mapFn)) throw new TypeError("Array.from when provided mapFn must be a function")
            if(arguments.length > 2) thisArg = arguments[2]
        }
        const len = toLength(items.length);
        const arr = isCallable(that) ? Object(new that(len)) : new Array(len);

        let i = 0,
            iValue;
        while(i < len){
            iValue = items[i];
            if(mapFn) arr[i] = typeof thisArg === 'undefined' ? mapFn(iValue,i) : mapFn.call(thisArg,iValue,i)
            else 
                arr[i] = iValue
            i++
        }
        arr.length = len;
        return arr;
    }
})();


Array.prototype.forEach = function(callback,thisArg){
    if(this == null) throw new TypeError("this is null or not defined");
    let newArr = Object(this);
    let len = newArr.lenght >>> 0;
    if(typeof callback !== 'function') throw new TypeError(callback + " is not a function");
    let thatArg = arguments.length >= 2 ? arguments[1] : void 0;
    let k = 0;
    while (k < len){
        if(k in newArr){
            callback.call(thatArg, newArr[k], k, newArr);
        }
        k++
    }
    return void 0;
}