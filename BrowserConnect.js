const {Builder, By, ChromiumWebDriver} = require('selenium-webdriver');
const express = require("express");
let chrome = require('selenium-webdriver/chrome')
const app = express();
const port = 3001;
var cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());
var jsonParser = bodyParser.json()

  app.get("/", function (req, res) {
    res.send("Hello World!");
  });
  
  var server = app.listen(port, function () {
    console.log(`LPIS-Bot-Server läuft im Portal: ${port}!`);
  });
  const name = 'LPIS-Bot'





    async function example(username, password, lvname, lvcode, time, plan, sbwl) {
      const today = new Date()
      const myDate = new Date(
      `${new Date().toISOString().split('T')[0]}T${
        time - 2 >= 10 ? time - 2 : '0' + (time - 2)
      }:00:00Z`
    );
      console.log(myDate.toString())
      console.log('SBSWL:',sbwl)
        let driver = await new Builder().forBrowser('chrome').build();
        try {
          await driver.get('https://lpis.wu.ac.at/lpis');
           console.log(await driver.findElement(By.id('login')));
           try {
            await  driver.findElement(By.xpath("//*[@id='login']/table/tbody/tr[1]/td[2]/input")).sendKeys(`${username}`)
            await  driver.findElement(By.xpath("//*[@id='login']/table/tbody/tr[2]/td[2]/input")).sendKeys(`${password}`)
            await   driver.findElement(By.xpath("//input[contains(@value,'Login')]")).submit()
            if(sbwl == 'true'){
              if(plan){
                await   driver.findElement(By.xpath(`//form[contains(., 'Studium/Abschnitt')]`))
                await   driver.findElement(By.xpath(`//form[contains(., 'Studium/Abschnitt')]//select`)).click()
                await  driver.findElement(By.xpath(`//option[text()='${plan}']`)).click()
                await   driver.findElement(By.xpath(`//form[contains(., 'Studium/Abschnitt')]//input[contains(@value, 'anzeigen')]`)).click()
              }
              //Nummerneingabe LV-Nummer /html/body/form/input[2]
              await   driver.findElement(By.xpath(`//a[contains(., 'Nummerneingabe')]`)).click()
              await   driver.findElement(By.xpath(`//form[contains(., 'LV-Nummer')]/input[2]`)).sendKeys(`${lvcode}`)
              setTimeout(async ()=>{
              await   driver.findElement(By.xpath(`//form[contains(., 'LV-Nummer')]//input[contains(@value, 'anmelden ...')]`)).click()
            }, 
            (myDate - Date.now()) - 50)
            }
            else{
              if(plan){
                await   driver.findElement(By.xpath(`//form[contains(., 'Studium/Abschnitt')]`))
                await   driver.findElement(By.xpath(`//form[contains(., 'Studium/Abschnitt')]//select`)).click()
                await  driver.findElement(By.xpath(`//option[text()='${plan}']`)).click()
                await   driver.findElement(By.xpath(`//form[contains(., 'Studium/Abschnitt')]//input[contains(@value, 'anzeigen')]`)).click()
              }
              await   driver.findElement(By.xpath(`//td[contains(., '${lvname}')]`))
             await   driver.findElement(By.xpath(`//td[contains(., '${lvname}')]//a[contains(.,'anmelden')]`)).click()
             console.log((myDate - Date.now()))
             setTimeout(async ()=>{
              await driver.navigate().refresh();
		console.log(await driver.findElement(By.xpath(`//tr[contains(.,'${lvcode}')]//input[contains(@value,'anmelden')]`)))
              await driver.findElement(By.xpath(`//tr[contains(.,'${lvcode}')]//input[contains(@value,'anmelden')]`)).click()
            }, 
             (myDate - Date.now()) - 50)
            }
            
            ///html/body/form/span[1]
          
           } catch (error) {
            console.log(error)
           }
        } finally {
         // await driver.quit();
        }

      //(myDate - Date.now()) - 10
        
      }

      app.post('/activateBot/inputValues' , jsonParser,  (req, res) => {
        console.log(req.body)
        const username = req.body.username
        const password = req.body.password
        const lvname = req.body.lvname
        const lvcode = req.body.lvcode
        const time = req.body.time
        const plan = req.body.plan
        const sblw = req.body.sbwl
      
        try {
          example(username, password, lvname, lvcode, time, plan, sblw)
        } finally {
         // server.close() node BrowserConnect.js
        }

      })



