require('dotenv').config()
const mineflayer = require('mineflayer')
const http = require('http')

// 🔥 Load Avenger names from .env
const avengersEnv = process.env.AVENGERS || 'Wanda'
const avengers = avengersEnv.split(',').map(name => name.trim()).filter(Boolean)

if (avengers.length === 0) {
  console.error("⚠️ No Avenger names found in .env! Add AVENGERS=Name1,Name2,...")
  process.exit(1)
}

const heroicQuotes = [
  "I am inevitable.",
  "The end is near.",
  "Kneel before your king.",
  "Chaos is a ladder.",
  "Let the world burn 🔥",
  "There are no heroes here.",
  "You can't stop what's coming.",
  "Power is the only truth.",
  "I'll enjoy watching you fail.",
  "The universe will be mine.",
  "Your resistance is meaningless.",
  "Now, run.",
  "This is just the beginning.",
  "All will kneel.",
  "Hope is a lie.",
]

function getRandomAvenger() {
  return avengers[Math.floor(Math.random() * avengers.length)]
}

function getRandomQuote() {
  return heroicQuotes[Math.floor(Math.random() * heroicQuotes.length)]
}

// 🌟 Core bot logic
function createBotInstance() {
  const username = getRandomAvenger()
  const bot = mineflayer.createBot({
    host: 'ChudirBhai.aternos.me',
    username,
    auth: 'offline',
  })

  let movementInterval

  function startMovementLoop() {
    const quote = getRandomQuote()
    console.log(`[${username}] Spawned: "${quote}"`)
    bot.chat(`${username}: ${quote}`)

    movementInterval = setInterval(() => {
      bot.setControlState('forward', true)
      bot.setControlState('jump', true)
      console.log(`[${username}] Moving forward and jumping...`)
    }, 1000)

    // 🕒 Auto disconnect after 2 mins
    setTimeout(() => {
      console.log(`[${username}] Time's up! Disconnecting bot...`)
      bot.quit()
    }, 1 * 60 * 1000)
  }

  function stopMovementLoop() {
    console.log(`[${username}] Disconnected. Cleaning up...`)
    clearInterval(movementInterval)
    bot.clearControlStates()

    // 🚀 Recreate bot after disconnect
    setTimeout(() => {
      console.log('♻️ Reconnecting with a new identity...')
      createBotInstance()
    }, 5000) // short pause before reconnect
  }

  bot.on('spawn', startMovementLoop)
  bot.on('end', stopMovementLoop)
  bot.on('kicked', (reason) => console.log(`[${username}] Kicked:`, reason))
  bot.on('error', (err) => console.error(`[${username}] Error:`, err))
}

// 🎬 Start the first bot
createBotInstance()

// 🌐 Dummy HTTP server for Render
const PORT = process.env.PORT || 3000
http.createServer((req, res) => {
  res.end("🛠️ Mineflayer bot is running on Render")
}).listen(PORT, () => {
  console.log(`🌐 Dummy HTTP server listening on port ${PORT}`)
})
