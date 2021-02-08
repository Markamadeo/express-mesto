import Card from '../models/card.js';

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

export const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link , owner})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
