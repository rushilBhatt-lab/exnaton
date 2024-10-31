type Environments = 'development' | 'production';

export const APP_CONFIG = {
  port: parseInt(process.env.PORT, 10) || 3000,

  env: (process.env.NODE_ENV || 'development') as Environments,
};
