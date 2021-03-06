const app = require("express")();
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

const commentsByPostID = {};

app.post("/posts/:id/comments", async (req, res) => {
    console.log(`POST /posts/${req.params.id}/comments`);

    const postID = req.params.id;
    const { content } = req.body;
    const commentID = randomBytes(4).toString("hex");

    const comments = commentsByPostID[postID] || [];
    comments.push({ id: commentID, content });

    commentsByPostID[postID] = comments;

    await axios.post("http://event-bus-cip-srv:4005/events", {
        type: "Comment Created",
        data: { postID, id: commentID, content }
    });

    console.log(commentsByPostID);

    res.status(201).send(comments);
});

app.post("/events", (req, res) => {
    console.log(`Event received: ${req.body.type}`);

    res.send({});
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Comments server running on port ${port}`));
