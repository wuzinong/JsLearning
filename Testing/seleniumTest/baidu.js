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

require('chromedriver'); //导入chrome浏览器 driver

var webdriver = require('selenium-webdriver'); //导入selenium 库
var By = webdriver.By;

var driver = new webdriver.Builder().forBrowser('chrome').build(); //创建一个chrome 浏览器实例

driver.get("https://storetest.veracity.com");
// driver.findElement(By.xpath('//*[@id="app"]/div/header/nav/a[6]')).click();
// driver.findElement(By.css("#app .vui-header-last .desktop.bold")).click();

// driver.findElement(By.xpath('//*[@id="app"]/div/div[1]/main/section[2]/div/ul/li[1]/a')).click();

// driver.findElement(By.xpath('//*[@id="app"]/div/div[1]/main/section[4]/div/div[2]/div/a')).click();

// driver.sleep(20 * 1000).then(function(){ //等待20秒
// driver.quit(); //关闭浏览器
// });

