
import Backbone from "backbone";

import AuthView from "./auth.view.js";

import CollectionController from "../controllers/collectionController.js";

import PhotoAlbum from "../collections/photoAlbum.js";
import PhotoAlbumView from "./photoAlbum.view.js";

import MainTemplate from "../../templates/main.hbs";


export default class MainView extends Backbone.View {

  constructor(options) {

    super(options);

    this.authView = new AuthView();

    this.album = new PhotoAlbum([]);
    this.albumView = new PhotoAlbumView();

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

  authorizeCollection() {

    const user = this.authView.user;

    if (user) {

      this.getCollection(user.get("user").id)

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

    return this;

  }

}
