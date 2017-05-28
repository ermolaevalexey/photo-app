
import Backbone from "backbone";
import PhotoTemplate from "../../templates/photo.hbs";


export default class PhotoView extends Backbone.View {

  constructor(options) {

    super(options);

    this.listenTo(this.model, "change", this.render);

  }

  get events() {

    return {
      "click .album-section__photo__base-info" : "passToDetail"
    };

  }

  passToDetail(e) {

    e.preventDefault();

    // triggering an event and passing the model to
    // render it into detail view
    this.trigger("passedItem", this.model);

  }

  render() {

    this.$el.html(
      PhotoTemplate(this.model.toJSON())
    );

    return this;

  }

}
