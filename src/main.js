
"use strict";

import "./resources.js";

import $ from "jquery";
import moment from "moment";

import Backbone from "backbone";

import MainView from "./js/views/main.view.js";
import Router from "./js/controllers/router.js";

import { apiId } from "./app.config.json";

const { VK } = window;

const rootNode = $("main");


$(() => {

  moment.locale("ru");

  VK.init({ apiId });

  const mainView = new MainView();

  rootNode.append(
    mainView.render().$el);

  const router = new Router();

  router.on("route:photos", (id) => console.log(`${id} from main router`));

  Backbone.history.start({ pushState: true });

});
