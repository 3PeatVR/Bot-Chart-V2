import puppeteer from "puppeteer";
import fs from "fs";

//import path from 'path';
//import { format, getISOWeek } from "date-fns";




const main = async () => {
    try{
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const monthDays = {"January":31, "February":28, "March":31, "April":30, "May":31, "June":30,
        "July":31, "August":31, "September":30, "October":31, "November":30, "December":31
    };
    const url = 'https://www.thisdayinmusic.com/birthday-no1/';
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
            '--disable-features=site-per-process',
        ],
        headless: true
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
            req.abort();
        } else {
            req.continue();
        }
    });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0});

    for (let year = 1970; year <= 1979; year++){
        const filePath = `./db/${year}.json`
        if (!(fs.existsSync(filePath))){
            fs.writeFileSync(filePath,JSON.stringify({}));
        };
        var jsonData = fs.readFileSync(filePath);
        var obj = JSON.parse(jsonData);
        //console.log(obj)
        for (const month of monthNames){
            for (let day = 1; day <= monthDays[month]; day++){
                const date = day.toString() + month;
                if (!(obj.hasOwnProperty(date))){
                    await page.waitForSelector("#year_start", {timeout:0});
                    await page.select("#day_start", day.toString());
                    await page.select("#month_start", month);
                    await page.select("#year_start", year.toString());
                    await page.waitForSelector("#mvp-content-main > div.TDIM-Birthday-No1-jukebox-container-background > div > form > div > button", {waitUntil: 'networkidle2', timeout: 0});
    
                    await page.click("#mvp-content-main > div.TDIM-Birthday-No1-jukebox-container-background > div > form > div > button");
                    await page.waitForSelector("#birthday--loop > div.tdim-on-this-day-birthday-titles > div.birthday--artist", { waitUntil: 'networkidle2', timeout: 0 });
                    //await page.waitForSelector("#birthday--loop > div.tdim-on-this-day-birthday-titles > div.birthday--number1", { waitUntil: 'networkidle2', timeout: 0 });
                    const names = await page.evaluate(() => {
                    const cadre_list = Array.from(document.querySelectorAll(".tdim-on-this-day-birthday-titles"));
                    const data = cadre_list.map( (cadre)   => ({country: cadre.querySelector("img") ? cadre.querySelector("img").getAttribute("alt") : "Pays pas fourni",name: cadre.querySelector(".birthday--artist").innerText,song: cadre.querySelector(".birthday--number1").innerText}))
                    return data;
                })
                await page.goBack();
                obj[day.toString() + month] = names; 
               // console.log(JSON.stringify(obj));
                await fs.writeFileSync(filePath, JSON.stringify(obj, null, 4));


                
            }
        }
        
    }

        await console.log(`${year} vient d'être finie.`)
    }
    await browser.close();
    }catch(e){main()}
}


main();