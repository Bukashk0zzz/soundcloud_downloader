$("li.player").not(".hasDownload").each(function () {

var self = $(this);
self.addClass("hasDownload");

var script = self.find("script").first().text();

var streamPattern = new RegExp("\"streamUrl\":\"(.*?)\",");
var streamUrl = streamPattern.exec(script)[1];

var idPattern = new RegExp("\"id\":(.*?),");
var songId = idPattern.exec(script)[1];

var title = self.find("div.info-header h3 a").text();

var actionBar = self.find(".actionbar .actions .primary");

var downloadLink = actionBar.find(".download.pl-button").get(0);


if (downloadLink && downloadLink.tagName == "SPAN") { //Disabled download
    $(downloadLink).remove();
    downloadLink = null;
}

if (!downloadLink) {
    var downloadLink = $("<a>").addClass("download").addClass("pl-button");
    downloadLink.appendTo(actionBar);

    $(downloadLink).removeAttr("href");
    $(downloadLink).html("").text("Download");
    $(downloadLink).addClass("id-" + songId);
    $(downloadLink).attr("data-streamUrl", streamUrl).attr("data-title", title).attr("data-songId", songId);


    $("a.id-" + songId).on("click", function (event) {

        event.stopPropagation();
        downloadClick(streamUrl,title);
    });

}

});

//single player
$("#main-content-inner>div.player").not(".hasDownload").each(function () {

var self = $(this);
self.addClass("hasDownload");

var script = self.find("script").first().text();

var streamPattern = new RegExp("\"streamUrl\":\"(.*?)\",");
var streamUrl = streamPattern.exec(script)[1];

var idPattern = new RegExp("\"id\":(.*?),");
var songId = idPattern.exec(script)[1];

var title = self.find("div.info-header h1").text();

var actionBar = self.find(".actionbar .actions .primary");

var downloadLink = actionBar.find(".download.pl-button").get(0);

if (downloadLink && downloadLink.tagName == "SPAN") { //Download disabled link
    $(downloadLink).remove();
    downloadLink = null;
}
if (!downloadLink) {
    var downloadLink = $("<a>").addClass("download").addClass("pl-button");
    downloadLink.appendTo(actionBar);

    $(downloadLink).removeAttr("href");
    $(downloadLink).html("").text("Download");
    $(downloadLink).addClass("id-" + songId);
    $(downloadLink).attr("data-streamUrl", streamUrl).attr("data-title", title).attr("data-songId", songId);


    $("a.id-" + songId).on("click", function (event) {

        event.stopPropagation();
        downloadClick(streamUrl,title);
    });
    }
});

function downloadClick(streamUrl,title) {


    var url = streamUrl;
    var n = title;
    window.location.assign('http://mysimple.name/up/sound.php?url='+url+'&n='+n);


};