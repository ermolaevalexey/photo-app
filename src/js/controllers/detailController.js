
import { isObject } from "underscore";

import config from "../../app.config.json";

const { accessToken, apiVersion } = config;

const { VK, Promise } = window;


export default class DetailController {

  static getDetail(userId, itemId) {

    return new Promise((resolve, reject) => {

      VK.Api.call("wall.getComments",

        { access_token: accessToken, owner_id: userId, post_id: itemId, need_likes: 1, v: apiVersion },

        (res) => {

          if (res.response) {

            if (isObject(res.response)) {

              return resolve(res.response);

            }

            return resolve({});

          }

          return reject({
            error: {
              message: new Error("Error fetching detail info")
            }
          });

        });

    });

  }

}
