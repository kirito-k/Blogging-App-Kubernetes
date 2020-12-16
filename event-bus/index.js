const app = require("express")();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json());

app.post("/events", (req, res) => {
    console.log(`Event received: ${req.body.type}`);

    axios.post("http://query-cip-srv:4002/events", req.body);
    axios.post("http://comments-cip-srv:4001/events", req.body);
    axios.post("http://posts-cip-srv:4000/events", req.body);
    
    res.send({ status: "Ok" });
});

app.get("/events", (req, res) => {
    res.send(events);
});

const port = process.env.PORT || 4005;
app.listen(port, () => console.log(`Event bus running on port ${port}`));
