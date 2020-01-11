import { ApolloServer } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mysql from 'mysql';

dotenv.config();

import resolvers from './data';
import typeDefs from './data/schemas';

// const {
//   MYSQL_URI = '',
// } = process.env;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 3001;

app.set('port', port);
app.listen(port, () => console.log(`Server listening on port ${port}!`));

connection.connect((err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

export default connection;
