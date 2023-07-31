const { Videogame, Platform, Developers, Genre, Users, Carrito, Stat } = require("../db.js");
const { Op } = require('sequelize');

const findVideogameByStatus = async (gameStatus) => {
    try {
        const videogames = await Videogame.findAll({
            where: {
              status: gameStatus,
            }
        });
        return videogames;
    } catch (error) {
        throw new Error(error);
    };
}; 

const findVideogamesBySeller = async (sellerId) => {
    try {
        const videogames = await Videogame.findAll({
            where: {
              userId: sellerId
            }
          });
          return videogames;
    } catch (error) {
        throw new Error(error);
    };
}

const findAllVideogames = async () => {
    try {
        const videogames = await Videogame.findAll();
        return videogames;
    } catch (error) {
        throw new Error(error);
    };
};

const findGameById = async (videogameId) => {
    try {
        console.log(videogameId);
        const videogame = await await Videogame.findOne({
            where: {
              id: videogameId,
            },
            include: [
              {
                model: Genre,
                attributes: ['genreName'],
                through: {
                  attributes: [],
                },
              },
              {
                model: Platform,
                attributes: ['platformName'],
                through: {
                  attributes: [],
                },
              },
              {
                model: Developers,
                attributes: ['id', 'name'],
              },
            ],
          });
        return videogame;
    } catch (error) {
        throw new Error(error);
    };
};

const findUserById = async(id) => {
  const UserById = await Users.findByPk(id, {
    include : [
        {model : Carrito},
        {model : Videogame, through: {attributes:[]}}
    ]
  });
  if(UserById) return UserById;
  return { message: `user not found` };
};

const findUserByStatus = async (userStatus) => {
  const users = await Users.findAll({
    where: {
      isActive: userStatus
    },
    // include: [
    //   { model: Carrito },
    //   { model: Videogame, through: { attributes: [] } }
    // ]
  });

  if(users) return users;
  return { message: `no hay usuarios`};
};

const findUserByRole = async (userRole) => {
  const users = await Users.findAll({
    where: {
      role: userRole
    },
    // include: [
    //   { model: Carrito },
    //   { model: Videogame, through: { attributes: [] } }
    // ]
  });

  if(users) return users;
  return { message: `no hay usuarios`};
};

const userStats = async () => {
  try {
    const totalUsers = await Users.count();
    const totalVendors = await Users.count({ where: { role: 'vendedor' } });
    const totalClients = await Users.count({ where: { role: 'cliente' } });
    const activeUsers = await Users.count({ where: { isActive: true } });
    const inactiveUsers = await Users.count({ where: { isActive: false } });

    const stats = {
      totalUsers,
      totalVendors,
      totalClients,
      activeUsers,
      inactiveUsers,
    };

    const userData = await Users.findAll({
      attributes: ['createdAt'], // Include the createdAt attribute
    });

    const createdDates = userData.map((user) => user.createdAt); // Extract the createdAt values

    return { ...stats , createdDates };
  } catch (error) {
    throw new Error('Error retrieving user statistics');
  }
};

const videogameStats = async () => {
  const overallStats = await Stat.findOne({
    attributes: [
      [Stat.sequelize.fn('SUM', Stat.sequelize.col('favorites')), 'totalFavorites'],
      [Stat.sequelize.fn('SUM', Stat.sequelize.col('unfavorites')), 'totalUnfavorites'],
      [Stat.sequelize.fn('SUM', Stat.sequelize.col('click')), 'totalClicks'],
      [Stat.sequelize.fn('SUM', Stat.sequelize.col('revenue')), 'totalRevenue'],
      [Stat.sequelize.fn('SUM', Stat.sequelize.col('totalReviews')), 'totalReviews'],
      [Stat.sequelize.fn('SUM', Stat.sequelize.col('copiesSold')), 'totalCopiesSold'],
    ],
    raw: true,
  });

  const totalVideogames = await Videogame.count();
  pendingVideogames = await Videogame.count({where: { status: 'pendingApproval' }} );
  activeVideogames = await Videogame.count( {where: { status: 'active' }});
  inactiveVideogames = await Videogame.count( {where: { status: 'inactive' }});
  bannedVideogames = await Videogame.count( {where: { status: 'banned' }});
  
  const videogameData = await Videogame.findAll({
    attributes: ['createdAt'], // Include the createdAt attribute
  });
  const createdDates = videogameData.map((videogame) => videogame.createdAt);

  return { 
    ...overallStats, 
    totalVideogames,
    pendingVideogames,
    activeVideogames,
    inactiveVideogames,
    bannedVideogames,
    createdDates
  };
};

module.exports = { 
    findVideogameByStatus,
    findVideogamesBySeller,
    findAllVideogames,
    findGameById,
    findUserById,
    findUserByRole,
    findUserByStatus,
    userStats,
    videogameStats
  }
