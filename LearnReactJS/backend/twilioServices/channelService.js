/* Channel Services */

exports.getAllChannels = async client => {
  return await client.chat
    .services(process.env.TWILIO_CHAT_SERVICE_SID)
    .channels.list()
    .then(channel => {
      return {
        status: 200,
        message: "All Channels fetched Successfully.",
        data: channel
      };
    })
    .catch(err => {
      return {
        status: 400,
        message: err.message
      };
    });
};

exports.getChannelById = async (client, channelId) => {
  if (channelId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .fetch()
      .then(channel => {
        return {
          status: 200,
          message: "Channel fetched Successfully.",
          data: channel
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

exports.saveChannel = async (client, body) => {
  return await client.chat
    .services(process.env.TWILIO_CHAT_SERVICE_SID)
    .channels.create({
      friendlyName: body.friendlyName,
      uniqueName: body.uniqueName,
      type: body.type,
      createdBy: body.createdBy
    })
    .then(channel => {
      return {
        status: 200,
        message: "Channel Created Successfully.",
        data: channel
      };
    })
    .catch(err => {
      return {
        status: 400,
        message: err.message
      };
    });
};

exports.updateChannelById = async (client, channelId, body) => {
  if (channelId != undefined && channelId.startsWith("CH")) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .update({
        friendlyName: body.friendlyName,
        uniqueName: body.uniqueName
      })
      .then(channel => {
        return {
          status: 200,
          message: "Channel Updated Successfully.",
          data: channel
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

exports.deleteChannelById = async (client, channelId) => {
  if (channelId != undefined && channelId.startsWith("CH")) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .remove()
      .then(channel => {
        return {
          status: 200,
          message: "Channel Deleted Successfully."
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
