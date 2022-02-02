/* eslint-disable import/no-unresolved */
const boom = require('@hapi/boom');

const { UniqueConstraintError } = require('sequelize');

const clientService = require('./client.service');
const queryOptions = require('../../../utils/queryOptions');
const clientFilters = require('./client.filters');
const logger = require('../../../config/winston');

const listClients = async (req, res, next) => {
  try {
    const filters = clientFilters(req.query);
    const options = queryOptions(req.query);

    res.json(await clientService.getClients(filters, options));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const getClient = async (req, res, next) => {
  const { clientUuid } = req.params;
  console.log(clientUuid);
  try {
    const client = await clientService.getClient(clientUuid);

    if (clientUuid) {
      return res.json(client);
    }
    res.json(await clientService.getClient(req.client));
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }
};

const createClient = async (req, res, next) => {
  const clientData = req.body;

  let client;
  try {
    client = await clientService.createClient(clientData);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return next(boom.badData('Ya existe este cliente'));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.status(201).json(clientService.toPublic(client));
};

const putClient = async (req, res, next) => {
  let { client } = req;
  if (res.locals && res.locals.client) {
    // eslint-disable-next-line prefer-destructuring
    client = res.locals.client;
  }

  const clientData = req.body;
  let response;

  try {
    const clientUuid = client.uuid;
    delete clientData.uuid;
    response = await clientService.putClient(clientUuid, clientData);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return next(boom.badData('Ya existe este cliente'));
    }
    logger.error(`${error}`);
    return next(boom.badData(error.message));
  }

  res.json(clientService.toPublic(response));
};

const deleteClient = async (req, res, next) => {
  const { client } = res.locals;

  try {
    await clientService.deleteClient(client, req.client._id);
  } catch (error) {
    logger.error(`${error}`);
    return next(boom.badImplementation(error.message));
  }

  res.status(200).json('El cliente ha sido borrado correctamente');
};

module.exports = {
  listClients,
  getClient,
  createClient,
  putClient,
  deleteClient,
};
