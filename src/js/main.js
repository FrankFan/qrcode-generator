$(function(){

    if (chrome.tabs) {
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

            $('#qrcode canvas').addClass('originalCanvas');
            var second = cloneCanvas($('#qrcode canvas')[0]);
            second = $(second);
            second.removeClass('originalCanvas').addClass('second');
            $('#qrcode').append(second);


            return;
            // TODO: 增加放大模式
            // url太长？难以识别？点击放大！

            

            $('.originalCanvas').on('mouseover', function() {
                $('.container').css({
                    width: '550px',
                    height: '550px'
                });
            }
            , function() {
                $('.container').css({
                    width: '400px',
                    height: '0'
                });
            }
            );

            if (isUrl(url)) {
                // 将url转成短链
                getShortUrl(url);
            }
            
        });
    };

    var getShortUrl = function(url_long) {
        var obj = {};
        // var appkey = '648450463';
        var appkey = '1681459862';
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
                } else {
                    $('#tinyUrl').val('~~出错了~~');
                }
            },
            error: function(data) {
                $('#tinyUrl').val('~~  error  ~~' + data.responseText);
            }
        });
    };

    var isUrl = function(strUrl) {
        return /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&=]*)?$/i.test(strUrl);
    }

    // from http://stackoverflow.com/questions/3318565/any-way-to-clone-html5-canvas-element-with-its-content
    var cloneCanvas = function(oldCanvas) {

        //create a new canvas
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');

        //set dimensions
        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;

        //apply the old canvas to the new one
        context.drawImage(oldCanvas, 0, 0);

        //return the new canvas
        return newCanvas;
    }

});