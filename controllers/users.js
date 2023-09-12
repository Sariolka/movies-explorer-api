require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ValidationError = require("../errors/error-validation");
const NotFoundError = require("../errors/error-not-found");
const ConflictError = require("../errors/error-conflict");
const UnauthorizedError = require("../errors/error-unauthorized");

const { OK, CREATED } = require("../errors/errors");

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(CREATED).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Данные некорректны"));
      }
      if (err.code === 11000) {
        next(new ConflictError("Пользователь с таким e-mail уже существует"));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Пользователь не найден");
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.status(OK).send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError("Необходима авторизация");
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.status(OK).send({ email: user.email, name: user.name });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(OK).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(ValidationError("Данные некорректны"));
      } else if (err.message === "Not Found") {
        next(NotFoundError("Пользователь не найден"));
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
};
