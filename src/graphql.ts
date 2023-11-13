import { buildSchema } from 'graphql';
import { addResolversToSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers/resolvers';
import { typeDefs } from './types/types';

const schema = buildSchema(typeDefs);

 const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

export default schemaWithResolvers;
