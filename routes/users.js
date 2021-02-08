import express from 'express';

import { getUsers, getUser, createUser } from '../controllers/users.js';

export const users = express.Router();

users.get('/users', getUsers);
users.post('/users', createUser);
users.get('/users/:id', getUser);

export default users;
