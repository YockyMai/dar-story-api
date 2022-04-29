const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('./middleware/cors.middleware');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const questionnaire = require('./models/questionnaire');
var validator = require('validator');

const app = express();

app.use(corsMiddleware);
app.use(express.json()); //Сервер парсит в JSON формат

app.post('/create', async (req, res) => {
	try {
		const { fullname, number, email } = req.body;

		if (
			validator.isEmail(email) ||
			validator.isMobilePhone(number, 'ru-RU')
		) {
			const userQuestionnaire = new questionnaire({
				fullname,
				number,
				email,
			});
			await userQuestionnaire.save();

			return res.json({
				message: 'Ваша заявка принята, скоро мы вам презвоним',
			});
		}
		return res.json({
			message: 'Ваш email или номер телефона имеет не правильный формат',
			code: '0',
		});
	} catch (e) {
		console.log(e);
	}
});

app.get('/get', async (req, res) => {
	const currentQuestionnaire = await questionnaire.find({});

	return res.json({
		currentQuestionnaire,
	});
});

const start = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://ValeriyGrigorev:Dfkthf15102003@cluster0.1tyia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		);
		app.listen(PORT, () => {
			console.log(`Server runned on ${PORT} port`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
