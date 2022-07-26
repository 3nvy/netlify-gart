# GraphQL, Apollo, React and Typescript skeleton using Netlify Functions

### This is Full-stack, ready-to-use skeleton that you can use for your projects. 
### It uses the following technologies:

<br/>

### Globally
 - TypeScript
 - GraphQL

<br/>

### API Side
 - Netlify Functions
 - Apollo Server
 - Prisma Client
  
<br/>

### Web Side
 - React
 - Apollo Client

<br/><br>

## Considerations

The project assumes that you already have enough knowledge on the above technologies, this is simply a project to get you up and running on coding your project, w/t having to go trough the hassle of coding the server and project boilerplate.

<br/><br>

## Pre-Requirements

This project uses netlify functions, in order to deploy a serverless full-stack project onto the web, as such, please consider create a netlify account before starting

<br><br>

## Setting Up The Database

The project is setup to work with Prisma Client, which is an ORM that has native connectors to PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB, but you are free to reconfigure and use what you want. I personally recommend [Supabase](https://supabase.com), as its free and really easy to use and setup.

Once you have your database setup, you will need to add your `Connection String` to the `.env` file (you can rename the `.env.template` file provided), by replacing the `DATABASE_URL` with a valid url.

This should be all you need for your database, you don't need to create any tables or any kind of structure in the database, as Prisma Client will take care of that

<br><br>


## Start The Project

As the project relies on netlify functions, start by installing the netlify cli if you haven't already:

```
npm install netlify-cli -g
```

<br>

Install all the require dependencies:

```
yarn
```

<br>

Then, create the database structure by generating a migration:

```
npx prisma migrate dev --name init
```

This will generate a migration and sync the database with your current Prisma Schema

<br>

Then run the both api and web to start the project:

```
ntl dev
```

By now you should have the example project running, note that API is running at `http://localhost:8888/.netlify/functions/graphql` and the Web project is running at `http://localhost:8888`

<br><br>

## Notes

By running the first migration, you will sync the database with the current Prisma Schema, which contains a simple example model, which you probably wont want for your project. You can sort this out by editing the schema before hand, or just remove the model and create another migration.


<br><br>

## Deploying

In order to deploy the project live, first compile the web project by running:

```
ntl build
```

Then to deploy the website onto netlify

`Note: This step will ask you to login and select either an existent project or a new project to deploy to. This should only happen once per project.`

```
ntl deploy
```

After the deployment, you should be given a couple of links, where you can see a draft of your project running. 

You also need to setup the `env` parameter to `DATABASE_URL` manually onto your project settings, under `Build & Deploy` as this file is only used locally.

After all this setup, if the website looks good and everything is working, you just need to type

```
ntl deploy --prod
```

And now your project should be fully online, both Web and API