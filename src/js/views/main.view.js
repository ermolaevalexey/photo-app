
import Backbone from "backbone";

import Photo from "../models/photo.js";
import PhotoAlbum from "../collections/photoAlbum.js";
import PhotoAlbumView from "./photoAlbum.view.js";
import MainTemplate from "../../templates/main.hbs";

export default class MainView extends Backbone.View {

  constructor(options) {
    super(options);
  }

  get elementNode() {
    return this.$("#albumList");
  }

  get collection() {
    return new PhotoAlbum([ new Photo(), new Photo(), new Photo() ]);
  }

  render() {

    this.$el.html(MainTemplate());

    new PhotoAlbumView({
      el: this.elementNode, collection: this.collection
    }).render();

    return this;

  }

}
