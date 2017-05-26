
const { VK, Promise } = window;

import config from "../../app.config.json";

const { accessToken } = config;


export default class CollectionController {

  static getCollection(id) {

    return new Promise((resolve, reject) => {

      VK.Api.call("photos.getAll",

        { access_token: accessToken, owner_id: id, scope: "photos", count: 1000 },

        (res) => {

          if (res.response) {

            if (Array.isArray(res.response)) {
              return resolve(res.response.slice(1, -1));
            }

            return [];

          }

          return reject({
            error: {
              message: new Error("Photos loading failed")
            }

          });

        });

    });

  }

}
