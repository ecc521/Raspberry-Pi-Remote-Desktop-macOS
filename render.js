async function updateDevices() {
    
    let deviceElem = document.getElementById("devices");
    while (deviceElem.firstChild) {
        deviceElem.removeChild(deviceElem.firstChild);
    }
    
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
    
    
    document.getElementById("devices").appendChild(createItem("Device Name", "IP Address", "Reachable", "MAC Address"))
    
    
    let devices = await getDevices()
    
    for (let i=0;i<devices.length;i++) {
        document.getElementById("devices").appendChild(createItem(devices[i].name, devices[i].ip, devices[i].reachable, devices[i].mac))
    }
    
    
}

updateDevices()
setInterval(updateDevices, 10000)