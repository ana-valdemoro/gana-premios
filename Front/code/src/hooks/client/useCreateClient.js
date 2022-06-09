import { useMutation } from 'react-query';
import { createClient } from '../../services/clientService';

function useCreateClient() {
  return useMutation((clientData) => createClient(clientData));
}

export default useCreateClient;
