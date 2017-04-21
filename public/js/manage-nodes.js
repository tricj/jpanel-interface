$(function(){
    $('td > a.fa-trash').on('click', function(){
        var id = $(this).closest('tr').data('id');
        var node = getNodeByID(id);
        var modal = $('#deleteNode');

        modal.find('.node').text(node.name);
        modal.find('.confirm-delete').data('id', id);
    });

    $('#createNode .submit').on('click', function(e){
        e.preventDefault();
        displayLiveNotification("Creating node");

        $.ajax({
            url: '/clusters/create-node',
            type: 'POST',
            data: $('#createNodeForm').serialize(),
            success: function(r){
                console.log(JSON.stringify(r));
                displayLiveNotification(r.msg, r.success ? "success" : "error");
            }, error: function(r){
                displayLiveNotification(r, "error")
            }
        });
    });

    $('#deleteNode .confirm-delete').on('click', function(e){
        var id = $(this).data('id');
        var node = getNodeByID(id);

        displayLiveNotification("Deleting node: " + node.name);
        $.ajax({
            url: '/clusters/delete-node/' + id,
            type: 'DELETE',
            success: function(r) {
                if(r.success) {
                    displayLiveNotification(r.msg, "success");
                } else {
                    displayLiveNotification(r.msg, "error");
                }
            }, error: function(r){
                displayLiveNotification(r, "error");
            }
        });
        $('#deleteNode').modal('hide');
        $("[data-id='" + id + "']").fadeOut(function(){
            $(this).remove();
        });
    });

    $('td > a.fa-pencil').on('click', function(e){
        var id = $(this).closest('tr').data('id');
        var node = getNodeByID(id);
        var modal = $('#editNode');
        console.log(node);
        modal.find('.modal-title').text("Edit node - " + node.name);


        // TODO: Permissions
        // TODO: Save user changes
    });
});

function getNodeByID(id){
    return $.grep(nodes, function(e){
        return e.id === id
    })[0];
}