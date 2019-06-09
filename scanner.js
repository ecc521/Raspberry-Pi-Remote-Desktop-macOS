const { spawn, spawnSync } = require('child_process');

let output = spawnSync("ifconfig").stdout.toString()

output = output.split(" ")
let broadcastPosition = output.indexOf("broadcast")

global.thisDevice = output[broadcastPosition - 3]
global.broadcast = output[broadcastPosition + 1]
global.broadcast = global.broadcast.slice(0, global.broadcast.indexOf("\n"))



function createScanners() {

    //Ideally we ping every possible ip address, because some devices do not reply to broadcast pings.
    //However if the local network is not 192.168.1.XXX, pinging the broadcast may find us some devices. Plus, pinging the broadcast may allow a quicker startup.

    if (global.broadcast === "192.168.1.255") {
        //Ping ip's so arp -a picks them up
        for (let i=0;i<255;i++) {
            let ip = "192.168.1." + i
            //Send just 5 packets so this terminates rather quickly
            let scanner = spawn("ping", ["-c", 5, ip], {
                detached: true,
                stdio: [ 'ignore', 'ignore', "ignore" ]
            })
        }
    }
    //Ping broadcast ip so that arp -a picks up the devices that reply
    let scanner = spawn("ping", ["-c", 5, global.broadcast], {
        detached: true,
        stdio: [ 'ignore', 'ignore', "ignore" ]
    })
}



createScanners()
setInterval(createScanners, 15000)
