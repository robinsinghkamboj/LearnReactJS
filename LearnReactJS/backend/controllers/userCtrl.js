/* User Controller */

const client = require("../authTwilio");
let service = require("../twilioServices/userService");
let util = require("../util");

exports.GetAllUsers = async (req, res, next) => {
  let response = await service.getAllUsers(client);
  await util.processStatus(response, res);
};

exports.GetUserById = async (req, res, next) => {
  let response = await service.getUserById(client, req.params.id);
  await util.processStatus(response, res);
};

exports.SaveUser = async (req, res, next) => {
  let response = await service.saveUser(client, req.body);
  await util.processStatus(response, res);
};

exports.UpdateUserById = async (req, res, next) => {
  let response = await service.updateUserById(
    client,
    req.params.id,
    req.body
  );
  await util.processStatus(response, res);
};

exports.DeleteUserById = async (req, res, next) => {
  let response = await service.deleteUserById(client, req.params.id);
  await util.processStatus(response, res);
};
