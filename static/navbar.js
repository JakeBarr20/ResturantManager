// As soon as the document is ready to go then this function will run straight away
$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
         theme: "minimal"
    });
    // shifts the content to the right of the page as the navbar opens upon loading
    $('#content').toggleClass('active');
    // Responsible for actions regarding when the toggle button for the navbar is pressed
    $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar').toggleClass('active');
        // Activates the styling to move the navbar 
        $('#content').toggleClass('unactive');
        // Activates the styling to move the page content
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

});
