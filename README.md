# iMillerik's Telegram TTS Bot

[https://t.me/imillerik_tts_bot](https://t.me/imillerik_tts_bot)

This is simple Text-to-Speech bot on Telegram bot API. Just send them any text message and get a voice message by your text.

## Requieremnts

- Linux System;
- Installed packages for [_opus codec_](http://opus-codec.org) & [_espeak_](http://espeak.sourceforge.net);
- _nodemon_ installed for debuging

## How to install

**WARNING! The bot can run only Linux system**

1. Clone this repository on your local machine
```
git clone https://github.com/imillerik/ttsbot ttsbot
```

2. Enter the project directory on your shell & install dependencies:
```
cd ttsbot
npm install
```

3. Create a Telegram bot with [t.me/botfather](https://t.me/botfather) and get its token. Then run command below:
```
echo "YOUR_TOKEN" > token
```

## How to run

**In development mode**: `npm run debug`

**In production mode**: `npm start`