module.exports = {
  apps: [
    {
      name: "NavigationBar",
      script: "./server/index.js"
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-18-216-43-36.us-east-2.compute.amazonaws.com",
      key: "~/.ssh/sdcDesc1.pem",
      ref: "origin/master",
      repo: "https://github.com/most-amaziin/NavigationBar.git",
      path: "/home/ubuntu/NavigationBar",
      "post-deploy":
        "npm install && npm run build-one && pm2 startOrRestart ecosystem.config.js"
    }
  }
};
