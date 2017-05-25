
import Backbone from "backbone";

import User from "../models/user.js";
import Photo from "../models/photo.js";
import PhotoAlbum from "../collections/photoAlbum.js";
import PhotoAlbumView from "./photoAlbum.view.js";
import AuthView from "./auth.view.js";

import MainTemplate from "../../templates/main.hbs";

export default class MainView extends Backbone.View {

  constructor(options) {
    super(options);

    this.user = new User();

  }

  get elementNodes() {
    return {
      albumSection: this.$("#albumSection"),
      loginSection: this.$("#loginSection")
    };
  }

  get collection() {
    return new PhotoAlbum([ new Photo(), new Photo(), new Photo() ]);
  }

  render() {

    this.$el.html(MainTemplate());

    new AuthView({
      el: this.elementNodes.loginSection }).render();

    new PhotoAlbumView({
      el: this.elementNodes.albumSection,
      collection: this.collection
    }).render();

    return this;

  }

}
