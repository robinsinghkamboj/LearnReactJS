/* Role Controller */

const client = require("../authTwilio");
let service = require("../twilioServices/roleService");
let util = require("../util");

exports.GetAllRoles = async (req, res, next) => {
  let response = await service.getAllRoles(client);
  await util.processStatus(response, res);
};

exports.GetRoleById = async (req, res, next) => {
  let response = await service.getRoleById(client, req.params.id);
  await util.processStatus(response, res);
};

exports.SaveRole = async (req, res, next) => {
  let response = await service.saveRole(client, req.body);
  await util.processStatus(response, res);
};

exports.UpdateRoleById = async (req, res, next) => {
  let response = await service.updateRoleById(
    client,
    req.params.id,
    req.body
  );
  await util.processStatus(response, res);
};

exports.DeleteRoleById = async (req, res, next) => {
  let response = await service.deleteRoleById(client, req.params.id);
  await util.processStatus(response, res);
};
