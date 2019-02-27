// 前端测试存在的问题
// 在讲Sinon之前，我们得先讲一下在学习了Mocha、chai以及enzyme之后，我们的前端测试还存在的一些问题。
// 比如前台测试需要与后台交互，获取后台数据后再根据相应数据进行测试。
// 又比如一个函数测试依赖另一个函数，我们可以根据测试的目的去模拟另一个函数，讲两者的测试分开，从而达到测试中也能解耦的目的。
// 测试辅助工具Sinon
// Sinon是用来辅助我们进行前端测试的，在我们的代码需要与其他系统或者函数对接时，它可以模拟这些场景，从而使我们测试的时候不再依赖这些场景。
// Sinon有主要有三个方法辅助我们进行测试：spy，stub，mock。
 


import {assert} from 'chai';
import sinon from 'sinon';
import once from '../src/once';

describe("test once function",function(){

//Sinon之spy
//     spy生成一个间谍函数，它会记录下函数调用的参数，返回值，this的值，以及抛出的异常。
// 而spy一般有两种玩法，一种是生成一个新的匿名间谍函数，另外一种是对原有的函数进行封装并进行监听。

// 搭好上面的结构后，直接在once.test.js里面写入spy的使用例子：
// sinon.spy()会产生一个函数对象，当once调用这个函数对象后，这个函数对象通过called可以返回一个bool值，表示函数是否被调用。


    describe('测试Once函数', function () {
        it('传入Once的函数会被调用', function () {
          var callback = sinon.spy();
          var proxy = once(callback);
      
          proxy();
      
          assert(callback.called);
        });

// 现在来看看spy的另一种玩法，即对原有函数的监控玩法，在once.test.js中加入以下测试用例

        it('对原有函数的spy封装，可以监听原有函数的调用情况', function () {
            const obj ={
                func:()=>{
                    return 1+1;
                }
            }
            sinon.spy(obj,'func');
            obj.func(3);
            assert(obj.func.calledOnce);
            assert.equal(obj.func.getCall(0).args[0],3);
       });
    });

    // // Sinon之Stub
    // stub是带有预编程行为的函数。
    // 简单点说，就是spy的加强版，不仅完全支持spy的各种操作，还能操作函数的行为。
    // 和spy一样，stub也能匿名，也能去封住并监听已有函数。
    // 然而有一点和spy不同，当封装了一个已有函数后，原函数不会再被调用。
    // 对于匿名的玩法我们就不说了，直接来封装的玩法，以下是对之前spy封装的修改：
    
    it('对原有函数的stub封装，可以监听原有函数的调用情况,以及模拟返回', function () {
         const obj = {
             func:()=>{
                 console.info(1)
             }
         }
         sinon.stub(obj,'func').returns(43);

         const result = obj.func(3);
         assert(obj.func.calledOnce);
         assert.equal(obj.func.getCall(0).args[0],3);
         assert.equal(result,43);
    });


    //Sinon之mock
    //mock像spy和stub一样的伪装方法，如果mock没有得到期望的结果就会测试失败。
    it('mock的测试', function () {
        var myAPI = {
            method: function () {
                console.info("运行method")
            },
            func: function () {
                console.info("运行method")
            }
        };
        var mock = sinon.mock(myAPI);
        mock.expects("method").once().returns(2);
        mock.expects("func").twice()

        myAPI.method();
        myAPI.func();
        myAPI.func();

        mock.verify();
    });
    // 在以上代码中，mock其实和stub很像，只不过是stub是对对象中单个函数的监听和拦截，而mock是对多个。
    // mock首先会对函数进行一个预期：
    // var mock = sinon.mock(myAPI);
    // mock.expects("method").once().returns(2);
    // mock.expects("func").twice()
    // 比如once就是预期运行一次，如果最终验证时函数没有被执行或者执行多次都会抛出错误。
    // 也可以操作返回结果，比如像stub一样returns(2)依然有效。
    // 而且与stub一样，在mock监听后，原有函数内容将不会执行。
    
    // 在进行了预期操作后，就对函数进行实际操作：
    // myAPI.method();
    // myAPI.func();
    // myAPI.func();
    // 最后再进行验证操作：
    // mock.verify();
    // Sinon主要是一个测试辅助工具，通过伪装和拦截，来模拟与其他系统或函数的操作，可以解耦测试的依赖。
    // 在上面只讲到了Sinon的spy、stub和mock三个函数，其实还有fake XHR（模拟xhr请求）、fack server（模拟服务器）以及fake timer（模拟定时器）等操作
 



})