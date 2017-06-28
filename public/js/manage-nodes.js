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

        modal.find('.modal-title').text("Edit node - " + node.name);

        console.log(JSON.stringify(node));

        modal.find('#editNodeClusterID').val(node.id);
        modal.find('#editName').val(node.name);
        modal.find('#editHostname').val(node.hostname);
        modal.find('#editUsername').val(node.username);
        modal.find('#editPrivateKey').val(node.privateKey);


        // TODO: Permissions
        // TODO: Save user changes
    });

    $('#editNode .btn-primary').on('click', function(e){
        // Save button clicked
        editNode(e);
    });

    $('#editNodeForm').on('submit', function(e){
        // Form submission
        editNode(e);
    });

    $('.status').each(function(){
        var id = $(this).parent().attr('data-id');
        var element = $(this).find('a');
        var span    = $(this).find('span');
        console.log("Agent ID: " + id);
        $.ajax({
            url: '/clusters/node-status/' + id,
            type: 'GET',
            success: function(r){
                console.log(r);
                if(r.success){
                    // Node is online
                    element.removeClass();
                    element.addClass('fa').addClass('fa-check').addClass('ico-green');
                    span.text("ONLINE");
                } else {
                    // Node is offline
                    element.removeClass();
                    element.addClass('fa').addClass('fa-times').addClass('ico-red');
                    span.text("OFFLINE");
                }
            }, error: function(r){
                    displayLiveNotification("Cannot obtain status for node: " + id, "error");
            }
        });
    });
});

function editNode(e){
    e.preventDefault();
    displayLiveNotification("Attempting to edit node");
    $.ajax({
        url: '/clusters/edit-node',
        type: 'POST',
        data: $('#editNodeForm').serialize(),
        success: function(r){
            console.log(r);
            if(r.success) {
                displayLiveNotification(r.msg, "success");
            } else {
                displayLiveNotification(r.msg, "error");
            }
        }, error: function(r){
            displayLiveNotification(r, "error");
        }
    });

    $('#editNode').modal('hide');
}

function getNodeByID(id){
    return $.grep(nodes, function(e){
        return e.id === id
    })[0];
}