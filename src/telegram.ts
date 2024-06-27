import type TelegramBot from "node-telegram-bot-api";
import fs from "fs"
import type { Redis } from "@upstash/redis";
import type OpenAI from "openai";
import { RedisMethods } from "./redis";
import { Claude, MessageCreateParamsBase } from "./claude";
import axios from "axios";

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

  if (!messages) {
    const initialGeneration = [
      {
        role: "user",
        content: `You are a helpful assistant for my school thesis`,
      }
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


function greetings(str: string, arr: string[]) {
  return arr.some(item => str.includes(item));
}