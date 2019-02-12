const { spawn } = require('child_process');




function createScanners() {
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



createScanners()
setInterval(createScanners, 15000)
