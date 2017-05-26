
import Backbone from "backbone";

import UserTemplate from "../../templates/user.hbs";


export default class UserView extends Backbone.View {

  constructor(options) {

    super(options);

    this.listenTo(this.model, "change", this.render);

  }

  render() {

    this.$el.html(
      UserTemplate(this.model.toJSON())
    );

    return this;
  }

}
