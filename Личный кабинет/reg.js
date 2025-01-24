const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('Подключено к MongoDB'))
    .catch((err) => console.error('Ошибка подключения к MongoDB:', err));


const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    username: String,
    email: String,
    password: String,
    profilePic: String,
    informaticsProgress: {
        type: Map,
        of: Number,
        default: {}
    }
});

const topicSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
    content: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Topic = mongoose.model('Topic', topicSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Настройка хранилища для загрузки изображений
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Уникальное имя для файла
    }
});
const upload = multer({ storage });



const { v4: uuidv4 } = require('uuid');

// Функция для регистрации пользователя
async function registerUser(req, res) {
    try {
        const userId = uuidv4(); // Генерируем уникальный ID
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            userId,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profilePic: 'uploads/default-profile.jpg'  // Устанавливаем дефолтное фото
        });

        await user.save();
        res.status(201).json({ message: "Пользователь успешно зарегистрирован", userId });
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}



// Middleware для проверки токена
function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Нет доступа' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Неверный токен' });
    }
}


// Ограничение на создание новой темы (1 тема каждые 2 минуты)
const createTopicLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,  // 2 минуты
    max: 1,
    message: 'Вы можете создавать тему только раз в 2 минуты'
});

// Ограничение на отправку комментариев (1 комментарий каждые 10 секунд)
const createCommentLimiter = rateLimit({
    windowMs: 10 * 1000,  // 10 секунд
    max: 1,
    message: 'Вы можете отправлять комментарий только раз в 10 секунд'
});


app.get('/user/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        console.log("Данные пользователя:", user); // Отладка
        res.json({
            username: user.username,
            email: user.email,
            userId: user.userId, // убедитесь, что передаем ID пользователя
            progress: user.informaticsProgress
        });
    } catch (error) {
        console.error("Ошибка при получении профиля:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});



// Маршрут для регистрации
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePic: 'uploads/default-profile.jpg'  // Устанавливаем дефолтное фото
        });

        await newUser.save();
        res.status(200).json({ message: 'Регистрация прошла успешно' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для входа
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Успешный вход', token });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для получения данных пользователя
app.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        res.status(200).json({
            username: user.username,
            profilePic: user.profilePic || 'uploads/default-profile.jpg'  // Дефолтное изображение профиля
        });
    } catch (error) {
        console.error('Ошибка при получении профиля:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});


// Маршрут для обновления данных пользователя
app.post('/user/update', upload.single('profilePic'), authMiddleware, async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findById(req.userId);

        if (username) user.username = username;
        if (req.file) user.profilePic = `/uploads/${req.file.filename}`;

        await user.save();
        res.status(200).json({ username: user.username, profilePic: user.profilePic });
    } catch (error) {
        console.error("Ошибка при обновлении профиля:", error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});


// Маршрут для создания новой темы с ограничением (1 тема каждые 2 минуты)
app.post('/topics', authMiddleware, createTopicLimiter, async (req, res) => {
    try {
        const { title, description } = req.body;
        const topic = new Topic({ title, description, createdBy: req.userId });
        await topic.save();
        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для получения всех тем с сортировкой по дате (новые темы сверху)
app.get('/topics', async (req, res) => {
    try {
        const topics = await Topic.find().sort({ createdAt: -1 }).populate('createdBy', 'username profilePic').exec();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Поиск тем по названию
app.get('/topics/search', async (req, res) => {
    try {
        const { query } = req.query;
        const topics = await Topic.find({ title: { $regex: query, $options: 'i' } })
            .populate('createdBy', 'username profilePic').exec();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для получения комментариев к теме
app.get('/topics/:topicId', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.topicId).populate('createdBy', 'username profilePic').exec();
        const comments = await Comment.find({ topic: req.params.topicId }).populate('createdBy', 'username profilePic').exec();
        res.status(200).json({ topic, comments });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для создания комментария к теме с ограничением (1 комментарий каждые 10 секунд)
app.post('/topics/:topicId/comments', authMiddleware, createCommentLimiter, async (req, res) => {
    try {
        const { content } = req.body;
        const comment = new Comment({ content, createdBy: req.userId, topic: req.params.topicId });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для удаления темы с проверкой авторства
app.delete('/topics/:topicId', authMiddleware, async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.topicId);
        if (!topic) return res.status(404).json({ message: 'Тема не найдена' });

        // Проверка авторства
        if (topic.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: 'Вы не можете удалить эту тему' });
        }

        await Topic.deleteOne({ _id: req.params.topicId });  // Удаляем тему
        res.status(200).json({ message: 'Тема удалена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для удаления комментария с проверкой авторства
app.delete('/comments/:commentId', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Комментарий не найден' });

        // Проверка авторства
        if (comment.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: 'Вы не можете удалить этот комментарий' });
        }

        await Comment.deleteOne({ _id: req.params.commentId });  // Удаляем комментарий
        res.status(200).json({ message: 'Комментарий удалён' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});






















app.get('/user/progress/informatics', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            console.error("Пользователь не найден");
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const progressData = {};

        // Преобразуем Map в объект для корректной отправки JSON
        user.informaticsProgress.forEach((value, key) => {
            progressData[key] = value;
        });

        console.log("Отправка прогресса пользователя с сервера:", progressData); // Отладочный вывод

        res.json(progressData);
    } catch (error) {
        console.error("Ошибка при получении прогресса по информатике:", error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});




// Обновление прогресса для задания 1
app.post('/user/progress/informatics/1', authMiddleware, async (req, res) => {
    updateProgress(req, res, '1');
});

// Обновление прогресса для задания 2
app.post('/user/progress/informatics/2', authMiddleware, async (req, res) => {
    updateProgress(req, res, '2');
});

// Обновление прогресса для задания 3
app.post('/user/progress/informatics/3', authMiddleware, async (req, res) => {
    updateProgress(req, res, '3');
});

// Обновление прогресса для задания 4
app.post('/user/progress/informatics/4', authMiddleware, async (req, res) => {
    updateProgress(req, res, '4');
});

// Обновление прогресса для задания 5
app.post('/user/progress/informatics/5', authMiddleware, async (req, res) => {
    updateProgress(req, res, '5');
});

// Обновление прогресса для задания 6
app.post('/user/progress/informatics/6', authMiddleware, async (req, res) => {
    updateProgress(req, res, '6');
});

// Обновление прогресса для задания 7
app.post('/user/progress/informatics/7', authMiddleware, async (req, res) => {
    updateProgress(req, res, '7');
});

app.post('/user/progress/informatics/8', authMiddleware, async (req, res) => {
    updateProgress(req, res, '8');
});

// Обновление прогресса для задания 9
app.post('/user/progress/informatics/9', authMiddleware, async (req, res) => {
    updateProgress(req, res, '9');
});

app.post('/user/progress/informatics/graphs', authMiddleware, async (req, res) => {
    updateProgress(req, res, 'graphs');
});

// Обновление прогресса для задания 9
app.post('/user/progress/informatics/10', authMiddleware, async (req, res) => {
    updateProgress(req, res, '10');
});

app.post('/user/progress/informatics/11', authMiddleware, async (req, res) => {
    updateProgress(req, res, '11');
});

app.post('/user/progress/informatics/12', authMiddleware, async (req, res) => {
    updateProgress(req, res, '12');
});

// Обновление прогресса для задания 15.1
app.post('/user/progress/informatics/15_1', authMiddleware, async (req, res) => {
    updateProgress(req, res, '15_1');
});

// Функция для обновления прогресса
async function updateProgress(req, res, taskId) {
    const { increment } = req.body;
    try {
        const user = await User.findById(req.userId);

        if (!user.informaticsProgress) {
            user.informaticsProgress = new Map();
        }

        const currentProgress = user.informaticsProgress.get(taskId) || 0;
        console.log(`Текущий прогресс для задания ${taskId}: ${currentProgress}`);

        user.informaticsProgress.set(taskId, currentProgress + increment);

        await user.save();
        console.log(`Обновленный прогресс для задания ${taskId}: ${user.informaticsProgress.get(taskId)}`);
        
        res.json({ message: `Прогресс для задания ${taskId} обновлен` });
    } catch (error) {
        console.error(`Ошибка при обновлении прогресса для задания ${taskId}:`, error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}



app.post('/user/progress/informatics', authMiddleware, async (req, res) => {
    const { taskId, increment } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user.informaticsProgress) user.informaticsProgress = new Map();
        if (!user.informaticsProgress) {
            user.informaticsProgress = {}; // Используем объект вместо Map
        }
        user.informaticsProgress.set(taskId, (user.informaticsProgress.get(taskId) || 0) + increment);

        await user.save();
        res.json({ message: 'Прогресс обновлен' });
    } catch (error) {
        console.error("Ошибка при обновлении прогресса:", error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});
































// Маршрут для доступа к личному кабинету (dashboard)
app.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // замените на нужный порт, если отличается
    credentials: true
}));


// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
