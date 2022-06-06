import { useMutation } from 'react-query';
import authenticationService from '../../services/authenticationService';

function useActivateAccount() {
  return useMutation((token) => authenticationService.activateAccount(token));
}

export default useActivateAccount;
