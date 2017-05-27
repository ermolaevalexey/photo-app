
import config from "../../app.config.json";

const { VK, Promise } = window;
const { accessToken, apiVersion } = config;

export default class AuthController {

  static login() {

    return new Promise((resolve, reject) => {

      VK.Auth.login((response) => {

        if (response.session) return resolve(response.session.user);

        return reject({
          error: {
            message: new Error("Auth error")
          }
        });

      });

    });

  }

  static getUserInfo(userId) {

    return new Promise((resolve, reject) => {

      VK.Api.call("users.get",

        { access_token: accessToken, user_ids: `${userId}`, fields: "has_photo,photo_200_orig,city", v: apiVersion },

        (res) => {

          if (res.response) {

            const foundUser = res.response.find(
              (item) => item.id === parseInt(userId));

            return resolve({
              id: foundUser.id,
              firstName: foundUser.first_name,
              lastName: foundUser.last_name,
              avatar: foundUser.has_photo > 0 ? foundUser.photo_200_orig : "",
              city: foundUser.city
            });

          }

          return reject({
            error: {
              message: new Error("Fetch user error")
            }
          });

        });

    });

  }

}
