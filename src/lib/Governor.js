import path from 'path';
import fs from 'fs';

// Load Environment variables
require('dotenv').config();

export default class Governor {
  constructor() {
    const {PLUGIN_PATH, PORT} = process.env;
    // Initiate the config
    this.config = {
      PREFIX: 'izmir',
      PLUGIN_PATH,
      PORT,
    };
  }
  getConfig() {
    return this.config;
  }
  getInfo() {
    console.log(`-------- Governor for Izmir CMS Info --------`);
    console.log(`Plugin prefix : ${this.config.PREFIX}-`)
		console.log(`Plugins folder : ${this.config.PLUGIN_PATH}`)
  }
  getPlugins() {
    const paths = fs
      .readdirSync(this.config.PLUGIN_PATH)
      .filter(pluginDirName => {
        return pluginDirName.indexOf(this.config.PREFIX) === 0;
      })
      .map(pluginDir => {
        return {
          path: path.resolve(`${this.config.PLUGIN_PATH}/${pluginDir}`),
          name: pluginDir,
        };
      });
    return paths;
  }
  loadPlugins() {
    this.getPlugins().forEach(plugin => {
      const p = path.resolve(`${plugin.path}/index.js`);
      if (!fs.existsSync(p)) {
        throw new Error(
          `Module ${plugin.path} does not have index.js as entry file!`,
        );
      } else {
        require(p)();
      }
    });
  }
}
