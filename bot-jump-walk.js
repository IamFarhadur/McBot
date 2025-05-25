const mineflayer = require('mineflayer')

// Random Avenger name generator
const avengers = [
  'IronMan', 'CaptainAmerica', 'Thor', 'Hulk',
  'BlackWidow', 'Hawkeye', 'Vision', 'Wanda',
  'SpiderMan', 'DoctorStrange', 'BlackPanther',
  'AntMan', 'Falcon', 'WinterSoldier'
]
const randomAvenger = () => avengers[Math.floor(Math.random() * avengers.length)]

// Create the bot
const bot = mineflayer.createBot({
  host: 'ChudirBhai.aternos.me',
  username: randomAvenger(), 
  auth: 'offline'
})

// Function to run + jump forever
function runAndJumpForever() {
  bot.setControlState('forward', true)
  bot.setControlState('jump', true)
  bot.chat("Are you ready?") // New message
}

// Trigger on every spawn (includes after death)
bot.on('spawn', () => {
  runAndJumpForever()
})

// Clean up on disconnect
bot.on('end', () => {
  bot.clearControlStates()
})
