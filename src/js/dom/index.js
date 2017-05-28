
import $ from "jquery";

export function reduceHeight(parentNode, targetNode, differenceNode) {

  $(targetNode).css("max-height",
    ($(parentNode).height() - $(differenceNode).height()));

}
