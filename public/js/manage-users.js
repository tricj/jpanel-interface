$(function(){
    $('td > a.fa-trash').on('click', function(){
        var id = $(this).closest('tr').data('id');
        var modal = $('#deleteUser');

        modal.find('.username').text(id);
        modal.find('.confirm-delete').data('id', id);
    });

    $('#deleteUser .confirm-delete').on('click', function(e){
        var id = $(this).data('id');

        // $.ajax({
        //     url: '/account/delete-user/' + id,
        //     type: 'DELETE',
        //     success: function(r) {
        //         alert("SUCCESS: " + JSON.stringify(r));
        //     }, error: function(r){
        //         alert("ERROR: " + JSON.stringify(r));
        //     }
        // });

        $('#deleteUser').modal('hide');
        $("[data-id='" + id + "']").fadeOut(function(){
           $(this).remove();
        });
    });

    $('td > a.fa-pencil').on('click', function(e){
       var id = $(this).closest('tr').data('id');
       alert("id="+id);
    });
});