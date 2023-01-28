"use strict";

//this file is compiled by gulp-babel from /src/js/custom.js for IE11 compatibility
(function () {
  // Generate additional links to service pages in admin (content editor)
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      //dom renders too slow here
      var editor = document.getElementById("editor"); // link to the manual

      var manualLink = document.createElement('a');
      manualLink.appendChild(document.createTextNode("How to Edit This Site"));
      manualLink.href = "https://pplsa.studio.pro/bin/view/00.Common/studio.pro";
      manualLink.className = "manual-link"; //styled in backend.css

      manualLink.target = "_blank";
      editor.appendChild(manualLink); // link to the list of templates

      var templLink = document.createElement('a');
      templLink.appendChild(document.createTextNode("Templates list"));
      templLink.href = "/template-stats";
      templLink.className = "templ-link";
      templLink.target = "_blank";
      editor.appendChild(templLink);
    }, 1500);
  }); //DOMContentLoaded
})();