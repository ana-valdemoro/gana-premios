import { useMutation } from 'react-query';
import authenticationService from '../../services/authenticationService';

function useUnblockAccount() {
  return useMutation((token) => authenticationService.unblockAccount(token));
}

export default useUnblockAccount;
