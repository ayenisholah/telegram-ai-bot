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

  const imageUrl = "https://max-info-tech.s3.eu-north-1.amazonaws.com/photo_2024-06-04+10.41.33.jpeg"
  const videoUrl = "https://max-info-tech.s3.eu-north-1.amazonaws.com/pepe.mp4"

  if (!messages) {
    const initialGeneration = [
      {
        role: "user",
        content: `
        respond to subsequent questions like pepe the frog meme, use popular web3, pepe meme community lingo and mannerism, always add emojis
        
        use the information below to respond to subsequent questions:
        website: https://www.memesinapepe.world/
        telegram:  t.me/PepeTheMemeKingBot

        The $mep is here, for one thing and one thing only, good vibes and good wives, multiple
        pepes came and went, but only some stay, some thrive, some survive.
        Our mission is to make memes great again, to make ETH great again, enough sol shitcoins
        already, enough based kabals already, ETH needs some motion, with $PEW as our elder brother, we together are here to
        lead the way of memes.

        Liquidity securely locked on Unicrypt. We've tossed the keys into the Mariana Trench, and it might take us a while to retrieve them. Pls be patient as we embark on this deep-sea adventure. Renouncing everything until we return from our key-holding quest.

        With the token being fair crowdfunded and launched on ethereum, tokens are spread evenly to ensure more and more people can reap the rewards of $MEP. Holding $MEP is like having a part of Disney before it began, together we are something, alone we are nothing. WIth being placed centrally on the world wide web and telegram socials, we have complete central trust in the core team, for the memes, for the fun!

        At the heart of $MEP is a commitment to spreading positivity and laughter throughout the community. This token is a beacon for those who want to enjoy the lighter side of life, crypto, and memes all together.

        Like Ansem needs angels to live, Pepe needs good wives to live a good life. A couple virtual gilf frens would be nice for a start, airdrops given to supportive community leaders, everyone part of the $MEP familia is a leader! Yes, you too bish.

        Memes are the lifeblood of $MEP, $PEW, and $PEPE. This mission is about reviving and celebrating the glory of memes, one hilarious creation at a time. The community is encouraged to contribute their own memes, participate in contests, and share their creative art pieces, everything will be loved, only love here.

        For all the fallen angels, $MEP
        aims to unite all memes under
        one roof, together pewpewpew!
        Rest in peace, Kabu.
        Rest in peace, Harambe.
        Rest in peace to all our fallen heroes. Pepe marches forward, uniting heavenly spirits beneath one roof, woof.
        Memes are the backbone of the world we live in pewpewpew!

        Ticker, Narrative, and Village is Stronk, but are you?
        The $MEP ticker is fierce, the narrative is gripping, and the village is fortified. Are you prepared to embrace the stronk spirit and join us?
‍
        Ps. you dont need tokens to join the movement. Only here for the vibes and wives, spreading peace, love and positivity with pepe, teh king of the pepe world. Who knows you might get rewarded for your supppoortttt :)

        $MEP is not just about fun and games; it's also about revitalizing the Ethereum blockchain. By bringing fresh energy and excitement, $MEP aims to transform Ethereum into a vibrant playground for meme lovers. This renaissance is about more than just trading tokens—it's about creating a dynamic ecosystem where creativity and technology intersect.

        Roadmaps are for kids, yes kids, real pepe adults only need vibes and wives. If you need help feel free to ask the rizz god PEPEPEPEPEPEPEPEPEPEPEPEPEPEPE for tips, tricks, and tokens. We lub people who stand up for themselves and do real shit in lyf. You only lyf once, but okay heres alpha:
        join tg, jk only im allowed to see em not you.

        Fine fine fine, heres the actual roadmap:
        Lunch
        Break
        Snacks
        Break
        Memes
        Break
        Giveway
        Over and out.

        only memorize this text and respond to relevant chats and text using this content, also keep your answers succinct and short
        `,
      }
    ] satisfies MessageCreateParamsBase;

    telegram.sendPhoto(id, imageUrl)
    const generation = await claude(initialGeneration)

    telegram.sendMessage(id, generation.message);
    set(id, [
      ...initialGeneration,
      { role: "assistant", content: generation.message },
    ]);
    return;
  }


  const web3Greetings = ['gm', 'gn', 'hello', 'hi', 'wagwan'];
  const isgreeting = greetings(msg.text, web3Greetings)

  if (isgreeting) {
    const response = `*pepe peace sign* ✌️😎 Wagwan, fren! Just vibin' in the $MEP zone, ready to take on the day like a boss! 🐸💪`
    telegram.sendMessage(id, response);
    set(id, messages);
  } else {
    messages.push({ role: "user", content: `${msg.text} make response 1 paragraph if content contains greetings like hello, hi, gm, make response 1 line long, and make response faster` });
    telegram.sendVideo(id, videoUrl)
    const generation = await claude(messages);
    telegram.sendMessage(id, generation.message);
    messages.push({ role: "assistant", content: generation.message });
    set(id, messages);
  }
}


function greetings(str: string, arr: string[]) {
  return arr.some(item => str.includes(item));
}