function getUserInfo(user){

      if (!user || !user.id) {
    throw new Error("Usuario no válido en el token");
      }
    return{
        username: user.username,
        name: user.name,
        id: user.id,
    }
}

module.exports = getUserInfo;