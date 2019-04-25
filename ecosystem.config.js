module.exports = {
  apps: [
    {
      name: "navBar",
      script: "./server/index.js"
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-18-188-224-91.us-east-2.compute.amazonaws.com/",
      key: "~/.ssh/sdcDesc1.pem",
      ref: "origin/master",
      repo: "https://github.com/threetexansandacanadian/NavBar.git",
      path: "/home/ubuntu/navBar",
      "post-deploy":
        "npm install && npm run build-one && pm2 startOrRestart ecosystem.config.js"
    }
  }
};
