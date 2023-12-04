const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.text());

app.post("/summarize", (req, res) => {
    console.log(req.body);
    res.json({ summary: req.body});
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});