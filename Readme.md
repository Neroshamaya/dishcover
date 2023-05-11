# Dishcover

An app to edit, create and discover recipes

## Install dependencies

1. First, make sure you use the right version of node.js

   `nvm install`

   `nvm use`

2. Then install [pnpm](https://pnpm.io/)

   `npm install -g pnpm`

3. Run the dependencies installation on the backend and the frontend at the same time

   `pnpm run setup`

## Start the backend and the frontend

`pnpm run dev`

At some point, you should see something of this form in the console:

```bash
VITE v4.3.4  ready in 459 ms
@app/client dev:   ➜  Local:   http://localhost:XXXX/
@app/client dev:   ➜  Network: use --host to expose
.....
.....
.....
@app/server dev: Dishcover backend server is listening on port 3009

```

Just go to `http://localhost:XXXX/` and enjoy

## Run the backend test suite (none for the front yet)

`pnpm run server test`
