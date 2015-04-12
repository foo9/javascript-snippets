function fetchFbLikeCount(url) {
    return $.ajax({
        dataType: 'json',
        url: 'http://graph.facebook.com/?id=' + encodeURI(url)
    }).done(function(data) {
        console.log(url, data.shares);
    });
}

var urls = [
    'https://angularjs.org/',
    'http://backbonejs.org/',
    'http://knockoutjs.com/',
    'http://emberjs.com/',
    'http://vuejs.org/'
];

var $dfd = fetchFbLikeCount(urls[0]);

for (var i = 1, len = urls.length; i < len; i++) {
    (function(i) {
        $dfd = $dfd.then(function() {
            return fetchFbLikeCount(urls[i]);
        });
    })(i);
}