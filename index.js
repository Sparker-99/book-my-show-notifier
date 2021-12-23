const fs = require('fs');
const open = require('open');
const fetch = require('node-fetch');
const htmlparser = require('node-html-parser');

if (!fs.existsSync("./config.json")) {
    console.log("config.json not found\nExiting....");
    process.exit();
}

let config = require("./config.json");

if (config.date < new Date().getDate()) {
    console.log("\x1b[31mSorry to break this to you but we cant go back in time\nYour ship has already sailed. :(\x1b[0m");
    process.exit();
}

if (config.update_interval < 60) {
    console.log("\x1b[33mUpdate time is too short, it may lead to blacklist your ip from book my show we are changing it to 1 min\n\x1b[0m");
    config.update_interval = 60;
}

if (config.bms_link.slice(-2) != config.date && config.theatres != 0) {
    console.log("\x1b[33mSince movie link doesnt matches the movie search date, we are disabling the search by theatre name\n\x1b[0m")
    config.theatres = [];
}

fs.writeFile("./config.json", JSON.stringify(config, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
});

let ecnt = 0;

console.log("\033[36m▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n|\x1b[0m             \033[1mBOOK MY SHOW NOTIFIER  v" + require('./package.json').version + "\x1b[0m           \033[36m|\x1b[0m");
console.log("\033[36m▬▬▬▬▬▬▬▬▬▬▬▬:Started looking for shows on " + config.date + ":" + (config.date.toString().length === 2 ? '' : '▬') + "▬▬▬▬▬▬▬▬▬▬\x1b[0m");

if (/^\d+$/.test(config.bms_link.split('/').pop())) var aft = setInterval(postbk, config.update_interval * 1000);
else var bfr = setInterval(prebk, config.update_interval * 1000);

async function postbk() {

    let headers = {
        "Host": "in.bookmyshow.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
        "Accept": "*/*",
        "Accept-Language": "en-US"
    }

    let response = await fetch(config.bms_link, { method: 'GET', headers: headers })
        .catch(() => { });

    if (!response) {
        console.log("\x1b[31mCould not connect to Book my show [Retrying: " + ecnt + "/10 ]\x1b[0m");
        if (ecnt === 10) return clearInterval(aft);
        else return ecnt++;
    }

    let root = htmlparser.parse(await response.text());

    let avidates = root.querySelectorAll('ul.dates-container li').map(el => el.querySelector('a > div').innerHTML.trim());

    let avtheatres = root.querySelectorAll('ul[id="venuelist"] li').map(el => el.querySelector('div > div > div > div > a > strong').innerHTML.trim());

    if (avidates.length === 0 || avtheatres.length === 0) {
        console.log("\nEither the website is changed or your link is wrong");
        return clearInterval(aft);
    }

    if (avidates.includes(config.date)) {
        if (config.theatres.length == 0) {
            console.log("\x1b[32m\n[State 2] We have found your movie on " + config.date + " !\x1b[0m");
            await open(config.youtube_alarm);
            return clearInterval(aft);

        } else if (config.theatres.some(item => avtheatres.includes(item))) {
            console.log("\x1b[32m\n[State 3] We have found your movie on " + config.theatres.filter(item => avtheatres.includes(item)).length + " theatres !\x1b[0m");
            await open(config.youtube_alarm);
            return clearInterval(aft);

        }
    }
}

async function prebk() {

    let headers = {
        "Host": "in.bookmyshow.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
        "Accept": "*/*",
        "Accept-Language": "en-US"
    }

    let response = await fetch(config.bms_link, { method: 'GET', headers: headers })
        .catch(() => { });

    if (!response) {
        console.log("\x1b[31mCould not connect to Book my show [Retrying: " + ecnt + "/10 ]\x1b[0m");
        if (ecnt === 10) return clearInterval(bfr);
        else return ecnt++;
    }

    let root = htmlparser.parse(await response.text());

    let stt = root.querySelector('div[class="styles__CtaWrapper-sc-qswwm9-8 JInhj"]')?.innerHTML;

    if (typeof stt == 'undefined') {
        console.log("\nEither the website is changed or your link is wrong");
        return clearInterval(bfr);
    }

    if (stt.length !== 0) {
        console.log("\x1b[32m\n[State 1] Bookings open for your movie, go grab those seats\x1b[0m");
        await open(config.youtube_alarm);
        return clearInterval(bfr);
    }
}