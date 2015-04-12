$(function() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

var YTAPIReady = false;

function onYouTubeIframeAPIReady() {
    if(YTAPIReady) { return; }
    YTAPIReady = true;
    $(document).trigger("YTAPIReady");
}

(function($) {

    function randomStr() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var charsLen = chars.length;
        var len = 100;
        var str = '';
        var floor = Math.floor;
        var random = Math.random;
        var rnum;
        for (var i = 0; i < len; i++) {
            rnum = floor(random() * charsLen);
            str += chars.substring(rnum, rnum + 1);
        }
        return str;
    }

    $.fn.simpletube = function(videoId, options) {
        var settings = $.extend({
            width: 426,
            height: 240
        }, options);

        return this.each(function() {
            var id = randomStr();
            $(this).append($('<div/>').attr('id', id));

            var func = function() {
                var player = new YT.Player(id, {
                    width: settings.width,
                    height: settings.height,
                    videoId: videoId
                });
            };
            if (YTAPIReady) {
                func();
            } else {
                $(document).one('YTAPIReady', func);
            }
        });
    };

})(jQuery);
