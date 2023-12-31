const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
    origin: [
        'https://smartsummary-aml.vercel.app/',
        'http://localhost:3000']
}))

app.use(bodyParser.text());

app.post('/summarize', (req, res) => {
    console.log('request came in with:', req.body);
    // Mental note that there are different kinds of quotation marks...
    // dont waste 2 hours trying to debug this ever again
    parsedText = req.body.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

    const pythonProcess = spawn('python3', ['./smartsummary.py', parsedText]);

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
        stdout += data;
    });

    pythonProcess.stderr.on('data', (data) => {
        stderr += data;
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Error executing Python script. Exit code: ${code}`);
            console.error('Python Error:', stderr);
            return res.status(500).json({ error: 'Server Error' });
        }

        console.log(stdout);
        res.json({ summary: stdout });
    });
});

app.get('/vercel-test', (req, res) => {
    res.send('Test for Vercel server deployment');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
