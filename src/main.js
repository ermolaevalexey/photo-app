
"use strict";

import "./resources.js";

import $ from "jquery";
import moment from "moment";

import Backbone from "backbone";

import MainView from "./js/views/main.view.js";

import { apiId } from "./app.config.json";

const { VK } = window;

const rootNode = $("main");


$(() => {

  moment.locale("ru");

  VK.init({ apiId });

  const mainView = new MainView();

  rootNode.append(
    mainView.render().$el);

  Backbone.history.start({ pushState: true });

});
