
"use strict";

import $ from "jquery";
import Backbone from "backbone";

import MainView from "./js/views/main.view.js";

import { apiId } from "./app.config.json";

const { VK } = window;

const rootNode = $("main");

$(() => {

  VK.init({ apiId });

  rootNode.append(
    new MainView().render().$el);

  Backbone.history.start();

});
