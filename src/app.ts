import Notifier from "youtube-notify"
import { Client } from "discord.js"
import { config } from "dotenv"

config()

const CHANNEL_ID = process.env.CHANNEL_ID ?? "1125392783419650078"
const CALLBACK_URL = process.env.CALLBACK_URL

if (!CALLBACK_URL) process.exit(404)

const notifier = new Notifier({
  hubCallback: CALLBACK_URL,
  port: 8080,
})

const client = new Client({
  intents: [130815],
})

notifier.on("notified", async ({ video }) => {
  const channel = await client.channels.fetch(CHANNEL_ID)
  console.log(channel?.id, video)
  if (!channel?.isTextBased()) return
  channel.send(`@everyone Here comes a new video!\n${video.link}`)
})

client.on("ready", async (preparedClient) => {
  console.log("Logged in as", preparedClient.user.tag)
})

client.login(process.env.BOT_TOKEN)

notifier.subscribe("UCsln5HVCdbSkGGIoQ9Uoc3A")
notifier.setup()

process.on("uncaughtException", (error) => {
  console.log("Error", error)
})
