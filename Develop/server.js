const express = require('express');
const path = require('path');
const { readAndAppend, readFromFile } = require('./helpers.js');

// const uniqueId = require('uuid');

// link express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// defining port location
const PORT = process.env.PORT || 3001;

app.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received, note added.`)

    // assigning req,body to variables to be called later
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            // note_id: uniqueId(),
        };

        // appends new note to db.json
        readAndAppend(newNote, './db/db.json');
        console.log('Note added successfully');
    } else {
        console.log(`Error: ${err}`)
    }
}
);

// get route for loading home page
app.get('/', (req, res) =>
    res.send('./public/index.html')
);

// get route for loading notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
)

app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);
