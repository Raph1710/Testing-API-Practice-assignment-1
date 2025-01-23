const express = require('express');
const { resolve } = require('path');
const data = require('./data.json');

const app = express();
const port = 3010;


app.use(express.json());
app.use(express.static('static'));



app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/students/above', (req, res) => {
    const { threshold } = req.body;


    if (typeof threshold !== 'number' || threshold < 0) {
        return res.status(400).json({ message: 'Invalid threshold value. Please provide a positive number.' });
    }


    const filteredStudents = data.filter(student => student.total > threshold);


    res.status(200).json({
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total,
        })),
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});