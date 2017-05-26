
import Backbone from "backbone";

import Photo from "../models/photo.js";


export default class PhotoAlbum extends Backbone.Collection {

  get model() {
    return Photo;
  }

}
