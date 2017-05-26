
import Backbone from "backbone";


export default class Router extends Backbone.Router {

  constructor(options) {

    super(options);

  }

  get routes() {

    return {
      "photos/:id": "getDetail"
    };

  }

  getDetail(query, page) {
    console.log(query);
    console.log(page);
  }

}
