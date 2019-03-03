How to install:
- Download the latest release at https://github.com/ecc521/Raspberry-Pi-Remote-Desktop-macOS/releases
- Unzip the archive
- Drag the app to your Applications folder (Optional)

Note: I don't currently pay Apple $99 per year to get a developer certificate - so to open the app you will have to go into System Preferences > Security and Privacy > Click "Open Anyway"



How to build from source:
- Make sure you have electron-packager installed
- Clone the repository or download the zip
- cd into the directory
- Run the build.sh shell script
- Drag the app to your Applications folder (Optional)












How to Remote Desktop with terminal:

First, ssh into pi:
ssh piUsername@piipAddress


In Pi:
sudo apt-get install tightvncserver

#Change vncserver password (optional)
vncpasswd

#A view only password is a second password that can view the screen, but cannot make changes

#configure screen size and color depth
vncserver :1 -geometry WIDTHxHEIGHT -depth 24



On Mac:
open vnc://myUsername@piIpAddress:5901
- The password to use is the one input in the vnc server
