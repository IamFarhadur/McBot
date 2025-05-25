require('dotenv').config()
const mineflayer = require('mineflayer')

// Avengers list
const avengers = [
  'IronMan', 'CaptainAmerica', 'Thor', 'Hulk',
  'BlackWidow', 'Hawkeye', 'Vision', 'Wanda',
  'SpiderMan', 'DoctorStrange', 'BlackPanther',
  'AntMan', 'Falcon', 'WinterSoldier', 'CaptainMarvel1', 'Loki'
]
const randomAvenger = () => avengers[Math.floor(Math.random() * avengers.length)]
const username = process.env.USERNAME || randomAvenger()

// Heroic spawn lines
const heroicQuotes = [
  "Reporting for duty!",
  "Avengers, assemble!",
  "Time to save the world 🌍",
  "Locked and loaded!",
  "Ready for action 💥",
  "Let's do this!",
  "Your friendly neighborhood hero is here 🕸️",
  "Standing by. Let's roll!",
  "I am inevitable.",
  "For justice! ⚖️"
]
const getRandomQuote = () => heroicQuotes[Math.floor(Math.random() * heroicQuotes.length)]

// Create the bot
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
  console.log(`[${username}] Bot has disconnected. Stopping movement.`)
  if (movementInterval) {
    clearInterval(movementInterval)
    movementInterval = null
  }
  bot.clearControlStates()
}

// Events
bot.on('spawn', startMovementLoop)
bot.on('end', stopMovementLoop)
bot.on('kicked', (reason) => {
  console.log(`[${username}] Kicked:`, reason)
})
bot.on('error', (err) => {
  console.error(`[${username}] Error:`, err)
})
