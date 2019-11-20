async function updateDevices() {

    function createItem(name, ip, available, mac) {
        let item = document.createElement("div")

        function createSpan(text) {
            let span = document.createElement("span")
            span.innerText = text
            return span
        }

        item.appendChild(createSpan(name))
        item.appendChild(createSpan(ip))
        item.appendChild(createSpan(available))
        item.appendChild(createSpan(mac))
        return item
    }




    let devices = await getDevices() //Load the devices first... This may take some time

    //Delete any elements currently present
    let deviceElem = document.getElementById("devices");
    while (deviceElem.firstChild) {
        deviceElem.removeChild(deviceElem.firstChild);
    }

    //Add the header
    document.getElementById("devices").appendChild(createItem("Device Name", "IP Address", "Reachable", "MAC Address"))

    //Add the devices
    for (let i=0;i<devices.length;i++) {
        document.getElementById("devices").appendChild(createItem(devices[i].name, devices[i].ip, devices[i].reachable, devices[i].mac))
    }


}

updateDevices()
setInterval(updateDevices, 10000)

//Dev Tools for Debugging
document.addEventListener("keydown", function(event) {
    if (event.key === "I" && event.ctrlKey && event.shiftKey) {
        require('electron').remote.getCurrentWindow().toggleDevTools()
    }
})


async function checkForUpdates() {
    let currentVersion = require("electron").remote.app.getVersion()

    let request = await fetch("https://api.github.com/repos/ecc521/Raspberry-Pi-Remote-Desktop-macOS/releases/latest", {cache:"no-store"})
    let releaseInfo = await request.json()
    let latestVersion = releaseInfo.tag_name
    if (latestVersion.startsWith("v")) {latestVersion = latestVersion.slice(1)}

    if (currentVersion != latestVersion) {

        let alert = document.createElement("p")
        alert.innerHTML = `This app (version ${currentVersion}) is out of date. You can download the latest version (${latestVersion}) `

        let button = document.createElement("p")
        button.innerHTML = "here"
        button.style.textDecoration = "underline"
        button.style.cursor = "pointer"
        button.style.display = "inline-block"

        button.onclick = function() {
            let display = require("electron").screen.getPrimaryDisplay()
            let BrowserWindow = require("electron").remote.BrowserWindow
            let downloadWindow = new BrowserWindow ({
                webPreferences: {
                    nodeIntegration: false
                },
				width: Math.ceil(display.bounds.width*0.75),
				height: Math.ceil(display.bounds.height*0.75)
            })

            downloadWindow.loadURL('https://github.com/ecc521/Raspberry-Pi-Remote-Desktop-macOS/releases/latest')
        }

        alert.appendChild(button)
        alert.style.textAlign = "center"
        document.body.insertBefore(alert, document.body.firstChild)

    }
}



checkForUpdates()
