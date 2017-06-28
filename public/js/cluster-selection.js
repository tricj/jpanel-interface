$(function(){
    $('#manage-cluster').on('click', function(e){
        e.preventDefault();
        var id = $('.node-selector select option:selected').attr('data-id');
        $.ajax({
            url: '/clusters/set-active/' + id,
            type: 'GET',
            success: function(r){
                console.log(r);
                if(r.success){
                    displayLiveNotification(r.msg, "success");
                } else {
                    displayLiveNotification(r.msg, "error");
                }
            }, error: function(r){
                displayLiveNotification("Could not switch active cluster", "error");
            }
        });
    });
});