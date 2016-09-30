var scrollTimeout;

window.addEventListener("load", function(){
    setTimeout(function () {
        console.log("Load fired.");
        GetPageContacts();
    }, 500);
});

window.addEventListener("hashchange", function(){
    console.log("Hash changed.");
    GetPageContacts();
});

document.onscroll = function () {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(function () {
        console.log("Scroll completed fired.");
        GetPageContacts();
    }, 500);
}

function GetPageContacts() {
    var currurl = top.document.location.href;
    if (currurl.toLowerCase().indexOf("/friends?") == -1) {
        if (document.getElementById("facebook_sync") != undefined) {
            document.getElementById("facebook_sync").remove();
        }
        return;
    }

    var allLists = document.getElementsByTagName("ul");
    var friendsLists = [];
    for (var i = 0; i < allLists.length; i++) {
        if (allLists[i].getAttribute("data-pnref") === "friends") {
            friendsLists[friendsLists.length] = allLists[i];
        }
    }

    var TotalFriends = 0;
    for (var j = 0; j < friendsLists.length; j++) {
        var friedsItems = friendsLists[j].getElementsByTagName("li");
        for (var i = 0; i < friedsItems.length; i++) {
            var profile_id = ExtractString(friedsItems[i].innerHTML, "data-profileid=\"", "\"");
        }

        TotalFriends += friedsItems.length;
    }
    
    var divStatus = createDivStatus();

    divStatus.innerHTML += "<p style='color: #CC0000'>" + TotalFriends + " contacts identified so far.</p>";
    divStatus.innerHTML += "<p>Please scroll to the bottom<br />of the page to fully scan.</p>";
    divStatus.innerHTML += "<a href=''>Why do I see this?</a>";
}

function createDivStatus() {
    var divStatus = null;
    if (document.getElementById("facebook_sync") != undefined) {
        divStatus = document.getElementById("facebook_sync");
    }
    else {
        var divStatus = document.createElement("div");
        divStatus.id = "facebook_sync";
        divStatus.style.textAlign = "center";
        divStatus.style.fontWeight = "bold";
        divStatus.style.fontSize = "11px";
        divStatus.style.padding = "10px";
        divStatus.style.position = "fixed";
        divStatus.style.left = "20px";
        divStatus.style.bottom = "20px";
        divStatus.style.zIndex = "10000";
        divStatus.style.backgroundColor = "lightyellow";
        divStatus.style.border = "1px solid black";
        divStatus.style.borderRadius = "4px";

        document.getElementsByTagName("body")[0].appendChild(divStatus);
    }

    divStatus.innerHTML = "<h6>Scanning contacts ... <img src='" + chrome.extension.getURL("images/loading.gif") + "' style='margin-bottom: -3px;' /><h6>";

    return divStatus;
}

function ExtractString(source, start, end) {
    var pos1 = source.indexOf(start);

    if (pos1 == -1) {
        return "";
    }

    var pos2 = source.substring(pos1 + start.length).indexOf(end);

    if (pos1 == -1 || pos2 == -1) {
        return "";
    }

    return source.substring(pos1 + start.length).substring(0, pos2);
}