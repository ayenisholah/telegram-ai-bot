# Telegram - Claude AI - Pepe the Frog Meme Bot

This is a Telegram bot that integrates with the Claude AI and generates Pepe the Frog memes.

## Features

- Interacts with users through Telegram messages
- Utilizes the Claude AI for generating responses
- Generates Pepe the Frog humor and mannerism
- Stores conversation history using Upstash Redis
- Uploads generated response to AWS S3

## Prerequisites

Before running the bot, make sure you have the following:

- Node.js installed (version 18.X.X or higher)
- Telegram Bot Token (obtained from BotFather)
- OpenAI API Key
- Upstash Redis URL and Token
- AWS S3 Bucket, Region, Access Key ID, and Secret Access Key
- Anthropic API Key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/telegram-ai-bot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd telegram-ai-bot
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and provide the necessary environment variables:

   ```plaintext
   TELEGRAM_BOT_TOKEN=""
   OPENAI_API_KEY=""
   UPSTASH_URL=""
   UPSTASH_TOKEN=""
   BUCKET=""
   REGION=""
   AWS_ACCESS_KEY_ID=""
   AWS_SECRET_ACCESS_KEY=""
   ANTHROPIC_API_KEY=""
   ```

   Make sure to replace the empty strings with your actual values.

## Usage

1. Start the bot in development mode:

   ```bash
   npm run dev
   ```

   This command uses nodemon to automatically restart the bot whenever changes are made to the source code.

2. To build the TypeScript code and generate the JavaScript output:

   ```bash
   npm run build
   ```

   The compiled JavaScript files will be placed in the `dist` directory.

3. To start the bot in production mode:

   ```bash
   npm start
   ```

   This command runs the compiled JavaScript code from the `dist` directory.

4. Interact with the bot on Telegram by sending messages to it. The bot will respond using the Claude AI and generate Pepe the Frog memes based on the user's input.

## Dependencies

The bot relies on the following dependencies:

- `@anthropic-ai/sdk`: SDK for interacting with the Anthropic AI (Claude)
- `@aws-sdk/client-s3`: AWS SDK for uploading files to S3
- `@upstash/redis`: Redis client for storing data using Upstash
- `dotenv`: Loads environment variables from a `.env` file
- `node-telegram-bot-api`: Telegram Bot API library for Node.js
- `openai`: OpenAI API library for generating responses
- `tiny-invariant`: Tiny invariant assertion library
- `whatsapp-web.js`: WhatsApp Web API library (not used in this bot)
- `zod`: TypeScript-first schema validation library

## Dev Dependencies

The following dev dependencies are used for development purposes:

- `@types/node`: TypeScript type definitions for Node.js
- `@types/node-telegram-bot-api`: TypeScript type definitions for `node-telegram-bot-api`
- `@types/qrcode-terminal`: TypeScript type definitions for `qrcode-terminal`
- `nodemon`: Automatically restarts the bot during development
- `qrcode-terminal`: Generates QR codes in the terminal (not used in this bot)
- `ts-node`: TypeScript execution and REPL for Node.js
- `typescript`: TypeScript language

## License

This project is licensed under the ISC License.

## Author

Shola Ayeni
ayenisholah@gmail.com
https://github.com/ayenisholah
