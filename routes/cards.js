import express from 'express';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
export const cards = express.Router();

cards.get('/cards', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'cards.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'К сожалению данные отсутствуют' });
    }
    res.send(data);
  });
});

export default cards;
