/* Message Controller */

const client = require("../authTwilio");
let service = require("../twilioServices/messageService");
let util = require("../util");

exports.GetAllMessages = async (req, res, next) => {
  let response = await service.getAllMessages(client, req.params.channel_id);
  await util.processStatus(response, res);
};

exports.GetMessageById = async (req, res, next) => {
  let response = await service.getMessageById(
    client,
    req.params.channel_id,
    req.params.id
  );
  await util.processStatus(response, res);
};

exports.SaveMessage = async (req, res, next) => {
  let response = await service.saveMessage(
    client,
    req.body,
    req.params.channel_id
  );
  await util.processStatus(response, res);
};

exports.UpdateMessageById = async (req, res, next) => {
  let response = await service.updateMessageById(
    client,
    req.params.channel_id,
    req.body,
    req.params.id
  );
  await util.processStatus(response, res);
};

exports.DeleteMessageById = async (req, res, next) => {
  let response = await service.deleteMessageById(
    client,
    req.params.channel_id,
    req.params.id
  );
  await util.processStatus(response, res);
};
