import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import Recaptcha from 'react-recaptcha';

export default function Captcha(props) {
  const { setFieldValue, mustReset } = props;
  const captchaRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (mustReset) {
      setFieldValue('recaptcha', '');
      captchaRef.current.reset();
    }
  }, [mustReset, setFieldValue]);

  return (
    <Recaptcha
      ref={captchaRef}
      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      render="explicit"
      theme="light"
      verifyCallback={(response) => {
        console.log('Obtenemos captch');
        setFieldValue('recaptcha', response);
      }}
      onloadCallback={() => {
        console.log('done loading!');
      }}
    />
  );
}

Captcha.propTypes = {
  setFieldValue: PropTypes.func,
  mustReset: PropTypes.bool
};
