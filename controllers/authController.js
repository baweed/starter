/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export const signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Проверяем, переданы ли email и пароль
  if (!email || !password) {
    return next(new AppError('Пожалуйста, укажите email и пароль!', 400));
  }

  // 2) Ищем пользователя в базе (с паролем, т.к. по умолчанию он скрыт)
  const user = await User.findOne({ email }).select('+password');

  const isCorrect = await user.correctPassword(password, user.password);

  if (!user || !isCorrect) {
    return next(new AppError('Неверный email или пароль', 401));
  }

  // 4) Генерируем JWT-токен (убедитесь, что `signToken` реализован!)
  const token = signToken(user._id);

  // 5) Отправляем токен клиенту
  res.status(200).json({
    status: 'success',
    token,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check of it's there
  let token;
  console.log(req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  if (!token) {
    return next(new AppError('You are not! logged in', 401));
  }

  //2) Verification token
  //3) Check if user still exists
  //4) Check if user changed password after the token was issued

  next();
});
