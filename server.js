const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const fs = require('fs');
const path = require('path');

const moment = require('moment');

//cors origin issue
app.use(cors({ origin: "*" }));

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).end("Welcome")
})

app.post("/createfolder", (req, res) => {

    const foldername = req.body.name
    // const dateTimeFormat = 'YYYY-MM-DD_HH-mm-ss';  

    try {
        fs.mkdir(`${__dirname}/${foldername}`, (err) => {            
            if (err) { throw err };            
            res.status(200).send(`${foldername}   ---new folder created`)            
        })
    }
    catch (err) { res.status(500).send(err) }

})

app.post("/createfile/:foldername", (req,res) => {   
   
    const foldername = req.params.foldername
    
    try {
        const content = new Date().toTimeString();
        const fileName = `${moment().format('YYYY-MM-DD_HH-mm-ss')}.txt`;
        console.log("line66", fileName)

        fs.writeFile(`${__dirname}/${foldername}/${fileName}`, content, (err) => {
            console.log("line 37", "dirname:", __dirname, "foldername:", foldername, "fileName:", fileName)
        if (err) { throw err };
            res.status(200).send(`${fileName}   ---new file created`)
        })
    } catch (err) { res.status(500).send(err) }
})

app.get("/readfile/:name", (req, res) => {

    const foldername = req.params.name;
    
    const folderPath = path.join(__dirname+`/${foldername}`)

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err)
        }
        console.log(files)
        res.status(200).send(files)
    })
})

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})
