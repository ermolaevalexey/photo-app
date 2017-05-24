
import Backbone from "backbone";
import PhotoTemplate from "../../templates/photo.hbs";

export default class PhotoView extends Backbone.View {

  constructor(options) {

    super(options);

    this.listenTo(this.model, "change", this.render);

  }

  render() {

    this.$el.html(
      PhotoTemplate(this.model.toJSON())
    );

    return this;

  }

}
