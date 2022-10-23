const time = process.env.TIME  || 60 // How long the program will run for based on the cadence * 2
const cadence = process.env.CADENCE  || 1000 // MS of time between queue messages
const base = "message"
const rate = process.env.RATE  || "**" // How many messages sent


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

async function eatMessages(){
    for(let num = 0; num < time; num++){
        let stars = base
        for (let k = 0; k < num; k++){
            stars += rate
        }
        console.log(stars)
        await sleep(cadence)
        
    }
    
    for(let num = time; num > 0; num--){
        let stars = base
        for (let k = 0; k < num; k++){
            stars += rate
        }
        console.log(stars)
        await sleep(cadence)
    }

}

eatMessages()