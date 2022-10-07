const express = require('express');
const mysql = require('mysql');

const app = express();

require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Connect database
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "nodejs_api"
});

//routes

// thêm đồ uống
app.post('/api/drinks/', (req, res) => {
    db.query('INSERT INTO drinks SET ?', [req.body], (err, response) => {
        if (err) throw err
        res.json({ message: 'Insert success!' })
    })
})

// sửa đồ uống
app.put('/api/drinks/:id', (req, res) => {
    db.query('UPDATE drinks SET ? WHERE id = ?', [req.body, req.params.id], (err, response) => {
        if (err) throw err
        res.json({ message: 'Update success!' })
    })
})

// xóa đồ uống
app.delete('/api/drinks/:id', (req, res) => {
    db.query('DELETE FROM drinks WHERE id = ?', [req.params.id], (err, response) => {
        if (err) throw err
        res.json({ message: 'Delete success!' })
    })
})

// get list đồ uống
app.get('/api/drinks/', (req, res) => {
    db.query('SELECT * FROM drinks', (err, response) => {
        if (err) throw err
        res.json(response)
    })
})

// get detail đồ uống
app.get('/api/drinks/:id', (req, res) => {
    db.query('SELECT * FROM drinks WHERE id = ?', [req.params.id], (err, response) => {
        if (err) throw err
        res.json(response[0])
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})