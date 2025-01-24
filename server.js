const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/forum', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Модель пользователя
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Модель тем
const TopicSchema = new mongoose.Schema({
    title: String,
    createdBy: String,
});

const Topic = mongoose.model('Topic', TopicSchema);

// Регистрация пользователей
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ message: 'Регистрация успешна!' });
});

// Вход пользователей
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'Неверное имя пользователя' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.json({ token });
});

// Создание тем
app.post('/create-topic', async (req, res) => {
    const { title, token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'Пожалуйста, войдите для создания темы' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        const topic = new Topic({ title, createdBy: decoded.userId });
        await topic.save();

        res.json({ message: 'Тема создана!' });
    } catch (err) {
        res.status(400).json({ message: 'Неверный токен' });
    }
});

// Получение списка тем
app.get('/topics', async (req, res) => {
    const topics = await Topic.find();
    res.json(topics);
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер работает на порту 3000');
});
