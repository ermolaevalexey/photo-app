
import Backbone from "backbone";


export default class Router extends Backbone.Router {

  constructor(options) {

    super(options);

  }

  get routes() {

    return {
      "photos/:id": "photos"
    };

  }

}
