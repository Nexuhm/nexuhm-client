module.exports = {
  apps: [
    {
      name: 'nexuhm-client',
      script: './node_modules/.bin/next',
      args: 'start',
      instances: -1,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
};
