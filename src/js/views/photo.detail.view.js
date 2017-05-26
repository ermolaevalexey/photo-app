
import Backbone from "backbone";

import PhotoDetailTemplate from "../../templates/photo.detail.hbs";


export default class PhotoDetailView extends Backbone.View {

  constructor(options) {

    super(options);

    this.listenTo(this.model, "change", this.render);

  }

  render() {

    this.$el.html(
      PhotoDetailTemplate(this.model.toJSON())
    );

    return this;

  }

}
