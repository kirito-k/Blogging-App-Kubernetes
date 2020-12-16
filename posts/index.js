const app = require("express")();
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post("/posts/create", async (req, res) => {
    console.log("Request for POST /posts/create");

    const randomID = randomBytes(4).toString("hex");

    const { title } = req.body;
    posts[randomID] = { id: randomID, title };

    await axios.post("http://event-bus-cip-srv:4005/events", {
        type: "Post Created",
        data: { id: randomID, title },
    });

    console.log(posts);

    res.status(201).send(posts[randomID]);
});

app.post("/events", (req, res) => {
    console.log(`Event received: ${req.body.type}`);

    res.status(201).send({});
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Posts server running on port ${port}`);
});
