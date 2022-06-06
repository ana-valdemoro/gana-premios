import { useMutation } from 'react-query';
import { recoverPassword } from '../../services/authenticationService';

function useRecoveryPassword() {
  return useMutation((recoveryRequest) => recoverPassword(recoveryRequest));
}

export default useRecoveryPassword;
