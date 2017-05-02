"use strict";

let children = [];
let appID = "app_0";

let page = new Page(
  "Test Page",
  "menubar=no,location=yes,resizable=no,scrollbars=yes,status=yes,height=500,width=500,left=0,top=0"
);

page.addElement("h1", "Header1")
  .addEventHandler("onclick", [],
    function() {
      console.log("h1 clicked");
    });

page.addElement("h3", "Header3");
page.addElement("p", "Paragraph1");

page.addElement("input")
  .addEventHandler("onchange", ["value"],
    function(data) {
      console.log(data.value);
    });

page.addElement("br");
page.addElement("br");

page.addElement("button", "Click Me!")
  .addEventHandler("onclick", [],
    function() {
      console.log("Button clicked!");
    });

page.addElement("br");
page.addElement("br");

page.addElement("select")
  .addEventHandler("onchange", ["value"],
    function(data) {
      console.log(data.value);
    })
  .addChildElement("option", "Option 1")
  .addChildElement("option", "Option 2")
  .addChildElement("option", "Option 3");

function spawn() {
  let newWindow = Runtime(page, appID);

  children.push(newWindow);
}

function despawnAll() {
  for (let wind of children) {
    console.log(wind);
    wind.close();
  }
}
