export default {
  ENV: process.env.NODE_ENV as unknown as 'production' | 'development',
  TCS_URI: process.env.REACT_APP_TCS_URI,
};
