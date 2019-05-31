/*
 * pikachu.js
 * Embed this script on any web page, then type "pikachu" on your keyboard
 * to unleash some lightning.
 *
 * All rights and trademarks for "Pikachu" belong to Nintendo, Inc.
 */
(function(window){

  //type 'hi'
  function hi () {
  "use strict";
    // type 'hi' on your keyboard
    var key = [32];
    var ck = 0;
    var max = key.length;

    var hi = function() {

      var shock = document.createElement('div');
      var img = new Image;
      img.src = data;
      img.style.pointerEvents = "none";
      img.style.width = '300px';
      img.style.height = '300px';
      img.style.transition = '1s all';
      img.style.position = 'fixed';
      img.style.left = 'calc(50% - 150px)';
      img.style.bottom = '-100px';
      img.style.zIndex = 999999;

      document.body.appendChild(img);

      window.setTimeout(function(){
        img.style.bottom = '-50px';
      },30);

      window.setTimeout(function(){
        img.style.bottom = '-300px';
      }, 4300);
      window.setTimeout(function(){
        img.parentNode.removeChild(img);
      }, 5400);

    };

    var record = function(e) {

      if ( e.which === key[ck] ) {
        ck++;
      } else {
        ck = 0;
      }

      if ( ck >= max ) {
        hi();
        ck = 0;
      }

    };

    var init = function(data) {
      document.addEventListener('keyup', record);
    };

    var data = 'https://weichiachang.github.io/easter-eggs-mobile/images/hi.gif';

    init(data);
  }

  // generate
  hi();
})(window);
