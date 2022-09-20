# <p align = "center"> Project Repo-provas 📖</p>

<p align="center">
   <img src="https://res.cloudinary.com/teepublic/image/private/s--Zi78NcGO--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1630566782/production/designs/24055931_0.jpg" width="450" height="450"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-lucasmartinso-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/lucasmartinso/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

This is an backend aplication to controll the data flow of an website/ mobile app of school's, university's tests basically. The main resposnsability this backend have is to secure the data, keeping the important and sensitive infos cripted, also have to make the quickly integration and communication with database and also with the frontend. The flow data that application works with are based in three big groups users, teachers and tests, but is so important to curl the importance of the others fields to complete and organizate better these three main groups and without they the application doesn't will make sence, like terms and disciplines complete the tests. In addition,this junction makes a good flow of complete info.  
***

## :computer:	 Tecnolgy and Concepts 

- JWTs
- Node.js
- TypeScript
- PostgresSQL with Prisma ORM

***

## :rocket: Routes

```yml
POST /users/sign-up
    - Route to create new user
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "password": "123456789ab", 
        "confirmPassword": "123456789ab"
}
```
    
```yml 
POST /users/sign-in
    - Route to make the login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "123456789ab"
    }
```
    
```yml 
POST /tests (autentify)
    - Route to create new tests
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {
         "name": "bom dia",
         "pdfUrl": "https://google.com",
         "categorie": "Projeto",
         "discipline": "HTML e CSS", 
         "instructor": "Diego Pinho"
}
```

```yml
GET /tests (autentify)
    - Route to list tests organized per period and category
    - headers: { "Authorization": `Bearer $token` }
    - body: {}
``` 

```yml
GET /tests/teachers (autentify)
    - Route to list tests organized per period and category
    - headers: { "Authorization": `Bearer $token` }
    - body: {}
```
***

## 🏁 Running the application

First, make the clone repository in your machine:

```
git clone https://github.com/luanalessa/projeto20-repoprova.git
```

After, inside the folder, run the comand to install the dependencies.

```
npm install
```

To finish the process, to init the server
```
npm start or npm run dev
```

:stop_sign: Don't forget to repeat the sequence above with [repositório](https://github.com/lucasmartinso/projeto20-repoprovas.git) that contains the interface of aplication, to test the project per complet.
