![alt text](wastp.png "logo")
## API for Sport and Tournaments Project

### Setup

API built on express using apollo server for graphql

After clone the project, you should install dependencies, run:

```bash
npm install
```
Start containers, run:

```bash
docker-compose up -d
```

Execute migrations:

```bash
npm run db:migrate
```

Execute seeds:

```bash
npm run db:seed
```

That's it, if all is okay, you could go to http://localhost:3000/graphiql

To stop the containers, you can run:

```bash
docker-compose down
```