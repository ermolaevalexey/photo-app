
import moment from "moment";

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

              return resolve(items.map((item) => {

                return {

                  id: item.id,
                  date: moment.unix(item.date)
                    .format("MMMM Do YYYY, h:mm:ss a"),

                  baseImage: item.photo_130,
                  detailImage: item.photo_604,

                  likes: item.likes.count,
                  reposts: item.reposts.count,

                  text: item.text

                };

              }));

            }

            return resolve([]);

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
