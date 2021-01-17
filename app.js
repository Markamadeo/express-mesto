/* eslint-disable import/extensions */
import express from 'express';
import path from 'path';
import { cards } from './routes/cards.js';
import { pageNotFound } from './routes/pageNotFound.js';
import { users } from './routes/users.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use('/', users);
app.use('/', cards);
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('*', pageNotFound);

app.listen(PORT, () => { // eslint-disable-next-line no-console
  console.log(`Server has been started on port ${PORT}...`);
});
