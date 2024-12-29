const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

app.post('/api/question', (req, res) => {
  const { question } = req.body;
  // Execute the Python script
  const pythonProcess = spawn('python', ['logic.py', question]);

  pythonProcess.stdout.on('data', (data) => {
    try {
      const message = data.toString().trim();
      console.log(`stdout: ${message}`);
      res.json({ message });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send({ message: 'Error parsing JSON from Python script' });
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send({ message: 'Error executing Python script' });
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.post('/api/add_question_answer', (req, res) => {
  const { question, answer } = req.body;
  // Execute the Python script to add the question and answer
  const pythonProcess = spawn('python', ['add_question_answer.py', question, answer]);

  pythonProcess.stdout.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`stdout: ${message}`);
    res.json({ message });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send({ message: 'Error executing Python script' });
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

// All other routes should serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
