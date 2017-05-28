
import Backbone from "backbone";

import Photo from "../models/photo.js";

import PhotoView from "./photo.view.js";
import PhotoDetailView from "./photo.detail.view.js";

export default class PhotoAlbumView extends Backbone.View {

  constructor(options) {
    super(options);

    this.main = options.main;
    this.detailView = new PhotoDetailView({ model: new Photo() });

  }

  get elementNodes() {
    return {
      detailSection: this.main.$("#detailSection")
    };
  }

  // render detail view
  delegateSelected(item) {

    this.detailView.model.set(item.attributes);

    this.detailView.$el = this.elementNodes.detailSection;

    this.detailView.render();

  }

  renderItem(item) {

    const itemView = new PhotoView({ model: item });

    // listening an event from item view,
    // receiving a model from it
    itemView.listenTo(itemView, "passedItem", this.delegateSelected.bind(this));

    this.$el.append(itemView.render().$el);

  }

  render() {

    this.collection.each(
      (item) => this.renderItem(item), this);

    //this.detailView.render();

    return this;

  }


}
