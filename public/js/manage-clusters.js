$(function(){
    $('td > a.fa-trash').on('click', function(){
        var id = $(this).closest('tr').data('id');
        var cluster = getClusterByID(id);
        var modal = $('#deleteCluster');

        modal.find('.cluster').text(cluster.name);
        modal.find('.confirm-delete').data('id', id);
    });

    function createCluster(e){
        e.preventDefault();
        displayLiveNotification("Attempting to create cluster");
        $.ajax({
            url: '/clusters/create-cluster',
            type: 'POST',
            data: $('#createClusterForm').serialize(),
            success: function(r){
                console.log(r);
                if(r.success) {
                    displayLiveNotification(r.msg, "success");
                    // TODO: Update table with new entry
                } else {
                    displayLiveNotification(r.msg, "error");
                }
            }, error: function(r){
                displayLiveNotification(r, "error");
            }
        });
        $('#createCluster').modal('hide');
    }

    $('#createCluster .btn-primary').on('click', createCluster);
    $('#createClusterForm').on('submit', createCluster);

    $('#deleteCluster .confirm-delete').on('click', function(e){
        var id = $(this).data('id');
        var cluster = getClusterByID(id);

        displayLiveNotification("Deleting cluster: " + cluster.name);
        $.ajax({
            url: '/clusters/delete-cluster/' + id,
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
        $('#deleteCluster').modal('hide');
        $("[data-id='" + id + "']").fadeOut(function(){
            $(this).remove();
        });
    });

    $('td > a.fa-pencil').on('click', function(e){
        var id = $(this).closest('tr').data('id');
        var cluster = getClusterByID(id);
        var modal = $('#editCluster');
        modal.find('.modal-title').text("Edit cluster - " + cluster.name);


        // TODO: Permissions
        // TODO: Save user changes
    });
});

function getClusterByID(id){
    return $.grep(clusters, function(e){
        return e.id === id
    })[0];
}