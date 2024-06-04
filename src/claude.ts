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
    const message = await anthropic.messages.create({
      max_tokens: 1024,
      messages: messages,
      model: 'claude-3-opus-20240229',
    });

    const response: string = (message.content[message.content.length - 1] as any).text
    console.log(response);
    return { message: response }

  } catch (error) {
    console.log("Generation Failed")
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "recieve a error from the ai" };
  }
}

export type Claude = typeof claude