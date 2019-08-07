const fs = require('fs');
const path = require('path');
const { filter, findIndex, each } = require('lodash');

const DB = path.join(__dirname, 'db.json');

function saveToFile (todos) {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB, JSON.stringify(todos), 'utf8', (error) => {
      if (!error) {
          resolve(todos);
      } else {
          reject(error);
      }
    });
  })
} 

function getAllStuff () {
    return new Promise((resolve, reject) => {
        fs.readFile(DB, 'utf8', (error, data) => {
            if (!error && data) {
                resolve(JSON.parse(data))
            } else {
                reject(error);
            }
        });
    })
}

function removeItem (id) {
  return getAllStuff()
    .then((data) => {
      const todos = filter(data, (item) => (
        item.id !== id
      ))
      return saveToFile(todos);
    })
}

function updateItem (options) {
  const { id } = options;
  const KEYS = Object.keys(options);
  return getAllStuff()
    .then((data) => {
      const todos = [...data];
      const index = findIndex(todos, { id });
      each(KEYS, (key) => {
        todos[index][key] = options[key];
      });
      return saveToFile(todos);
    });
}

module.exports = {
  saveToFile,
  getAllStuff,
  removeItem,
  updateItem,
};
