
import Backbone from "backbone";
import { bindAll } from "underscore";

import User from "../models/user.js";
import UserView from "./user.view.js";

import AuthTemplate from "../../templates/auth.hbs";
import AuthController from "../controllers/authController.js";


export default class AuthView extends Backbone.View {

  constructor(options) {

    super(options);

    bindAll(this, "loginUser");

    this.user = new User();

    this.userView = new UserView({ model: this.user });

    this.listenTo(this.user, "change", this.render);

  }

  get events() {

    return {
      "click #login": "loginUser"
    };

  }

  get elementNode() {
    return this.$("#userContainer");
  }

  async loginUser() {

    const user = await AuthController.login();

    if (user) {
      this.user.set({ user });
      this.trigger("userLoggedIn");
    }

  }

  render() {

    this.$el.html(AuthTemplate());

    this.userView.$el = this.elementNode;
    this.userView.render();

    return this;

  }

}
