import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer }  from 'apollo-server-express';
import cors from 'cors';
import { createServer } from 'http';
import { schema } from './data/schema';

const app = express();
const PORT = 8080;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: false
}

app.use('*', cors({ origin: 'http://localhost:3000'}));
app.use('/graphql', bodyParser.json());


const apolloServer = new ApolloServer({ schema: schema });
apolloServer.applyMiddleware({ app , corsOptions });


const server = createServer(app);

apolloServer.installSubscriptionHandlers(server);

server.listen(PORT, () => {  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
