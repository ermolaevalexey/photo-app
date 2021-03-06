
import $ from "jquery";

import Backbone from "backbone";

import AuthView from "./auth.view.js";

import CollectionController from "../controllers/collectionController.js";

import Photo from "../models/photo.js";
import PhotoAlbum from "../collections/photoAlbum.js";
import PhotoAlbumView from "./photoAlbum.view.js";

import PhotoDetailView from "./photo.detail.view.js";

import MainTemplate from "../../templates/main.hbs";

import { reduceHeight } from "../dom";

export default class MainView extends Backbone.View {

  constructor(options) {

    super(options);

    this.authView = new AuthView({ main: this });

    this.album = new PhotoAlbum([]);

    this.albumView = new PhotoAlbumView({ main: this });

    this.detailView = new PhotoDetailView({ model: new Photo()});

    // listening when user logged in
    this.listenTo(this.authView, "userLoggedIn", this.authorizeCollection);

    this.listenTo(this.album, "add", this.render);

  }

  get elementNodes() {
    return {
      loginSection: this.$("#loginSection"),
      albumSection: this.$("#albumSection")
    };
  }

  async getCollection(id) {

    const data = await CollectionController.getCollection(id);

    if (data) {
      this.album.set(data);
    }

  }

  authorizeCollection(eventUser) {

    const user = eventUser;

    if (user) {

      // passing an event to get extended user info
      // to display it
      this.trigger("authorized", user.id);

      // user authorized - we get collection
      this.getCollection(user.id)

        .then((coll) => {

          this.album.set(coll);

        })
        .catch((error) => console.error(error));
    }

  }

  render() {

    this.$el.html(MainTemplate());

    this.authView.$el = this.elementNodes.loginSection;

    this.authView.render();
    this.authView.delegateEvents();

    this.albumView.$el = this.elementNodes.albumSection;
    this.albumView.collection = this.album;

    this.albumView.render();

    this.detailView.render();

    $(window).on("resize", () => {
      reduceHeight(this.$el, this.elementNodes.albumSection,
        this.elementNodes.loginSection);
    }).resize();

    return this;

  }

}
