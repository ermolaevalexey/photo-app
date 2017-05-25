
const { VK, Promise } = window;

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

}
