
import Backbone from "backbone";
import { bindAll } from "underscore";

import AuthController from "../controllers/authController.js";

import AuthTemplate from "../../templates/auth.hbs";

export default class AuthView extends Backbone.View {

  constructor(options) {

    super(options);

    bindAll(this, "loginUser");

  }

  get events() {

    return {
      "click #login": "loginUser"
    };

  }

  loginUser() {
    return AuthController.login();
  }

  render() {

    this.$el.html(AuthTemplate());

  }

}
