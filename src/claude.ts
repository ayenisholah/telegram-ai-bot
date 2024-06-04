import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';

config()

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY as string;
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

export type MessageCreateParamsBase = Anthropic.Messages.MessageParam[];

export async function claude(messages: MessageCreateParamsBase) {

  try {
    const message = await anthropic.messages.stream({
      max_tokens: 1024,
      messages: messages,
      model: 'claude-3-opus-20240229',
      stream: true,
    })
    const response = await message.finalMessage();

    const text = (response.content[response.content.length - 1] as any).text
    return { message: text }

  } catch (error) {
    console.log("Generation Failed")
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "recieve a error from the ai" };
  }
}

export type Claude = typeof claude