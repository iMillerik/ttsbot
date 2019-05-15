const Bot = require('node-telegram-bot-api');
const fs = require('fs');
const cmd = require('child_process').exec;

const token = fs.readFileSync('token').toString().replace(/[\n\t]/i, '');

if(!token) {
	console.log('SET BOT TOKEN IN token FILE!');
	process.exit();
}

const bot = new Bot(token, {
	polling: true
});

/* === === === === === */
/* Handle /start command
/* === === === === === */

bot.onText(/^\/start$/, (sender) => {
	
	let id = sender.from.id;

	bot.sendMessage(id, `
		Hello! I am TTS Bot. 😊

		Just send any text message and I'll record a voice message by it just for you.

		Author: @iMillerik / <a href="https://github.com/imillerik/ttsbot">Source Code</a>
	`.replace(/[\t]*/g, ''), {
		parse_mode: 'html'
	});

});

/* === === === === === */
/* Handle text messages
/* === === === === === */

bot.onText(/[^\/start]/i, (sender) => {
	
	let id = sender.from.id;
	let text = sender.text
		.replace(/а/gi, 'a')
		.replace(/б/gi, 'b')
		.replace(/в/gi, 'v')
		.replace(/г/gi, 'g')
		.replace(/д/gi, 'd')
		.replace(/е/gi, 'e')
		.replace(/ё/gi, 'yo')
		.replace(/ж/gi, 'zh')
		.replace(/з/gi, 'z')
		.replace(/и/gi, 'i')
		.replace(/й/gi, 'iy')
		.replace(/к/gi, 'k')
		.replace(/л/gi, 'l')
		.replace(/м/gi, 'm')
		.replace(/н/gi, 'n')
		.replace(/о/gi, 'o')
		.replace(/п/gi, 'p')
		.replace(/р/gi, 'r')
		.replace(/с/gi, 's')
		.replace(/т/gi, 't')
		.replace(/у/gi, 'u')
		.replace(/ф/gi, 'f')
		.replace(/х/gi, 'h')
		.replace(/ц/gi, 'ts')
		.replace(/ч/gi, 'ch')
		.replace(/ш/gi, 'sh')
		.replace(/щ/gi, 'sch')
		.replace(/ъ/gi, 'y')
		.replace(/ы/gi, 'i')
		.replace(/ь/gi, 'y')
		.replace(/э/gi, 'e')
		.replace(/ю/gi, 'u')
		.replace(/я/gi, 'ya');

	/* === === === === === */
	/* Write text file
	/* === === === === === */

	let filePath = 'temp';
	let fileName = `${Date.now()}_${rand(0, 1000000)}`;
	let file = `${filePath}/${fileName}`;

	fs.writeFile(`${filePath}/${fileName}.txt`, text, (err) => {
		
		/* === === === === === */
		/* Error handing
		/* === === === === === */

		if(err) return sendErr(id, err);

		/* === === === === === */
		/* Convert to wav file
		/* === === === === === */

		cmd(`espeak -f ${file}.txt -w ${file}.wav`, (err) => {

			/* === === === === === */
			/* Error handling
			/* === === === === === */
			
			if(err) return sendErr(id, err);

			/* === === === === === */
			/* Convert to voice message file
			/* === === === === === */

			cmd(`opusenc ${file}.wav ${file}.ogg`, (err) => {

				/* === === === === === */
				/* Error handling
				/* === === === === === */
				
				if(err) return sendErr(id, err);

				/* === === === === === */
				/* Send result
				/* === === === === === */

				bot.sendVoice(id, `${file}.ogg`);

				/* === === === === === */
				/* Remove all temp files
				/* === === === === === */

				cmd(`rm ${file}*`);

			});

		});

	});

});

/* === === === === === */
/* Functions
/* === === === === === */

function rand(min, max) {
	return Math.floor(Math.random() * (max-min) + min);
}

function sendErr(id, err) {
	console.error(err);

	bot.sendMessage(id, `

		There is an error:

		<code>${err.message}</code>

	`.replace(/[\t]*/g, ''), {
		parse_mode: 'html'
	});
}