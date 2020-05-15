/* Role Services */

exports.getAllRoles = async client => {
  return await client.chat
    .services(process.env.TWILIO_CHAT_SERVICE_SID)
    .roles.list()
    .then(roles => {
      return {
        status: 200,
        message: "All Roles fetched Successfully.",
        data: roles
      };
    })
    .catch(err => {
      return {
        status: 400,
        message: err.message
      };
    });
};

exports.getRoleById = async (client, roleId) => {
  if (roleId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .roles(roleId)
      .fetch()
      .then(role => {
        return {
          status: 200,
          message: "Role fetched Successfully.",
          data: role
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

exports.saveRole = async (client, body) => {
  try {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .roles.create({
        friendlyName: body.friendlyName,
        type: body.type,
        permission: body.permission
      })
      .then(role => {
        return {
          status: 200,
          message: "Role Created Successfully.",
          data: role
        };
      })
      .catch(err => {
        return {
          status: 400,
          message: err.message
        };
      });
  } catch (error) {
    return {
      status: 400,
      message: error.message
    };
  }
};

exports.updateRoleById = async (client, roleId, body) => {
  try {
    if (roleId != undefined) {
      return await client.chat
        .services(process.env.TWILIO_CHAT_SERVICE_SID)
        .roles(roleId)
        .update({
          permission: body.permission
        })
        .then(role => {
          return {
            status: 200,
            message: "Role Updated Successfully.",
            data: role
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
  } catch (error) {
    return {
      status: 400,
      message: error.message
    };
  }
};

exports.deleteRoleById = async (client, roleId) => {
  if (roleId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .roles(roleId)
      .remove()
      .then(role => {
        return {
          status: 200,
          message: "Role Deleted Successfully."
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
