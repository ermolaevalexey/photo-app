
"use strict";

import $ from "jquery";
import Backbone from "backbone";

import MainView from "./js/views/main.view.js";

import { apiId } from "./app.config.json";

const { VK } = window;

const rootNode = $("main");


$(() => {

  VK.init({ apiId });

  const mainView = new MainView();

  rootNode.append(
    mainView.render().$el);

  Backbone.history.start();

});
