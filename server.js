const express = require('express');
const app = express();
const port = 5200;

app.use(express.json());

var pages = {
    main: "/",
    submit_ssid: "/ssid",
    detected_object: "/obj",
    live_image: "/limg"
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
    res.send({code: 1, message: "success"});
})

app.listen(port, () => {
  console.log(`Server Started\n------------------\nhttp://locahost:${port}`);
})