const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    if (type === "Post Created") {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
        console.log(posts);
    }

    if (type === "Comment Created") {
        const { id, content, postID } = data;

        posts[postID].comments.push({ id, content });
        console.log(posts);
    }

    res.send({});
});

const port = process.env.PORT || 4002;
app.listen(port, () => console.log(`Query server listening on ${port}`));
