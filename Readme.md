<div align="center">
  <br />
  <p>
    <img src="https://i.ibb.co/pZQRpcK/bmsn.png" width="546" alt="bot" />
  </p>
</div>

### Version 0.0.2
_______

### About

[Book My Show](https://in.bookmyshow.com/) Notifier alerts you whenever your preffered venue or preferred venue date is available, by launching music / video in your default browser.
___

### Setup

#### Prerequisites

* [Node.js 16](https://nodejs.org/en/download) *or newer*
* Any Browser *with autoplay enabled*

#### Installation

* Windows
  + Install Node.js
  + [Download](https://github.com/sparker-99/book-my-show-notifier/archive/refs/heads/main.zip) the bot files
  + Extract **book-my-show-notifier-main.zip**
  + Edit `config.json` (fill the config file with your details)
  + Open console inside the **bms'** directory, type `npm i` and hit enter
  + Hit `npm start` in command prompt

* Linux (Ubuntu 20:04)
  + Open Terminal and type:
  + `sudo apt install nodejs npm`
  + `mkdir bms_notifier`
  + `cd bms_notifier`
  + `git clone https://github.com/sparker-99/book-my-show-notifier.git`
  + `cd bms_notifier`
  + `npm i`
  + `nano config.json` (fill the config file with your details)
  + `npm start`

**Note: You must keep your device open and running**
___

### Configuration

* `date` &mdash; Add your show date
* `update_interval` &mdash; Set the update interval in seconds (keeping it more than 300 saves some data but decreases the chance of getting seats after the
   release)
* `bms_link` &mdash; Select the movie name in book my show website, then book tickets then select language and format and copy the
   link.
   Example link: https://in.bookmyshow.com/buytickets/spider-man-no-way-home-mumbai/movie-mumbai-ET00319539-MT/20211223 or https://in.bookmyshow.com/mumbai/movies/spider-man-no-way-home/ET00319540
 
* `youtube_alarm` &mdash; select the song/video on youtube or wherever you want on your default browser just make sure browser autoplay is enabled otherwise you
    won't get notified.
* `theatres` &mdash; if u want the movie in some specific theatres (1 or more) make sure u give the bms link of your movie date only otherwise it will be disabled.
   Theatre name/s must match exactly similar to book my show website, aka case sensitive, otherwise it won't work. Example: 
    ```js
    ["Carnival: IMAX Screen, Wadala", "Cinepolis: Viviana Mall, Thane"]
    ```