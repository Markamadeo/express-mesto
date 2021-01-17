import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => { // eslint-disable-next-line no-console
  console.log(`Server has been started on port ${PORT}...`);
});
