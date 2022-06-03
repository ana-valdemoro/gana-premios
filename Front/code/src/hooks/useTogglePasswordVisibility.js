import { useState } from 'react';
import { IconButton } from '@mui/material';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';

const useTogglePasswordVisibility = () => {
  const [visible, setVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setVisibility(!visible);
  };

  const icon = (
    <IconButton onClick={handlePasswordVisibility} edge="end">
      <Icon icon={visible ? eyeFill : eyeOffFill} />
    </IconButton>
  );

  const inputType = visible ? 'text' : 'password';

  return [inputType, icon];
};

export default useTogglePasswordVisibility;
