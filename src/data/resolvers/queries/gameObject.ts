import connection from '../../../index';

const gameObjectGet = (_: any, args: any) => {
  const { userId, gameId } = args;

  const sql = `SELECT * from UserGames WHERE userId = '${userId}' AND gameId = '${gameId}'`;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      return fulfill(rows[0]);
    });
  });
};

const wantedListGet = (_: any, args: any) => {
  const { userId, filter, order, platform } = args;

  let orderStr;
  if (order === 1) {
    orderStr = 'ASC';
  } else {
    orderStr = 'DESC';
  }

  let platformStr = '';
  if (platform) {
    platformStr = `AND platform = '${platform}'`;
  }

  const sql = `SELECT * from UserGames
  WHERE userId = '${userId}' AND isWanted = true ${platformStr} ORDER BY ${filter} ${orderStr}`;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      return fulfill(rows);
    });
  });
};

const playedListGet = (_: any, args: any) => {
  const { userId, filter, order, platform } = args;

  let orderStr;
  if (order === 1) {
    orderStr = 'ASC';
  } else {
    orderStr = 'DESC';
  }

  let platformStr = '';
  if (platform) {
    platformStr = `AND platform = '${platform}'`;
  }

  const sql = `SELECT * from UserGames
  WHERE userId = '${userId}' AND isPlayed = true ${platformStr} ORDER BY ${filter} ${orderStr}`;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      return fulfill(rows);
    });
  });
};

const favoriteListGet = (_: any, args: any) => {
  const { userId, filter, order, platform } = args;

  let orderStr;
  if (order === 1) {
    orderStr = 'ASC';
  } else {
    orderStr = 'DESC';
  }

  let platformStr = '';
  if (platform) {
    platformStr = `AND platform = '${platform}'`;
  }

  const sql = `SELECT * from UserGames
  WHERE userId = '${userId}' AND isFavorite = true ${platformStr} ORDER BY ${filter} ${orderStr}`;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      return fulfill(rows);
    });
  });
};

const listCountGet = (_: any, args: any) => {
  const { userId, listType } = args;

  const sql = `
    SELECT COUNT('${listType}') AS count from UserGames
    WHERE userId = '${userId}' AND ${listType} = 1
  `;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      return fulfill(rows[0].count);
    });
  });
};

const favoritePlatformGet = (_: any, args: any) => {
  const { userId } = args;

  const sql = `
    SELECT platform, COUNT(platform) AS count FROM UserGames
    WHERE platform <> 'NONE' AND userId = '${userId}' AND (isPlayed = 1 OR isWanted = 1 OR isFavorite = 1)
    GROUP BY platform ORDER BY count DESC
  `;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      return fulfill(rows[0] && rows[0].platform);
    });
  });
};

const mostGivenRatingGet = (_: any, args: any) => {
  const { userId } = args;

  const sql = `
    SELECT userRating, COUNT(userRating) AS count FROM UserGames
    WHERE userId = '${userId}' AND userRating > 0 AND (isPlayed = 1 OR isFavorite = 1)
    GROUP BY userRating ORDER BY count DESC
  `;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      return fulfill(rows[0] && rows[0].userRating);
    });
  });
};

const upcomingWantedGames = (_: any, args: any) => {
  const { userId } = args;

  const currentTime = Math.floor(new Date().getTime() / 1000);

  const sql = `
    SELECT gameId from UserGames
    WHERE userId = '${userId}' AND releaseDate > ${currentTime} AND isWanted = true
    ORDER BY releaseDate ASC LIMIT 5
  `;

  return new Promise((fulfill, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      return fulfill(rows);
    });
  });
};

export {
  upcomingWantedGames,
  mostGivenRatingGet,
  listCountGet,
  wantedListGet,
  gameObjectGet,
  favoriteListGet,
  favoritePlatformGet,
  playedListGet,
};
