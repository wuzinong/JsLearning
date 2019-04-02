// var addNum=require('../src/index')

// describe('测试index.js', function() {
//   describe('测试addNum函数', function() {
//     it('两数相加结果为两个数字的和', function() {
//        if(addNum(1,2)!==3){
//          throw new Error("两数相加结果不为两个数字的和");
//        }
//     });
//   });
// });

// 测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。
// describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"测试index.js"），第二个参数是一个实际执行的函数。
// it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"两数相加结果为两个数字的和"），
// 第二个参数是一个实际执行的函数。
// 在上面的Mocha例子中，测试失败用抛异常来处理，多少有点繁琐，所以就有了断言库的出现。
// 这里我们介绍一个常用的断言库chai。
// 可以简单理解为这就是对我们上面抛异常方法的一个封装，当判断失败时会抛出一个异常。
// 首先安装chai：
 

// import {assert} from 'chai'
// import addNum from '../src/index'

// describe('测试index.js',()=> {
//   describe('测试addNum函数', ()=> {
//     it('两数相加结果为两个数字的和', ()=> {
//       assert.equal(addNum(1,2),3)
//     })
//   })
// })

// describe('测试index.js',()=> {
//   before(()=>console.info("在本区块的所有测试用例之前执行"))

//   after(()=>console.info("在本区块的所有测试用例之后执行"))

//   beforeEach(()=>console.info("在本区块的每个测试用例之前执行"))

//   afterEach(()=>console.info("在本区块的每个测试用例之后执行"))

//   describe('测试addNum函数', ()=> {
//     it('两数相加结果为两个数字的和', ()=> {
//       assert.equal(addNum(1,2),3)
//     })
//   })
// })



// React的组件结构和JSX语法，对上一章的内容来讲进行测试显得很勉强。
// React官方已经提供了一个测试工具库：react-dom/test-utils
// 只是用起来不够方便，于是有了一些第三方的封装库，比如Airbnb公司的Enzyme
// Enzyme 的安装与配置
// npm install --save-dev enzyme

// 而enzyme还需要根据React的版本安装适配器，适配器对应表如下：



// Enzyme Adapter Package    React semver compatibility

// enzyme-adapter-react-16   ^16.0.0

// enzyme-adapter-react-15   ^15.5.0

// enzyme-adapter-react-15.4  15.0.0-0 - 15.4.x

// enzyme-adapter-react-14    ^0.14.0

// enzyme-adapter-react-13    ^0.13.0

 

import {assert} from 'chai';
import React from 'react';
import Enzyme from '../config/Enzyme.config';
import Adapter from 'enzyme-adapter-react-16';
import Example from '../src/example.jsx';

const {shallow,mount,render} = Enzyme;


//在使用Enzyme 前需要先适配React对应的版本

describe('Enzyme shallow的浅渲染（Shallow Rendering）中', function () {
  it('Example组件中按钮的名字为子组件Sub中span的值', function () {
    const name='按钮名'
    let app = render(<Example text={name} />)
    const buttonObj=app.find('button')
    const spanObj=app.find('span')

    console.info(`查找到button的个数：${buttonObj.length}`)
    console.info(`查找到span的个数：${spanObj.length}`)

    assert.equal(buttonObj.text(),spanObj.text())
  })
});


// Enzyme 的使用之浅渲染shallow
// 上面的例子中就用到浅渲染shallow 。
// Shallow Rendering（浅渲染）指的是，将一个组件渲染成虚拟DOM对象，但是只渲染第一层，不渲染所有子组件，所以处理速度非常快。它不需要DOM环境，因为根本没有加载进DOM。
// shallow的函数输入组件，返回组件的浅渲染结果，而返回的结果可以用类似jquery的形式获取组件的信息。


// Enzyme 的使用之mount
// mount方法用于将React组件加载为真实DOM节点。
// 然而真实DOM需要一个浏览器环境，为了解决这个问题，我们可以用到jsdom. See ./test/setup.js 并配置命令 --require ./test/setup.js
//这样在运行npm test时，会先用babel解析js，然后再执行setup.js中的代码，给global对象模拟一个浏览器环境。

// Enzyme 的使用之render
// 而Enzyme还提供了一个不需要jsdom模拟环境解决子组件测试的方法：render。
// Enzyme的render函数得到的结果被称为Static Rendered Markup

// 意思就是说render会根据react组件得到一个静态HTML文本结果，
// 借助一个第三方的HTML解析库Cheerio去生成一个类似于mount和shallow得到的封装对象。


// 结果证明:
// shallow果然最快，这是肯定的，但是因为shallow的局限性，我们可能更想知道render和mount的效率。
// 事实证明，render的效率是mount的两倍。
// 有人可能要质疑你为什么不将次数弄更大一点，因为在设定为1000次的情况下mount直接超时了，也就是超过了mocha的默认执行时间限定2000ms。
// 那么问题来了，mount存在的价值是什么，render就可以测试子组件，render还不需要jsdom和额外的配置。
// 当然是有价值的，shallow和mount因为都是dom对象的缘故，所以都是可以模拟交互的，比如
// const nav = mount(<Nav />)
// nav.find('a').simulate('click')
// 而render是不能的。
// 简而言之，Enzyme主要包括三个测试：
// 一个是浅渲染的shallow，这个生成虚DOM对象，所以渲染最快，然而它并不能测试子组件的相关代码。
// 另一个是DOM渲染mount，它会生成完整的DOM节点，所以可以测试子组件。但是要依赖一个用jsdom模拟的浏览器环境。
// 最后一个是HTML文本渲染render，它会将react组件渲染为html文本，然后在内部通过Cheerio自动生成一个Cheerio对象。



// 渲染方法  是否可以测试子组件  是否可以模拟交互  性能（测试500次）

// shallow  否                 是               116ms
// mount    是                 是               421ms
// render   是                 否                984ms
