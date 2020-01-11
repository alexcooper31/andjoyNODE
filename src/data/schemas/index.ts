import { gql } from 'apollo-server-express';

import {
  mutations as gameObjectMutations,
  queries as gameObjectQueries,
  types as gameObjectTypes,
} from './gameObject';

const schema = gql`
  ${gameObjectTypes}

  type Mutation {
    ${gameObjectMutations}
  }

  type Query {
    ${gameObjectQueries}
  }
`;

export default schema;
