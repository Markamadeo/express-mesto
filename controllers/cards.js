/* eslint-disable import/extensions */
import Card from '../models/card.js';

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `На сервере произошла ошибка: ${err}` }));
};

export const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (Object.keys(req.body).length === 0) {
        res.status(404).send({ message: 'Карточка или пользователь не найден' });
        return;
      }
      res.status(400).send({ message: `Переданы некорректные данные в метод создания карточки: ${err}` });
    });
};

export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(404).send({ message: `Переданы некорректные данные в метод создания карточки или пользователя: ${err}` }));
};

export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `Переданы некорректные данные в метод создания карточки или пользователя: ${err}` }));
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `Переданы некорректные данные в метод создания карточки или пользователя: ${err}` }));
};
