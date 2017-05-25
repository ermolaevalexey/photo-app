
const { VK } = window;

import User from "../models/user.js";

export default class AuthController {

  static login() {

    return VK.Auth.login((response) => {

      if (response.session) {

        const { user } = response.session;

        return new User({ user });

      }

      return {
        error: {
          message: new Error("Auth error")
        }
      };

    });

  }

}

