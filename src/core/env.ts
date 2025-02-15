export default {
  ENV: process.env.NODE_ENV as unknown as 'production' | 'development',
  TCS_URI: process.env.VITE_APP_API_URI,
};
