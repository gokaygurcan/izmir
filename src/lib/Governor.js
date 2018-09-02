import path from 'path';
import fs from 'fs';
import Logger from 'lib/Logger'


// Load Environment variables
require('dotenv').config();

export default class Governor {
  constructor() {
    const {
      PLUGIN_PATH,
      PORT
    } = process.env;
    // Initiate the config
    this.config = {
      PREFIX: 'izmir',
      PLUGIN_PATH: path.resolve(process.cwd(), PLUGIN_PATH),
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
    const hasPrefix = str => str.indexOf(this.config.PREFIX) === 0
    const isDirectory = folderName => fs.statSync(path.resolve(`${this.config.PLUGIN_PATH}/${folderName}`)).isDirectory()
    // Check if plugin folder exists
    if (!fs.existsSync(this.config.PLUGIN_PATH)) {
      logger.error(`${this.config.PLUGIN_PATH} does not exist!`)
      return []
    } else {
      const paths = fs
        .readdirSync(this.config.PLUGIN_PATH)
        .filter(folderName => {
          return isDirectory(folderName) && hasPrefix(folderName);
        })
        .map(folderName => {
          return {
            path: path.resolve(`${this.config.PLUGIN_PATH}/${folderName}`),
            name: folderName,
          };
        });
      return paths;
    }

  }
  loadPlugins() {
    logger.log(`Loading plugins`)
    this.getPlugins().forEach(plugin => {
      const p = path.resolve(`${plugin.path}/package.json`);
      if (!fs.existsSync(p)) {
        logger.error(`${plugin.path} does not have a package.json!`)
      } else if (!require(p).main) {
        logger.error(`${plugin.path}/package.json does not have an entry point! 'main'`)
      } else {
        const packageJSON = require(p)
        try {
					// https://nodejs.org/api/modules.html#modules_all_together
          const requirePath = path.resolve(plugin.path)
          require(requirePath)();
        } catch (err) {
          logger.error(`There has been an error trying to load module ${plugin.name} : ${err}`)
          console.log(err)
        }
      }
    })
  }
}
