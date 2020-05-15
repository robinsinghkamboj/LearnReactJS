/* Channel Controller */

const client = require("../authTwilio");
let service = require("../twilioServices/channelService");
let util = require("../util");

exports.GetAllChannels = async (req, res, next) => {
  let response = await service.getAllChannels(client);
  await util.processStatus(response, res);
};

exports.GetChannelById = async (req, res, next) => {
  let response = await service.getChannelById(client, req.params.id);
  await util.processStatus(response, res);
};

exports.SaveChannel = async (req, res, next) => {
  let response = await service.saveChannel(client, req.body);
  await util.processStatus(response, res);
};

exports.UpdateChannelById = async (req, res, next) => {
  let response = await service.updateChannelById(
    client,
    req.params.id,
    req.body
  );
  await util.processStatus(response, res);
};

exports.DeleteChannelById = async (req, res, next) => {
  let response = await service.deleteChannelById(client, req.params.id);
  await util.processStatus(response, res);
};
