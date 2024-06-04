import type TelegramBot from "node-telegram-bot-api";
import fs from "fs"
import type { Redis } from "@upstash/redis";
import type OpenAI from "openai";
import { RedisMethods } from "./redis";
import { Claude, MessageCreateParamsBase } from "./claude";

export async function handleTelegramMessage(
  openai: OpenAI,
  redis: Redis,
  telegram: TelegramBot,
  msg: TelegramBot.Message,
  redisMethods: RedisMethods,
  claude: Claude
) {
  if (!msg.text) return;
  console.log("Got a message")
  const { id } = msg.chat;

  const { get, set } = await redisMethods(redis);

  const messages = await get(id);


  const filePath = 'src/pepe.txt'

  const documentContent = await readFileContent(filePath)

  if (!messages) {
    const initialGeneration = [
      {
        role: "user", content: `respond to subsequent questions like pepe the frog meme, use popular web3, pepe meme community lingo and mannerism, always add emojis`,
      },
    ] satisfies MessageCreateParamsBase;
    const generation = await claude(initialGeneration)

    telegram.sendMessage(id, generation.message);
    set(id, [
      ...initialGeneration,
      { role: "assistant", content: generation.message },
    ]);
    return;
  }

  messages.push({ role: "user", content: msg.text });
  const generation = await claude(messages);

  telegram.sendMessage(id, generation.message);

  messages.push({ role: "assistant", content: generation.message });
  set(id, messages);
}


function readFileContent(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}