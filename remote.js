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

        
        ssh.stdin.write("rm $HOME/.vnc/passwd\n") //Make sure the password is set on server startup
        let vncpassword = global.generatePassword(8)
    
    
        let installCommand = "sudo apt-get -y install tightvncserver"
        let vncCommand = "vncserver -geometry " + screen.width + "x" + screen.height + " -depth 24"
        
    ssh.stdin.write(installCommand + " && " + vncCommand + "\n")

    
    
    
    ssh.stdout.on("data", function(data) {
        
        let string = data.toString("utf8")
        if (string.includes("Password:")) {
            ssh.stdin.write(vncpassword + "\n")
        }
        if (string.includes("Verify:")) {
            ssh.stdin.write(vncpassword + "\n")
        }
        if (string.includes("Would you like to enter a view-only password (y/n)?")) {
            ssh.stdin.write("n\n")
        }
    }) 

        
    


            
    
    
}