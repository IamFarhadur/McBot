require('dotenv').config()
const mineflayer = require('mineflayer')

// Get Avenger names from .env and convert to array
const avengersEnv = process.env.AVENGERS || 'Protik'
const avengers = avengersEnv.split(',').map(name => name.trim()).filter(Boolean)

if (avengers.length === 0) {
  console.error("⚠️ No Avenger names found in .env! Add AVENGERS=Name1,Name2,...")
  process.exit(1)
}

const randomAvenger = () => avengers[Math.floor(Math.random() * avengers.length)]
const username = randomAvenger()

// Heroic quotes
const heroicQuotes = [
  "Reporting for duty!",
  "Avengers, assemble!",
  "Time to save the world 🌍",
  "Locked and loaded!",
  "Ready for action 💥",
  "Let's do this!",
  "I am vengeance.",
  "I am inevitable.",
  "Let's bring the thunder! ⚡",
]

// Get random quote
const getRandomQuote = () => heroicQuotes[Math.floor(Math.random() * heroicQuotes.length)]

// Create bot
const bot = mineflayer.createBot({
  host: 'ChudirBhai.aternos.me',
  username: username,
  auth: 'offline'
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
}

function stopMovementLoop() {
  console.log(`[${username}] Disconnected. Cleaning up...`)
  clearInterval(movementInterval)
  bot.clearControlStates()
}

bot.on('spawn', startMovementLoop)
bot.on('end', stopMovementLoop)
bot.on('kicked', (reason) => console.log(`[${username}] Kicked:`, reason))
bot.on('error', (err) => console.error(`[${username}] Error:`, err))
