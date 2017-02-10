$(function(){
    // Enable tooltips for all toggles
    $('[data-toggle="tooltip"]').tooltip();
    // data-tooltip used when data-toggle already in use, i.e. for modal links
    $('[data-tooltip="true"]').tooltip();
});