import { useMutation } from 'react-query';
import { forgotPassword } from '../../services/authenticationService';

function useForgotPassword() {
  return useMutation(({ email }) => forgotPassword(email));
}

export default useForgotPassword;
