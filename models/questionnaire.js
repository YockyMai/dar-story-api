const { Schema, model } = require('mongoose');

const questionnaireSchema = new Schema({
	fullname: {
		type: String,
		// required: true,
	},
	number: {
		type: Number,
		// required: true,
	},
	email: {
		type: String,
		// required: true,
	},
});

const questionnaire = model('questionnaire', questionnaireSchema);

module.exports = questionnaire;
