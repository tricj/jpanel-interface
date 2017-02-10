$(function(){
    $('td > a.fa-trash').on('click', function(){
        var id = $(this).parent().closest('td').data('id');
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
        $(this).closest('tr').css('background', 'red');
    });

    $('td > a.fa-pencil').on('click', function(){
       var id = $(this).parent().closest('td').data('id');
       alert("ID: " + id);
    });
});