# Decenternet Book Recorder

Decenternet Book Recorder is a simple book info recording system developed with MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack.

## Demo

- Backend https://decenternet-assessment-backend.herokuapp.com
- Frontend https://decenternet-assessment-frontend.vercel.app

## Process to install MERN stack

For Backend Server:

- Creating a repository for backend and initializing npm using `npm init`
- Installed necessary packages like express, bcryptjs, body-parser, cors, mongoose, Validator etc and utility library like underscore
- Created a cluster on mongoDB cluster and configured the database into the project
- Configured .env file with the respected values which is give in .env.example file
- Configured ` server.js` & `app.js` file
- Installed `nodemon` as watcher for the local development
- Then worked on the main task. :D
- For Client Server:
- Installed ReactJs by ` create-react-app`
- Installed necessary packages like react-hook-form, axios, @mui/material, react-query, etc.
- Configured .env file with the respected values which is give in .env.example file-
- Then worked on the main task. :D

## Usage of Linter

I have used ESLint for the development. I just extends the configuration form `eslint:recommended `. Steps given below:

- Installed eslint by the command `npm i -D eslint`
- Initializing configuration by the command `npx eslint init`
- Extends recommended configuration form `eslint:recommended `
- Configured `server.js & app.js` file

## Installation

Decenternet Book Recorder requires [Node.js](https://nodejs.org/) v10+ to run.

##### Backend:

- Clone or download compressed file from https://github.com/yasirarafat28/decenternet-assessment-backend.git
- Upzip folder if you download the compressed file
- configure .env file. (You can copy from .env.example file as well)
- Install the dependencies and devDependencies and start the server.

For development environments...

```sh
npm i
npm run dev
```

For production environments...

```sh
npm i
NODE_ENV=production node server.js
```

##### Frontend:

- Clone or download compressed file from https://github.com/yasirarafat28/decenternet-assessment-frontend.git
- Upzip folder if you download the compressed file
- configure .env file. (You can copy from .env.example file as well)
- Install the dependencies and devDependencies and start the server.

For development environments...

```sh
npm i
npm start
```

run `npm run build` to build the project.

**Thank You!**
