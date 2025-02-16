const env = import.meta.env;

export default {
  ENV: env.NODE_ENV as unknown as 'production' | 'development',
  API_URI: env.VITE_APP_API_URI,
};
