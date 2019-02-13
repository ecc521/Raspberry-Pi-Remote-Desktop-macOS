const { spawn, spawnSync } = require('child_process');

async function piReady(username, ip, vncpassword) {
    
    require("electron").clipboard.writeText(vncpassword)

    alert("You will be prompted for a password. The password (" + vncpassword + ") has been copied to your clipboard.")
    
    
    await new Promise((resolve, reject) => {
				
		let remote = spawn("open", ["vnc://" + username + "@" + ip + ":5901"], {
			detached: true,
			stdio: [ 'pipe', "pipe", "pipe" ]
		})
		
		ssh.stderr.on("data", function(data) {
			console.log(data.toString("utf8"))
            document.getElementById("output").innerHTML += data.toString("utf8")
		})
        
		ssh.stdout.on("data", function(data) {
			console.log(data.toString("utf8"))
            document.getElementById("output").innerHTML += data.toString("utf8")
		})
		
		remote.on("close", resolve)
		
	})
    
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


global.remoteDesktop = async function() {
    
    let ip = document.getElementById("address").value
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    
        //-tt forces pesudo-terminal allocation
		let ssh = spawn(__dirname + "/sshexpect.sh", [password, "ssh", username + "@" + ip], {
			detached: true,
			stdio: [ 'pipe', "pipe", "pipe" ]
		})
        
		window.ssh = ssh

        
        await new Promise((resolve,reject) => {
		ssh.stderr.on("data", function(data) {
			console.log(data.toString("utf8"))
            document.getElementById("output").innerHTML += data.toString("utf8")
            reject()
		})
            
		ssh.stdout.on("data", function(data) {
			console.log(data.toString("utf8"))
            document.getElementById("output").innerHTML += data.toString("utf8")
            if (data.toString("utf8").indexOf("Starting applications specified in ") !== -1) {
                piReady(username, ip, vncpassword)
            }
            if (data.toString("utf8").indexOf("Last login:") !== -1) {
            resolve()
            }
		})
            
        })

        

        ssh.stdin.write("sudo apt-get install tightvncserver\nY\n")

            await sleep(500)

    
        await new Promise((resolve,reject) => {
            
            ssh.stdout.on("data", (data) => {
                if (data.toString("utf8").indexOf("$") !== -1) {
                    console.log(data.toString("utf8"))
                    resolve()
                }
            })
            
        })
    

        let vncpassword = global.generatePassword(8)
        
        
        ssh.stdin.write("rm $HOME/.vnc/passwd\n") //Make sure the password is set on next step
        
        await sleep(500)
        ssh.stdin.write("vncserver :1 -geometry " + screen.width + "x" + screen.height + " -depth 24\n")
    
        await sleep(750)
    
        ssh.stdin.write(vncpassword + "\n")
    
    await sleep(300)
        ssh.stdin.write(vncpassword + "\n")
    
    await sleep(300)
    
    ssh.stdin.write("n\n")

            
    
    
}