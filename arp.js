
const { spawn } = require('child_process');



async function getDevices() {
    
    let outputString = ""
    
    await new Promise((resolve, reject) => {
				
		let detector = spawn("arp", ["-a"], {
			detached: true,
			stdio: [ 'ignore', "pipe", "pipe" ]
		})
		
		detector.stderr.on("data", reject)
		
		detector.stdout.on("data", function(data) {
			outputString += data.toString("utf8")
		})
		
		detector.on("close", resolve)
		
	})
    
    
        
    let outputArray = outputString.split("\n")
    
    outputArray.pop() //remove ending newline
    
    
    for (let i=0;i<outputArray.length;i++) {
        outputArray[i] = outputArray[i].split(" ")
    }
    
    let filteredArray = outputArray.filter((array) => {
        return !((array[0] === "?" && array[3] === "(incomplete)") || !array[1].slice(1,-1).startsWith("192.168.1."))
    })
    
    
    for (let i=0;i<filteredArray.length;i++) {
        let obj = {}
        
        obj.reachable = filteredArray[i][3] !== "(incomplete)"
        obj.mac= filteredArray[i][3]
        obj.ip = filteredArray[i][1].slice(1,-1)
        obj.name = filteredArray[i][0]
        
        filteredArray[i] = obj
    }    
    
    filteredArray = filteredArray.sort(function(a,b) {
        if (a.reachable === b.reachable) {return 0}
        if (a.reachable > b.reachable) {return -1}
        return 1
    })
    
    console.log(filteredArray)
    return filteredArray
    
}




getDevices() //arp -a seems to cache output to some extent
global.getDevices = getDevices