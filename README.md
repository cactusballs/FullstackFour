# Village - Group Project

![Sonny and Mariel high fiving.](https://content.codecademy.com/courses/learn-cpp/community-challenge/highfive.gif)


## Setting up the project

- `git clone` from repo
- run [villagers.sql](./server/sql/villagers.sql) in your local SQL server or database (e.g. MySQL workbench).


## Server setup
- Navigate into the server folder: using `cd server`
- create a copy of .env.example, save as '.env' and update with personal details (you don't need to update the JWT_SECRET password provided in the env.example)
- run `npm install`

Running server:
- run `npm start` in the console


## Client setup
- Navigate into the client folder 
- run `npm install`

Running frontend / client:
- `npm run dev` in the console (Vite used for Client)

Testing / client: 
- `npm test` in the console


## Testing registration and login with hashing:

1) You can create a new user on the Registration Page, please write down the password to remember it. Once you have successfully registered, you can check that the password has been hashed before being saved on the database. For this purpose, you can run in MySQL the following commands to check the last registration record: 
`USE village;`
`SELECT* FROM villagers;`

3) You can later test how the hashing process works on the Login Page by using the same user details (email and password) you provided in the registration form. Alternatively you could use one of these already existing users' details in the database:
	- 1) email: chloe.b@example.com, password: MyPassw0!
	- 2) email: lottie.j@example.com, password: Abcdef1@
	- 3) email: anh.n@example.com, password: Ma03?!12

