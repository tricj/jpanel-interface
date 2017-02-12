$(function(){
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
});