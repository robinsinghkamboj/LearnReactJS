/* User Services */

exports.getAllUsers = async client => {
  return await client.chat
    .services(process.env.TWILIO_CHAT_SERVICE_SID)
    .users.list()
    .then(user => {
      return {
        status: 200,
        message: "All Users fetched Successfully.",
        data: user
      };
    })
    .catch(err => {
      return {
        status: 400,
        message: err.message
      };
    });
};

exports.getUserById = async (client, userId) => {
  if (userId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .users(userId)
      .fetch()
      .then(user => {
        return {
          status: 200,
          message: "User fetched Successfully.",
          data: user
        };
      })
      .catch(err => {
        return {
          status: 400,
          message: err.message
        };
      });
  } else {
    return {
      status: 403,
      message: "Params are missing.."
    };
  }
};

exports.saveUser = async (client, body) => {
  return await client.chat
    .services(process.env.TWILIO_CHAT_SERVICE_SID)
    .users.create({
      identity: body.identity,
      roleSid: body.roleSid,
      friendlyName: body.friendlyName
    })
    .then(user => {
      return {
        status: 200,
        message: "User Created Successfully.",
        data: user
      };
    })
    .catch(err => {
      return {
        status: 400,
        message: err.message
      };
    });
};

exports.updateUserById = async (client, userId, body) => {
  if (userId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .users(userId)
      .update({
        roleSid: body.roleSid,
        friendlyName: body.friendlyName
      })
      .then(user => {
        return {
          status: 200,
          message: "User Updated Successfully.",
          data: user
        };
      })
      .catch(err => {
        return {
          status: 400,
          message: err.message
        };
      });
  } else {
    return {
      status: 403,
      message: "Params are missing."
    };
  }
};

exports.deleteUserById = async (client, userId) => {
  if (userId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .users(userId)
      .remove()
      .then(user => {
        return {
          status: 200,
          message: "User Deleted Successfully."
        };
      })
      .catch(err => {
        return {
          status: 400,
          message: err.message
        };
      });
  } else {
    return {
      status: 403,
      message: "Params are missing."
    };
  }
};
