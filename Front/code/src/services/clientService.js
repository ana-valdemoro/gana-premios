import { postRequest } from '../utils/http';

export const createClient = async (clientData) => postRequest(`/clients`, clientData);

export default { createClient };
