const types = `
  type GameObject {
    rowId: String!
    userId: String!
    gameId: Int!
    gameName: String
    isWanted: Boolean
    isPlayed: Boolean
    isFavorite: Boolean
    userRating: Int
    releaseDate: Int
    platform: String
  }
`;

const queries = `
  gameObjectGet(
    userId: String!
    gameId: Int!
  ): GameObject

  wantedListGet(
    userId: String!
    filter: String
    order: Int
    platform: String
  ): [GameObject]

  playedListGet(
    userId: String!
    filter: String
    order: Int
    platform: String
  ): [GameObject]

  favoriteListGet(
    userId: String!
    filter: String
    order: Int
    platform: String
  ): [GameObject]

  listCountGet(
    userId: String!
    listType: String!
  ): Int

  favoritePlatformGet(
    userId: String!
  ): String

  mostGivenRatingGet(
    userId: String!
  ): Int

  upcomingWantedGames(
    userId: String!
  ): [GameObject]
`;

const mutations = `
  createGameObject(
    userId: String!,
    gameId: Int!,
    gameName: String,
    releaseDate: Int,
  ) : Boolean!

  editGameObject(
    userId: String!,
    gameId: Int!,
    isWanted: Boolean,
    isPlayed: Boolean,
    isFavorite: Boolean,
    userRating: Int,
    platform: String,
  ): Boolean!
`;

export {
  types,
  queries,
  mutations,
};
