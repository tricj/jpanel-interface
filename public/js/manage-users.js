$(function(){
    $('td > a.fa-trash').on('click', function(){
        var id = $(this).closest('tr').data('id');
        var user = getUserByID(id);
        var modal = $('#deleteUser');

        modal.find('.username').text(user.username);
        modal.find('.confirm-delete').data('id', id);
    });

    $('#deleteUser .confirm-delete').on('click', function(e){
        var id = $(this).data('id');
        var user = getUserByID(id);

        displayLiveNotification("Deleting user: " + user.username);
        $.ajax({
            url: '/account/delete-user/' + id,
            type: 'DELETE',
            success: function(r) {
                if(r.success) {
                    displayLiveNotification(r.msg, "success");
                } else {
                    console.log(r);
                    displayLiveNotification(r.msg, "error");
                }
            }, error: function(r){
                displayLiveNotification(r, "error");
            }
        });
        $('#deleteUser').modal('hide');
        $("[data-id='" + id + "']").fadeOut(function(){
           $(this).remove();
        });
    });

    $('td > a.fa-pencil').on('click', function(e){
        var id = $(this).closest('tr').data('id');
        var user = getUserByID(id);
        var modal = $('#editUser');
        modal.find('.modal-title').text("Edit user - " + user.username);


        // TODO: Permissions
        // TODO: Save user changes
    });
});

function getUserByID(id){
    return $.grep(users, function(e){
        return e.id === id
    })[0];
}