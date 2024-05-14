const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 8001;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const {Pool,Client}= require('pg')


app.use(bodyParser.urlencoded({ extended: true }));

const connectionString='postgressql://postgres:1234@localhost:5432/cvyaz'

    const client= new Client({
        connectionString:connectionString
    })
app.post('/submit', (req, res) => {
    const { firstname, lastname, email, phone, note } = req.body;
    // Respond to the client
    client.connect();
    client.query('INSERT INTO cvyaz (name,surname,email,phone,note) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, phone, note], (err, res) => {
    console.log(err, res);
    client.end();
});
    res.send('Received your data!');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });
  
