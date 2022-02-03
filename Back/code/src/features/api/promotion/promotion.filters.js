module.exports = (params) => {
  const query = {};

  if (params.campaign) {
    query.campaign_uuid = params.campaign;
  }

  query.deleted = false;

  return query;
};
