"use strict";

let Page = function(name, features) {
  let self = {
    name: name,
    features: features,
    pageInfo: [],
    handlers: {}
  };

  function addElement(type, value) {
    let elemInfo = {
      type: type,
      value: value,
      itemID: "elem" + self.pageInfo.length,
      children: []
    };

    self.handlers[elemInfo.itemID] = {};

    self.pageInfo.push(elemInfo);

    return new Element(elemInfo);
  }

  function getName() {
    return self.name;
  }

  function getFeatures() {
    return self.features;
  }

  function toJSON() {
    return self.pageInfo;
  }

  function getEventHandlers() {
    return self.handlers;
  }

  function executeEvent(eventInfo) {
    self.handlers[eventInfo.itemID][eventInfo.type].func(eventInfo.args);
  }

  let Element = function(elemInfo) {
    let elem = {
      info: elemInfo,
      addEventHandler,
      addChildElement
    };

    function addEventHandler (event, requestedParams, callback) {
      self.handlers[elemInfo.itemID][event] = {
        params: requestedParams,
        func: callback
      };

      return elem;
    }

    function addChildElement (type, value) {
      elem.info.children.push({
        type: type,
        value: value
      });

      return elem;
    }

    return elem;
  }

  return {
    addElement,
    toJSON,
    getName,
    getFeatures,
    getEventHandlers,
    executeEvent
  };
};
