import functions from "@google-cloud/functions-framework";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

const CHAT_COMPLETIONS_MODEL = "gpt-3.5-turbo";
const chat = new ChatOpenAI({modelName: CHAT_COMPLETIONS_MODEL,temperature: 0});

functions.http('helloHttp', async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    const query = req.query.translate || req.body.translate;
    if (!query || typeof query !== "string" || query.length === 0) {
      res.status(400).send("Invalid query");
      return;
    } 
    const chatResponse = await chat.call([
      new SystemChatMessage(
        "You are a helpful assistant that translates English to Italian."
      ),
      new HumanChatMessage(`Translate: ${query}`),
    ]);
    res.status(200).send(chatResponse);
  }
});
