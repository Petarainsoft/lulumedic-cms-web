const env = import.meta.env;

export default {
  ENV: env.VITE_NODE_ENV as unknown as 'production' | 'development' | 'local',
  API_URI: env.VITE_APP_API_URI,
};
