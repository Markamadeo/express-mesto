import express from 'express';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
export const users = express.Router();

users.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'К сожалению данные отсутствуют' });
      return;
    }
    res.send(data);
  });
});

users.get('/users/:id', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    const user = JSON.parse(data).filter((userELem) => userELem._id === req.params.id);

    if (user.length > 0) {
      res.status(200).send(user[0]);
    } else {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  });
});

export default users;
