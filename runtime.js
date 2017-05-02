"use strict";

let Runtime = (function() {

  function createPage(page, appID) {
    let pageAddress = "about:blank";
    let pageName = page.getName();
    let pageSettings = page.getFeatures();

    let newWindow = window.open(
      pageAddress,
      pageName,
      pageSettings
    );

    let pageElements = page.toJSON();

    for (let element of pageElements) {
      let newEl = addElementToWindow(newWindow, element);
      addEventHandlersToElement(newEl, page, element.itemID, appID);
    }

    return newWindow;
  }

  function addElementToWindow(wind, elementInfo) {
    return createElement(wind, elementInfo);
  }

  function addEventHandlersToElement(element, page, itemID, appID) {
    let itemEventHandlers = page.getEventHandlers()[itemID];

    for (let eventType of Object.keys(itemEventHandlers)) {

      element[eventType] = function() {
        let handlerArg = {};

        for (let param of itemEventHandlers[eventType].params) {
          handlerArg[param] = this[param];
        }

        let eventInfo = {
          appID,
          itemID,
          type: eventType,
          args: handlerArg
        };

        // display on original page
        let ev = document.createElement('p');
        ev.innerHTML = JSON.stringify(eventInfo);
        document.getElementById('events').appendChild(ev);

        // send eventInfo through WS to the application
        page.executeEvent(eventInfo);
      }
    }
  }

  function createElement(wind, elementInfo) {
    let newEl = wind.document.createElement(elementInfo.type);

    if (elementInfo.value) {
      newEl.innerHTML = elementInfo.value;
    }


    wind.document.body.appendChild(newEl);

    // support for one level of children
    if (elementInfo.children.length > 0) {
      for (let child of elementInfo.children) {
        let childEl = wind.document.createElement(child.type);

        if (child.value) {
          childEl.innerHTML = child.value;
        }

        newEl.appendChild(childEl);
      }
    }

    return newEl;
  }

  return createPage;
})();
