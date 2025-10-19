module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: 'votre-serveur-ovh.com',
      ref: 'origin/main',
      repo: 'git@github.com:votre-username/Portfolio.git',
      path: '/var/www/portfolio',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
