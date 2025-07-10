require('dotenv').config()
const mineflayer = require('mineflayer')
const http = require('http')
const util = require('minecraft-server-util') 

const SERVER_HOST = 'pandabd.aternos.me'
const SERVER_PORT = 42740 
const RETRY_INTERVAL = 90 * 1000 // 1 minute 30 seconds

const avengersEnv = process.env.AVENGERS || 'Natasha'
const avengers = avengersEnv.split(',').map(name => name.trim()).filter(Boolean)

if (avengers.length === 0) {
  console.error("⚠️ No Avenger names found in .env! Add AVENGERS=Name1,Name2,...")
  process.exit(1)
}

const heroicQuotes = [
  "Ami inevitable, bujhte parso?",
  "Shesh ekhon kachei.",
  "Amar shamne niye poro.",
  "Chaos diyei control kori.",
  "Puro duniya jalaye dibo 🔥",
  "Ekhane kono hero nai.",
  "Tumi chaileo thamate parba na.",
  "Power e shotti.",
  "Tomar fail dekhte moja lagbe.",
  "Puro universe amar hobe.",
  "Tomar protibad ekdom bekar.",
  "Ekdom palaw! Now!",
  "Eto shuru matro.",
  "Shobai amar samne matha nibe.",
  "Hope ekta boro myth.",
  "Dori chhilo, ekhon nai.",
  "Ami tomader thekei protect korte aschi.",
  "Time ekhon amar pokkhe.",
  "Biporjoy amader shuru.",
  "Tomar failure-i amar joy.",
  "Shanti bolar kichu nai.",
  "Tomar time shesh.",
  "Hero bolte kichu nai ekhon.",
  "Future amar hathe.",
  "Byatha mane control.",
  "Shob timeline amar shathe end kore.",
  "Multiverse amar order-e chole.",
  "Kewi poritran pete parbe na.",
  "Andhokar e amar bondhu.",
  "Shotti bhalo lagena?",
  "Even gods keo pore jaye.",
  "Tumi power mone koro? Bujhte parso na.",
  "Ami fate re likhi.",
  "Ei amar duniya.",
  "Mrityu amar sathe chole.",
  "Ekhon theke end shuru holo.",
  "Alo bondho kore de.",
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
  // New quotes below:
  "There are no strings on me.",
  "I have come to save the world… from you.",
  "Time is not on your side.",
  "Bow to the chaos within.",
  "You could not live with your own failure.",
  "Peace was never an option.",
  "You are out of time.",
  "You are not the hero you think you are.",
  "The future belongs to me.",
  "Pain is part of the plan.",
  "All timelines end with me.",
  "The Multiverse bends to my will.",
  "No one escapes destiny.",
  "Darkness is a gift.",
  "Do you fear the truth?",
  "Even gods fall.",
  "You think you have power?",
  "The balance must be restored.",
  "This is mercy.",
  "I rewrite fate.",
  "You're in my world now.",
  "Death follows me.",
  "The end... begins.",
  "Silence the light.",
];


function getRandomAvenger() {
  return avengers[Math.floor(Math.random() * avengers.length)]
}

function getRandomQuote() {
  return heroicQuotes[Math.floor(Math.random() * heroicQuotes.length)]
}

function checkServerAndConnect() {
  util.status(SERVER_HOST, SERVER_PORT)
    .then(() => {
      console.log('🟢 Server is online. Connecting bot...')
      createBotInstance()
    })
    .catch(() => {
      console.log('🔴 Server is offline. Retrying in 1 minute 30 seconds...')
      setTimeout(checkServerAndConnect, RETRY_INTERVAL)
    })
}

function createBotInstance() {
  const username = getRandomAvenger()
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
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

    setTimeout(() => {
      console.log(`[${username}] Time's up! Disconnecting bot...`)
      bot.quit()
    }, 1 * 60 * 1000)
  }

  function stopMovementLoop() {
    console.log(`[${username}] Disconnected. Cleaning up...`)
    clearInterval(movementInterval)
    bot.clearControlStates()

    // Recheck server before next connect
    setTimeout(() => {
      console.log('♻️ Rechecking server status...')
      checkServerAndConnect()
    }, 5000)
  }

  bot.on('spawn', startMovementLoop)
  bot.on('end', stopMovementLoop)
  bot.on('kicked', (reason) => console.log(`[${username}] Kicked:`, reason))
  bot.on('error', (err) => console.error(`[${username}] Error:`, err))
}

// 🚀 Start the process
checkServerAndConnect()

// 🌐 Dummy HTTP server for Render
const PORT = process.env.PORT || 3000
http.createServer((req, res) => {
  res.end("🛠️ Mineflayer bot is running on Render")
}).listen(PORT, () => {
  console.log(`🌐 Dummy HTTP server listening on port ${PORT}`)
})
