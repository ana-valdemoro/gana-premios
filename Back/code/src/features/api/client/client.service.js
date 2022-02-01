/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require('uuid');

const { Client } = require('../../../models/index');

// const logger = require('../../../config/winston');

// const toPublic = (client) => client.toJSON();

const getClients = async (filters, options) =>
  Client.find({ where: filters, client: options.client });

const getClient = async (uuid) => Client.findOne({ uuid });

const createClient = async (data) => {
  const dataToCreate = { ...data, uuid: uuidv4() };
  return Client.create(dataToCreate);
};

const putClient = async (uuid, data) => {
  const client = await getClient(uuid);
  return client.save(data);
};

const deleteClient = async (client) => client.remove();

module.exports = {
  // toPublic,
  getClients,
  getClient,
  createClient,
  putClient,
  deleteClient,
};
