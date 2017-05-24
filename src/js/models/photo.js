
import Backbone from "backbone";

export default class Photo extends Backbone.Model {

  get defaults() {

    return {
      image: "http://auto.ferrari.com/en_EN/wp-content/uploads/sites/5/2013/07/Ferrari-FF-front-end-960x540.jpg",
      description: "Cool new car"
    };

  }

}
