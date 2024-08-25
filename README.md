# Village - Group Project

<img src="./client/src/assets/images/village-logo.png" width="200" alt="Village logo">

Welcome to __Village__ - the home of connection, community and support for parents and carers. Our aspiration is to provide a safe space to reach out, ask questions, and find events to meet like-minded people.

The main features of this React/Bootstrap Node/Express app are:
- login / registration
- personal dashboard with broadcast messages, poll, recent conversations and events spotlights
- event search using Ticketmaster API
- forum with filtering, start thread and reply functionality.

We hope you feel as passionate about this project as we do.

__"It takes a village. We are Village."__


## Setting up the project

- `git clone` from repo
- run [villagers.sql](./server/sql/villagers.sql) in your local SQL server or database (e.g. in MySQL workbench).


## Server setup
- Navigate into the server folder using `cd server` in the terminal.
- Create a copy of .env.example, save as '.env' and update with personal details (you do not need to update the JWT_SECRET password provided in the env.example).
- Run `npm install` to install necessary packages.
- Run `npm start` to run the server.


## Client setup
- Navigate into the client folder using `cd client`.
- Run `npm install`.

Running frontend / client:
- `npm run dev` in the console (Vite is used for running the Client)

Testing (Jest) / client: 
- `cd client` and `npm test` in the console.


## Testing registration and login with hashing:

1) You can create a new user on the Registration Page, please write down the password to remember it. Once you have successfully registered, you can check that the password has been hashed before being saved on the database. For this purpose, you can run in MySQL the following commands to check the last registration record: 
`USE village;`
`SELECT* FROM villagers;`

3) You can later test how the hashing process works on the Login Page by using the same user details (email and password) you provided in the registration form. Alternatively you could use one of these already existing users' details in the database:
	- 1) email: chloe.b@example.com, password: MyPassw0!
	- 2) email: lottie.j@example.com, password: Abcdef1@
	- 3) email: anh.n@example.com, password: Ma03?!12

