
function add(){
    var _arr = [].slice.call(arguments);

    var adder = function(){
        
        var _adder = function(){
            [].push.apply(_arr,[].slice.call(arguments));
            return _adder;
        }
        _adder.valueOf = function(){
            return _arr.reduce(function(a,b){
                return a+b;
            })
        }
        return _adder;
    }
    return adder.apply(null,[].slice.call(arguments));
}

console.log(add(1)(2)(3)+"");