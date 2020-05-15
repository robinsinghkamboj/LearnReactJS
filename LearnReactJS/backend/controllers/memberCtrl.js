/* Member Controller */

const client = require("../authTwilio");
let service = require("../twilioServices/memberService");
let util = require("../util");

exports.GetAllMembers = async (req, res, next) => {
  let response = await service.getAllMembers(client, req.params.channel_id);
  await util.processStatus(response, res);
};

exports.GetMemberById = async (req, res, next) => {
  let response = await service.getMemberById(
    client,
    req.params.channel_id,
    req.params.id
  );
  await util.processStatus(response, res);
};

exports.SaveMember = async (req, res, next) => {
  let response = await service.saveMember(
    client,
    req.body,
    req.params.channel_id
  );
  await util.processStatus(response, res);
};

exports.UpdateMemberById = async (req, res, next) => {
  let response = await service.updateMemberById(
    client,
    req.params.channel_id,
    req.body,
    req.params.id
  );
  await util.processStatus(response, res);
};

exports.DeleteMemberById = async (req, res, next) => {
  let response = await service.deleteMemberById(
    client,
    req.params.channel_id,
    req.params.id
  );
  await util.processStatus(response, res);
};
