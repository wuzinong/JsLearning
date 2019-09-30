require('chromedriver')
const {Builder,By,Key,until,webdriver} = require('selenium-webdriver');

(async function example(){
    let driver = new Builder().forBrowser('chrome').build();
    try {
        await driver.get("https://storetest.veracity.com");
        await driver.findElement(By.css(".search-section input")).sendKeys("automation");
    } catch (error) {
        driver.quit();
    }

})();