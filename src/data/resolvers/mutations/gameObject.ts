import connection from '../../../index';

const createGameObject = (_: any, args: any) => {
  const { userId, gameId, gameName, releaseDate } = args;

  const sql = `
    INSERT IGNORE INTO
      UserGames(rowId, userId, gameId, gameName, isWanted, isPlayed, isFavorite, userRating, releaseDate, platform)
      VALUES(
        '${userId}${gameId}',
        '${userId}',
        ${gameId},
        "${gameName}",
        ${false},
        ${false},
        ${false},
        ${0},
        ${releaseDate},
        'NONE'
      )
  `;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (error) => {
      if (error) { return reject(error); }
      return fulfill(true);
    });
  });
};

const editGameObject = (_: any, args: any) => {
  const { userId, gameId, isWanted, isPlayed, isFavorite, userRating, platform } = args;

  let wantedSql = '';
  if (isWanted === true || isWanted === false) {
    wantedSql = `isWanted = ${isWanted},`;
  }

  let playedSql = '';
  if (isPlayed === true || isPlayed === false) {
    playedSql = `isPlayed = ${isPlayed},`;
  }

  let favoriteSql = '';
  if (isFavorite === true || isFavorite === false) {
    favoriteSql = `isFavorite = ${isFavorite},`;
  }

  let userRatingSql = '';
  if (userRating >= 0) {
    userRatingSql = `userRating = ${userRating},`;
  }

  let platformSql = '';
  if (!!platform) {
    platformSql = `platform = '${platform}',`;
  }

  const sqlString = `${wantedSql}${playedSql}${favoriteSql}${userRatingSql}${platformSql}`;

  const sql = `
    UPDATE UserGames SET
    ${sqlString.slice(0, -1)}
    WHERE (gameId = ${gameId} AND userId = '${userId}')
  `;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (error) => {
      if (error) { return reject(error); }
      return fulfill(true);
    });
  });
};

export {
  editGameObject,
  createGameObject,
};
