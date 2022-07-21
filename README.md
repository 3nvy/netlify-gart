# Typescript, GraphQl, Apollo & React Skeleton

### This is Full-stack, ready-to-use skeleton that you can use for your projects. 
### It uses the following technologies:

<br/>

### Globally
 - TypeScript
 - GraphQL

<br/>

### API Side
 - ExpressJS
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

## Setting Up The Database

<br>

The project is structured to work with a live database, but you are free to reconfigure and use what you want. I personally recommend [Supabase](https://supabase.com), as its free and really easy to use and setup.

Once you have your database setup, you will need to add your `Connection String` to the `.env` file located inside the `/api` folder, by replacing the `DATABASE_URL` with real data.

This should be all you need for your database, you don't need to create any tables or any kind of structure in the database, as Prisma Client will take care of that

<br><br>

## Start The Project
<br>

Start the project by installing all the dependencies of the project by running
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
yarn run dev
```

By now you should have the example project running, note that API is running at `http://localhost:4000/graphql` and the Web project is running at `http://localhost:3000`

<br><br>

## Notes

By running the first migration, you will sync the database with the current Prisma Schema, which contains a simple example model, which you probably wont want for your project. You can sort this out by editing the schema before hand, or just remove the model and create another migration.
