// This file is part of YouTube Only Music.
//
// YouTube Only Music is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
//
// YouTube Only Music is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along with YouTube Only Music. If not, see <https://www.gnu.org/licenses/>.
// Copyright 2022 Kaneko Qt

var inject = function () {
  const proxied = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.indexOf("mime=audio") !== -1) {
      var video = document.querySelector("video");
      video.onloadeddata = function () {
        var sections = url.split('?');
        if (sections.length > 1) {
          var keys = ['rn', 'rbuf', 'range'];
          var parameters = sections[1].split(/[&;]/g);
          keys.forEach(k => { parameters = parameters.filter((p) => !p.startsWith(encodeURIComponent(k) + '=')) });
          url = sections[0] + '?' + parameters.join('&');
          if (video.src !== url) {
            video.pause();
            video.src = url;
            video.currentTime = 0;
            video.play();
          }
        }
      };
    }
    return proxied.apply(this, arguments);
  };
};
/*  */
var script = document.createElement("script");
script.textContent = "(" + inject + ")()";
document.documentElement.appendChild(script);