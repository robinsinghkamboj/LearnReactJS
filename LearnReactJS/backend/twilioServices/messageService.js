/* Message Services */

exports.getAllMessages = async (client, channelId) => {
  if (channelId != undefined && channelId.startsWith("CH")) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .messages.list()
      .then(messages => {
        return {
          status: 200,
          message: "All Messages fetched Successfully.",
          data: messages
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

exports.getMessageById = async (client, channelId, messageId) => {
  if (channelId != undefined && messageId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .messages(messageId)
      .fetch()
      .then(message => {
        return {
          status: 200,
          message: "Message fetched Successfully.",
          data: message
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

exports.saveMessage = async (client, body, channelId) => {
  if (channelId != undefined && channelId.startsWith("CH")) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .messages.create({
        from: body.from,
        body: body.message
      })
      .then(message => {
        return {
          status: 200,
          message: "Message Created Successfully.",
          data: message
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

exports.updateMessageById = async (client, channelId, body, messageId) => {
  if (channelId != undefined && messageId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .messages(messageId)
      .update({
        lastUpdatedBy: body.lastUpdatedBy,
        wasEdited: true,
        from: body.from,
        body: body.message
      })
      .then(message => {
        return {
          status: 200,
          message: "Message Updated Successfully.",
          data: message
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

exports.deleteMessageById = async (client, channelId, messageId) => {
  if (channelId != undefined && messageId != undefined) {
    return await client.chat
      .services(process.env.TWILIO_CHAT_SERVICE_SID)
      .channels(channelId)
      .messages(messageId)
      .remove()
      .then(message => {
        return {
          status: 200,
          message: "Message Deleted Successfully."
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
