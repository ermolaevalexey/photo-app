
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

    this.userInfo = new User();
    this.userView = new UserView({ model: this.userInfo });

    this.listenTo(options.main, "authorized", this.getUserInfo);
    this.listenTo(this.userInfo, "change", this.render);

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
      // passing an event that informs that we got user
      this.trigger("userLoggedIn", user);
    }

  }

  async getUserInfo(id) {

    const info = await AuthController.getUserInfo(id);

    if (info) {
      this.userInfo.set({ user: info });
    }

  }

  render() {

    this.$el.html(AuthTemplate());

    this.userView.$el = this.elementNode;
    this.userView.render();

    return this;

  }

}
