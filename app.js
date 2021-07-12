"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const { fruit } = require('./models');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// bearer token validation function
const isValidToken = (req) => {
    let token = req.headers.authorization;
    if (token.startsWith('Bearer ')) {
        token = token.split(" ");
        if (token[1] === "jibontabedona") {
            return true;
        }
        else {
            return false;
        }
    }
};
//add fruit data
app.post('/addFruit', (req, res) => {
    if (isValidToken(req)) {
        fruit.findOne({ where: { fruitName: req.body.fruitName } })
            .then((result) => {
            if (result === null) {
                fruit.create({
                    fruitName: req.body.fruitName,
                    fruitImageURL: req.body.fruitImageURL,
                    fruitVitamin: req.body.fruitVitamin,
                    fruitAvailability: req.body.fruitAvailability
                }).then((result) => {
                    if (result) {
                        res.send(result);
                    }
                    else {
                        res.status(400).send('Error in insert new record');
                    }
                });
            }
            else {
                res.send(req.body.fruitName + " is already exist.");
            }
        });
    }
    else {
        res.status(403).send("Unathorized Access");
    }
});
//get all fruits
app.get('/getAllFruits', (req, res) => {
    if (isValidToken(req)) {
        fruit.findAll()
            .then((result) => {
            res.send(result);
        });
    }
    else {
        res.status(403).send("Unathorized Access");
    }
});
//get single fruits
app.get('/getSingleFruit/:id', (req, res) => {
    if (isValidToken(req)) {
        fruit.findOne({ where: req.params })
            .then((result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.send("Not Found!!");
            }
        });
    }
    else {
        res.status(403).send("Unathorized Access");
    }
});
//get single fruit by query example: http://localhost:5000/getSingleFruit?fruitName=apple
app.get('/getSingleFruit', (req, res) => {
    console.log(req.query);
    if (isValidToken(req)) {
        fruit.findOne({ where: req.query })
            .then((result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.send("Not Found!!");
            }
        });
    }
    else {
        res.status(403).send("Unathorized Access");
    }
});
//get Single fruit by fruit name
app.get('/getSingleFruitByName/:fruitName', (req, res) => {
    console.log(req.params);
    if (isValidToken(req)) {
        fruit.findOne({ where: req.params })
            .then((result) => {
            if (result) {
                res.send(result);
            }
            else {
                res.send("Not Found!!");
            }
        });
    }
    else {
        res.status(403).send("Unathorized Access");
    }
});
//delete specific fruit by id
app.delete('/deleteSingleFruit/:id', (req, res) => {
    if (isValidToken(req)) {
        fruit.destroy({ where: req.params })
            .then((data) => {
            if (data > 0) {
                res.send("deleted successfull");
            }
            else {
                res.send("delete operation failed");
            }
        });
    }
    else {
        res.status(403).send("Unathorized Access");
    }
});
//udpate single fruit data
app.patch('/updateSingleFruit/:id', (req, res) => {
    if (isValidToken(req)) {
        fruit.update(req.body, { where: { id: req.params.id } })
            .then((result) => {
            if (result[0] > 0) {
                res.send("Update successfull");
            }
            else {
                res.send("Update failed");
            }
        });
    }
    else {
        res.status(403).send("Unathorized Access");
    }
});
db.sequelize.sync().then((req) => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Listening From Server");
    });
});
