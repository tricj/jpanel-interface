$(function(){
    $('#notifications').on('click', function(e){
        $('#notifications-container').toggle();
        e.preventDefault();
    });
});