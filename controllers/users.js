/* eslint-disable import/extensions */
import User from '../models/user.js';

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `На сервере произошла ошибка: ${err}` }));
};

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (Object.keys(req.body).length === 0) {
        res.status(404).send({ message: 'Карточка или пользователь не найден' });
        return;
      }
      res.status(400).send({ message: `Переданы некорректные данные в метод создания пользователя: ${err}` });
    });
};

export const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Карточка или пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(400).send({ message: `Переданы некорректные данные id: ${err}` }));
};

export const editProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Переданы некорректные данные в метод редактирования пользователя: ${err}` }));
};

export const editAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Переданы некорректные данные в метод редактирования ссылки на аватар: ${err}` }));
};
