const express = require('express');
var fs = require('fs');
const app = express();

const port = 5200;
app.use(express.json());

var byte64_location = './data/byte64.json';
var notStatus = false;
var ipp = "";
var pages = {
    main: "/",
    submit_ssid: "/ssid",
    detected_object: "/obj",
    live_image: "/limg",
    setNotification: "/sn",
    getNotification: "/gn",
    raspi: 'raspi'
}

app.get(pages.main, (req, res) => {
    res.send("Page open");
//   res.send({code: 1, message: "success"});
})

app.post(pages.submit_ssid, (req, res) => {
    console.log(req.body);
    res.send({code: 1, message: "success"});
})

app.post(pages.detected_object, (req, res) => {
    console.log(req.body);
    res.send({code: 1, message: "success"});
})

app.post(pages.live_image, (req, res) => {
    console.log(req.body);

    var data = fs.readFileSync(byte64_location);
    let images = JSON.parse(data);
    images.push(req.body);
    data = JSON.stringify(images);
    fs.writeFileSync(byte64_location, data, 'utf-8');
    
    res.send(req.body);
})

app.get(pages.setNotification, (req, res) => {
    notStatus = true
    res.send("true");
})

app.get(pages.getNotification, (req, res) => {
    res.send(notStatus);
    notStatus = false;
})

app.post(pages.raspi, (req, res) => {
    try{
        ipp = req.query.ip;
        if(ipp == null){
            res.send({set: false});
        }
        res.send({set: true});
    }
    catch{
        res.send({set: false});
    }
})

app.get(pages.raspi, (req, res) => {
    res.send(ipp);
})

app.listen(port, () => {
  console.log(`Server Started\n------------------\nhttp://locahost:${port}`);
})