const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.text());

app.post("/summarize", (req, res) => {
    exec(`python ./smartsummary.py "${req.body}"`, (error, stdout, stderr) => {
        if (error) {
            console.error("Error executing Python script.");
            return res.status(500).json({ error: "Server Error"});
        }
        console.log(stdout);
        res.json({ summary: stdout});
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});