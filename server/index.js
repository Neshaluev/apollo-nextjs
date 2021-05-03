const express = require('express');
const next = require('next');

const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== 'production';

console.log('DEV', dev);

const app = next({ dev });
const handle = app.getRequestHandler();

const db = require('./database');
db.connect();

app.prepare().then(() => {
  const server = express();

  require('./middleware').init(server, db);

  const apolloServer = require('./graphql').createApolloServer();
  apolloServer.applyMiddleware({ app: server });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(5000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
