# LiQuiD

Linode Quick Deployment (LiQuiD) CLI tool

Uses <a href="https://github.com/tj/commander.js/">commander.js</a>, <a href="https://github.com/SBoudrias/Inquirer.js/">inquirer.js</a> and the <a href="https://developers.linode.com/api/v4">Linode API</a>

## Demo

![Demo](https://unpkg.com/@jjcosgrove/liquid@latest/demos/create.svg)

## Install

```
npm -g install @jjcosgrove/liquid
```

## Features

LiQuiD lets you easily deploy a new Linode instance, from your terminal by presenting a series of simple questions and then making the necessary Linode API calls to deploy your new instance. It will respond, on success, with the IP address if your new instance.

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
- [ ] Refactor coed
