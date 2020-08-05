function goFaceBook(url) {
    var href = "http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    var a = window.open(href, 'facebook', '');
    if ( a ) {
        a.focus();
    }
}
function goMe2Day(msg,url,tag) {
    url = '"'+url+'":'+url
    var href = "http://me2day.net/posts/new?new_post[body]=" + encodeURIComponent(msg) + " " + encodeURIComponent(url) + "&new_post[tags]=" + encodeURIComponent(tag);
    var a = window.open(href, 'me2Day', '');
    if ( a ) {
        a.focus();
    }
}

function goTwitter(url){
	var href = "https://twitter.com/share?url=" + encodeURIComponent(url);
    var a = window.open(href, 'facebook', '');
    if ( a ) {
        a.focus();
    }

}