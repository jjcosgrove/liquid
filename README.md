# LiQuiD

Linode Quick Deployment (LiQuiD) CLI tool

Uses <a href="https://github.com/tj/commander.js/">commander.js</a>, <a href="https://github.com/SBoudrias/Inquirer.js/">inquirer.js</a> and the <a href="https://developers.linode.com/api/v4">Linode API</a>

## Demo

![Demo](https://unpkg.com/@jjcosgrove/liquid@latest/demos/create.svg)

## Install

```
npm -g install @jjcosgrove/liquid
```

## Usage

Set up your Linode Personal Access Token ([here](https://cloud.linode.com/profile/tokens)) and enter it into the LiQuiD CLI tool:

```bash
$ liquid init
? Linode Personal Access Token: PASTE_YOUR_TOKEN_HERE_AND_PRESS_ENTER
✔ LiQuiD successfully initialized
```

Now, anytime you need to quickly deploy a new Linode instance you can simply run:

```bash
liquid create
```

And follow the prompts. Upon successful completion it will output a message detailing the IP address and provisioning status of your new Linode instance.

Current supported commands are:

command|function
-|-|
init|Initialize LiQuiD (configure API token)
create|Deploy new Linode instance

## Notes
This is very much a pre-pre alpha release (i.e. if it blows up your mac, don't come knocking).

## Todo

- [ ] Better & more robust error messages
- [ ] Nicer visuals
- [ ] Implement profiles
- [ ] Implement domains
- [ ] Refactor code
