function GetContacts() {
    $.ajax({
        url: "https://www.facebook.com/george.miscalencu/friends?source_ref=pb_friends_tl",
        success: function (result) {
            document.write(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Error: " + thrownError);
        }
    });
}