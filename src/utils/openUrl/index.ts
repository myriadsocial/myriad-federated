import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const handleContactUs = () => {
  window.location.href = `mailto:${publicRuntimeConfig.myriadSupportMail}`;
};
