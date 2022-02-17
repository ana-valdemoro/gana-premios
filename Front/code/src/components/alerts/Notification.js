import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

export default function Notification(props) {
  const { notify, setNotify } = props;

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={() => setNotify({ isOpen: false, message: notify.message, type: notify.type })}
        sx={{ width: '100%' }}
        severity={notify.type}
      >
        <AlertTitle>{notify.type.toUpperCase()}</AlertTitle>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
Notification.propTypes = {
  notify: PropTypes.object,
  setNotify: PropTypes.func
};
