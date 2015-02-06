$(function(){

    chrome.tabs.getSelected(null, function(tab){

        var title = tab.title;
        var url = tab.url;

        $('#qrcode').qrcode({
            text: url,
            width: '180',
            height: '180'
        });

        $('#title').val(title);
        $('#url').val(url);

        // 将url转成短链
        getShortUrl(url);        

        
    });

    var getShortUrl = function(url_long) {
        var obj = {};
        var appkey = '648450463';
        var api = 'https://api.weibo.com/2/short_url/shorten.json?source={appkey}&url_long={url_long}';
        api = api.replace(/{appkey}/, appkey).replace(/{url_long}/, encodeURIComponent(url_long));
        $.ajax({
            type: 'GET',
            url: api,
            dataType: 'json',
            success: function(data) {
                if(data && data.urls && data.urls.length > 0) {
                    obj = data.urls[0];
                    var tinyUrl = obj.url_short;
                    $('#tinyUrl').val(tinyUrl);
                }
            },
            error: function(data) {
            }
        });
    };

});