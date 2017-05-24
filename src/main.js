
"use strict";

import $ from "jquery";
import Backbone from "backbone";

import MainView from "./js/views/main.view.js";

const rootNode = $("main");

$(() => {

  rootNode.append(
    new MainView().render().$el);

  Backbone.history.start();

});
