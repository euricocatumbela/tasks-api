import { ApolloServer } from 'apollo-server';
import schema  from './graphql';
const PORT = process.env.PORT || 4000;

async function startServer() {

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

startServer();
