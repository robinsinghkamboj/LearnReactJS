/* Member Services */

exports.getAllMembers = async (client, channelId) => {
  if (channelId != undefined && channelId.startsWith("CH")) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .members.list()
      .then(members => {
        return {
          status: 200,
          message: "All Members fetched Successfully.",
          data: members
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
      message: "You entered wrong channel_id. It starts with 'CH'"
    };
  }
};

exports.getMemberById = async (client, channelId, memberId) => {
  if (channelId != undefined && memberId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .members(memberId)
      .fetch()
      .then(member => {
        return {
          status: 200,
          message: "Member fetched Successfully.",
          data: member
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

exports.saveMember = async (client, body, channelId) => {
  if (channelId != undefined && channelId.startsWith("CH")) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .members.create({
        identity: body.identity,
        roleSid: body.roleSid
      })
      .then(member => {
        return {
          status: 200,
          message: "Member Created Successfully.",
          data: member
        };
      })
      .catch(err => {
        console.log(err);

        return {
          status: 400,
          message: err.message
        };
      });
  } else {
    return {
      status: 403,
      message: "You entered wrong channel_id. It starts with 'CH'"
    };
  }
};

exports.updateMemberById = async (client, channelId, body, memberId) => {
  if (channelId != undefined && memberId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .members(memberId)
      .update({
        roleSid: body.roleSid
      })
      .then(member => {
        return {
          status: 200,
          message: "Member Updated Successfully.",
          data: member
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

exports.deleteMemberById = async (client, channelId, memberId) => {
  if (channelId != undefined && memberId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .members(memberId)
      .remove()
      .then(member => {
        return {
          status: 200,
          message: "Member Deleted Successfully."
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
