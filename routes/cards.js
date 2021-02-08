import express from 'express';

import { getCards, postCard, deleteCard } from '../controllers/cards.js';

export const cards = express.Router();

cards.get('/cards', getCards);
cards.post('/cards', postCard);
cards.delete('/cards/:id', deleteCard);

export default cards;
