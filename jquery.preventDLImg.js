/*!
 * jQuery preventDLImg - prevent download image
 * 
 * Copyright 2013, Kouta Fukuhara
 *
 * Released under the MIT license.
 *
 * $('img').preventDLImg();
 */
;(function ($) {
  $.fn.preventDLImg = function () {
    var img, src, width, height, size,
        dummy = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    
    return this.each(function () {
      if (this.tagName !== 'IMG') {
        return true; // continue
      }
      
      src = this.src;
      this.src = dummy;
      width = this.width;
      height = this.height;
      size = width + 'px ' + height + 'px';
      
      this.style.backgroundImage = 'url(' + src + ')';
      this.style.userSelect = 'none';
      this.style.webkitUserSelect = 'none';
      this.style.MozUserSelect = 'none';
      this.style.OUserSelect = 'none';
      this.setAttribute('unselectable', 'on');
      
      this.style.backgroundSize = size;
      this.style.webkitBackgroundSize = size;
      this.style.MozBackgroundSize = size;
      this.style.ObackgroundSize = size;
      
      this.style.backgroundRepeat = 'no-repeat';
    });
  };
}(jQuery || Zepto));