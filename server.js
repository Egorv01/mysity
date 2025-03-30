const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Для проверки reCAPTCHA

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { email, password, 'g-recaptcha-response': recaptchaResponse } = req.body;

    // Проверка reCAPTCHA
    const secretKey = 'ВАШ_SECRET_KEY'; // Замените на ваш секретный ключ reCAPTCHA
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
        return res.status(400).send('Ошибка: не пройдена проверка reCAPTCHA.');
    }

    console.log(`Регистрация успешна для пользователя ${email}`);
    res.send('Регистрация успешно завершена!');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});
