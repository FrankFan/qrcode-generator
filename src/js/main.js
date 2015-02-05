$(function(){

    chrome.tabs.getSelected(null, function(tab){

        console.dir(tab);

        var title = tab.title;
        var url = tab.url;

        $('#qrcode').qrcode({
            text: url,
            width: '180',
            height: '180'
        });

        $('#title').val(title);
        $('#url').val(url);

    });

});