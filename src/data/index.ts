import mutations from './resolvers/mutations';
import queries from './resolvers/queries';

const graphql = {
  Query: queries,
  Mutation: mutations,
};

export default graphql;
