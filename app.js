import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, 'public')));
app.listen(PORT, () => { // eslint-disable-next-line no-console
  console.log(`Server has been started on port ${PORT}...`);
});
