(function($) {

  $.fn.pasteCapture = function() {
    return this.each(function() {
      var $this = $(this);
      var $wrappingEl = $('<div class="pastecapture" contenteditable style="font-size:0.0px">')
        .on('paste', function(event) {
          var items = (event.clipboardData || event.originalEvent.clipboardData).items;
          var blob = null;

          for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].type.indexOf('image') === 0 && items[i].kind === 'file') {
              blob = items[i].getAsFile();
              break;
            }
          }

          if (blob !== null) {
            var reader = new FileReader();
            reader.onload = function(e) {
              $this.attr('src', e.target.result).show();
              $this.trigger('success.pastecapture');
            };
            reader.onerror = function(e) {
              $this.trigger('fail.pastecapture');
            };
            reader.readAsDataURL(blob);
          } else {
            $this.trigger('fail.pastecapture');
          }

          return false;
        })
        .on('focus', function() {
          $(this).addClass('focus');
        })
        .on('blur', function() {
          $(this).removeClass('focus');
        })
        .on('success.pastecapture', function() {
          $(this).trigger('blur');
        });

      $this.hide().wrap($wrappingEl);
    });
  };

})(jQuery, window);


$(function() {

  $('#test').pasteCapture()
    .on('success.pastecapture', function() {
      console.log('success');
    })
    .on('fail.pastecapture', function() {
      console.log('fail');
    });

});