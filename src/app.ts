import Notifier from "youtube-notify"

// Options
const notifier = new Notifier({
  hubCallback: "https://example.com/youtube",
  port: 8080,
  secret: "Something",
  path: "/youtube",
})
// Setup
notifier.setup()
// Notification
notifier.on("notified", (data) => {
  console.log("New Video")
  console.log(
    `${data.channel.name} just uploaded a new video titled: ${data.video.title}`
  )
})
// Subscription
notifier.subscribe("CHANNEL_ID") // String
notifier.subscribe(["CHANNEL_ID1", "CHANNEL_ID2"]) // Array

