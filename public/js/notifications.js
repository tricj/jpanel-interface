$(function(){
    // setTimeout(function(){
    //     displayLiveNotification("Hello World!")
    // }, 2000);

    $('#notifications').on('click', function(e){
        $('#notifications-container').toggle();
        e.preventDefault();
    });

    $('.notification-link').on('click', function(e){
        $(this).slideUp(function(){
            $(this).remove();
        });
        e.preventDefault();
    });

    $('#live-notifications > .alert').on('click', function(){
        removeAlert(this);
    });


});

function removeAlert(alert){
    $(alert).slideUp(function(){
        $(this).remove();
    });
}

function displayLiveNotification(message, level) {
    var alertLevel;

    switch(level) {
        default:
        case "warning":
            alertLevel = "alert-warning";
            break;
        case "success":
            alertLevel = "alert-success";
            break;
        case "error":
            alertLevel = "alert-error";
            break;
    }
    var alert = $('<div class="alert ' + alertLevel + '">' + message + '</div>')
        .hide()
        .fadeIn()
        .appendTo('#live-notifications')
        .on('click', function(){
            removeAlert(this);
        });

        setTimeout(function(){
            removeAlert(alert);
        }, 3000);
}