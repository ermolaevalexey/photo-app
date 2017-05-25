
import Backbone from "backbone";

import PhotoView from "../views/photo.view.js";

export default class PhotoAlbumView extends Backbone.View {

  constructor(options) {
    super(options);
  }

  renderItem(item) {

    this.$el.append(
      new PhotoView({ model: item }).render().$el);

  }

  render() {

    this.collection.each(
      (item) => this.renderItem(item), this);

    return this;

  }


}
