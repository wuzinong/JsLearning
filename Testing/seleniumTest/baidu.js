// var webdriver = require("selenium-webdriver");

// var by = webdriver.By;
// var until = webdriver.until;

// var driver = new webdriver.Builder()
//                         .forBrowser('chrome')
//                         .build();
// driver.get('https://www.baidu.com');
// driver.findElement(by.id('kw')).sendKeys('webdriver');
// driver.findElement(by.id('su')).click();
// driver.wait(until.titleIs('webdriver_百度搜索'),1000);
// driver.quit();

//ref:https://www.jianshu.com/p/b048432a3f05

require('chromedriver'); //导入chrome浏览器 driver

var webdriver = require('selenium-webdriver'); //导入selenium 库
let chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;

var driver = new webdriver.Builder().forBrowser('chrome').build(); //创建一个chrome 浏览器实例
// driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();

driver.get("https://storetest.veracity.com");
driver.manage().window().maximize();
// driver.findElement(By.xpath('//*[@id="app"]/div/header/nav/a[6]')).click();
// driver.findElement(By.css("#app .vui-header-last .desktop.bold")).click();

// driver.findElement(By.xpath('//*[@id="app"]/div/div[1]/main/section[2]/div/ul/li[1]/a')).click();

// driver.findElement(By.xpath('//*[@id="app"]/div/div[1]/main/section[4]/div/div[2]/div/a')).click();

// driver.sleep(20 * 1000).then(function(){ //等待20秒
// driver.quit(); //关闭浏览器
// });

// driver.findElement(By.js(function(){
//     let ele =document.querySelector(".search-section");
//     return ele; 
// }));

// driver.findElement(By.linkText("Support")).click();
// driver.findElement(By.css(".search-section input")).sendKeys("automation");
// driver.sleep(5*1000);
// driver.findElement(By.css(".search-section a")).click();
// let div=await  driver.findElement({css:".search-section"});//定位到输入框
// await driver.actions().mouseMove(div).click()//鼠标移动到输入框点击

//更改文件上传路径
// const {Given,When,Then} = require('cucumber');
// When(/^点击上传图片$/, async function(){
//     await driver.findElement({css:".test"}).click();
//     driver.sleep(3000);
//     await driver.findElement({css:".file-input"}).sendKeys("c:\\Users\\test.txt");
//     driver.sleep(3000);
// })

//切换到其他元素（iframe）
// driver.switchTo().frame(".test-iframe-id");

// When(/^拖拽验证码块到最右侧$/, async function () {
//     await driver.switchTo().frame('test-iframe-id'); // Iframe的id
//     let div = await driver.findElement({ id:'nc_1_n1z' }) // iframe中的元素
//     console.log("div",await div.getLocation())
// });

//拖动元素
// var { Given, When, Then } = require('cucumber')
// const { driver } = require('../support/web_driver');

// Given(/^浏览网址"([^"]*)"$/, async function (url) {

//     await driver.get(url)
// });

// When(/^拖拽验证码块到最右侧$/, async function () {
//     await driver.switchTo().frame('alibaba-register-box');
//     let div = await driver.findElement({ id:'nc_1_n1z' })
//     console.log("div",await div.getLocation())
//     let div_location=await div.getLocation();
//     let offset_y=div_location.y+80
//     await driver.actions().dragAndDrop(div,{x:div_location.x,y:offset_y}).perform()
// });

//切换到alert框
// driver.switchTo().alert().dismiss();
// driver.switchTo().alert().then(function(alert){
//     return alert.dismiss();
// });

// When(/^点击按钮弹出alert窗口$/, async function () {

//     await driver.findElement({tagName:'button'}).click()//定位到按钮，点击按钮
//     let text =await driver.switchTo().alert().getText()//获取弹窗的文本信息
//     console.log("text is",text)//打印出弹窗的文本信息
// });

// Then(/^点击确定按钮$/, async function () {

//     await driver.switchTo().alert().accept()//弹出的对话框中点击确定按钮
// });

//切换tab
// When(/^点击cuketest$/, async function () {

//     await driver.findElement({tagName:"a"}).click()
// });

// Then(/^打开一个新的窗口$/, async function () {

//     let allwindows=await driver.getAllWindowHandles()
//     console.log(allwindows.length)//取到打开的窗口的数量值
//     await driver.switchTo().window(allwindows[1])
//     //切换到最后一个窗口，因为这里打开了两个窗口，数组的排序是从0开始，所以第二个窗口的索引值是1
// });

//键盘
// let div=await driver.findElement({css:'.CodeMirror-scroll'})//定位到输入框
// await driver.actions().mouseMove(div).click()//鼠标移动到输入框点击 
// await driver.actions().mouseMove(div).keyDown(Key.CONTROL).sendKeys('b').keyUp(Key.CONTROL).perform()
// //鼠标移动到输入框，keyDown(Key.CONTROL)是按下ctrl键，同时sendKeys('b')，就是ctrl+b，
// //之后keyUp(Key.CONTROL)松开ctrl

//后退
// Given(/^进入网站"([^"]*)"$/, async function (url) {

//     await driver.get(url)
// });

// When(/^点击新闻链接，进入新闻页$/, async function () {

//     await driver.findElement({linkText:'新闻'}).click()
// });

// Then(/^后退$/, async function () {

//     await driver.navigate().back()
// });

// Then(/^前进$/, async function () {

//     await driver.navigate().forward()
// });

// Then(/^刷新$/, async function () {

//     await driver.navigate().refresh()
// });

//屏幕截图
// let chrome = require('selenium-webdriver/chrome')
// let { Builder } = require('selenium-webdriver')
// require('chromedriver')
// const fs=require('fs')
// let driver = new Builder()
//     .forBrowser('chrome')
//     .setChromeOptions(new chrome.Options().headless())
//     .build();
// (async function example() {
//     await driver.get('https://www.baidu.com')
//     let imagedata=await driver.takeScreenshot()//执行截图操作，并将截图数据定义给变量imagedata
//     fs.writeFileSync(__dirname+'/image.png',imagedata,'base64')//将截图保存为图片，其中_dirname是当前目录，
//     ///image.png为图片的命名，imagedata是刚刚的截图数据，'base64'是图片的编码格式
// })()