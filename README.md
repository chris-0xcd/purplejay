# purplejay

A proof-of-concept Electron Grayjay client. I started this project mainly for fun and to learn about various Web
technologies, it is not intended for general use.
I'm releasing this now because an official Grayjay desktop app has been announced, and I'll probably not have any
time to work on this going forward.

## Read before using
This project is a proof of concept, it is not intended for general use.
While the basic features like search, channel view and video playback are technically available all of them are only
very rudimentary. I'm new to Vue and Electron and didn't know how Grayjay plugins work or what would be required
to get video playback working when I started and the code reflects that. Don't expect clean code is what I'm saying :)

Note that source.js from the official Grayjay repository (`grayjay/app/src/main/assets/scripts/source.js`) is required
to run this application. The file is currently not available under a license that would allow me to include it with this
project but should be released under the AGPL in the future.

### Security considerations
Be aware that the sandboxing functionality and some web security features in Electron are disabled and that Grayjay
plugins are javascript code loaded from the internet and might load in additional javascript files for execution.
Also, various protection mechanisms from Grayjay - like url whitelisting - are not implemented.
Use at your own risk!

### Running
- Make sure nodejs is installed. (Only tested on Linux with 20.11 LTS.)
- Checkout the repository and place source.js under `src/renderer/src/grayjay/pluginworker/source.js`
- (In the repository root) install the required dependencies (assuming node/npm are installed):
`npm ci`
- Build dependencies (polycentric-core):
`npm run prepare`
- To run in development mode use:
`npm run dev`

It might also be possible to build release packages using these commands (untested):
Windows:
`npm run build:win`

Mac:
`npm run build:mac`

Linux:
`npm run build:linux`

## Credits
In addition to the packages in package.json this projects includes code from the following projects/libraries:
- polycentric-core (BSD 3-Clause, https://gitlab.futo.org/polycentric/polycentric)
- node-cookiejar (MIT, https://github.com/bmeck/node-cookiejar)
- Some of the UI is loosely based on vuetify-youtube-clone-template (MIT, https://github.com/techreagan/vuetify-youtube-clone-template/tree/master)
