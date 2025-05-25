require('dotenv').config()
const mineflayer = require('mineflayer')

// Random Avenger name generator
const avengers = [
  'IronMan', 'CaptainAmerica', 'Thor', 'Hulk',
  'BlackWidow', 'Hawkeye', 'Vision', 'Wanda',
  'SpiderMan', 'DoctorStrange', 'BlackPanther',
  'AntMan', 'Falcon', 'WinterSoldier', 'CaptainMarvel', 'Loki'
]
const randomAvenger = () => avengers[Math.floor(Math.random() * avengers.length)]

// Use .env USERNAME if available, otherwise pick random
const username = process.env.USERNAME || randomAvenger()

// Create the bot
const bot = mineflayer.createBot({
  host: 'ChudirBhai.aternos.me', // change this if needed
  username: username,
  auth: 'offline'
})

// Run & jump forever
function runAndJumpForever() {
  bot.setControlState('forward', true)
  bot.setControlState('jump', true)
  bot.chat("Are you ready?") // Send chat after spawn
}

// Auto-trigger after spawn
bot.on('spawn', () => {
  runAndJumpForever()
})

// Handle disconnect
bot.on('end', () => {
  bot.clearControlStates()
})
