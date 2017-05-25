
import Backbone from "backbone";
import { bindAll } from "underscore";

import { authController } from "../controllers/authController.js";

import AuthTemplate from "../../templates/auth.hbs";

export default class AuthView extends Backbone.View {

  constructor(options) {

    super(options);

    bindAll(this, "authUser");

  }

  get events() {

    return {
      "click #login": "authUser"
    };

  }

  authUser() {
    return authController.call();
  }

  render() {

    this.$el.html(AuthTemplate());

  }

}
