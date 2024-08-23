# Village - Group Project

## Setting up the project
(rough notes)

- git clone from repo
- run .sql file in MySql
- run `npm install`


## Server setup
- Navigate into the server folder 
- copy of .env.example save as '.env' and update with personal details
- run `npm install`

Running server:
- run `npm start` in the console


## Client setup
- run `npm install`

Running frontend / client:
- Navigate into the client folder
- `npm run dev` in the console (Vite used for Client)

Testing / client: 
- `npm test` in the console


## Testing registration and login with hashing:

1) You can create a new user on the Registration Page, please write down the password to remember it. Once you have successfully registered, you can check that the password has been hashed before being saved on the database. For this purpose, you can run in MySQLWorkbench the following commands to check the last registration record: 
`USE village;`
`SELECT* FROM villagers;`

3) You can later test how the hashing process works on the Login Page by using the same user details (email and password) you provided in the registration form. Alternatively you could use one of these already existing users' details in the database:
	- 1) email: chloe.b@example.com, password: MyPassw0!
	- 2) email: lottie.j@example.com, password: Abcdef1@


