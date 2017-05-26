
import { isObject } from "underscore";

import config from "../../app.config.json";

const { accessToken, apiVersion } = config;

const { VK, Promise } = window;


export default class CollectionController {

  static getCollection(userId) {

    return new Promise((resolve, reject) => {

      VK.Api.call("photos.getAll",

        { access_token: accessToken, owner_id: userId, scope: "photos", count: 100, extended: 1, v: apiVersion },

        (res) => {

          if (res.response) {

            if (isObject(res.response)) {

              const { items } = res.response;
              console.log(items);

              return resolve(items);

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
