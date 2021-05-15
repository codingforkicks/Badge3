$(document).ready(function () {
    //center all H1 and H2 Elements
    $('H1').addClass('text-center');
    $('H2').addClass('text-center');

    //Replace the class that is on the element containing the text "Team Up!" with the class page-header.
    $('.myBannerHeading').addClass('page-header');
    $('.myBannerHeading').removeClass('myBannerHeading');
  
    //Change the text of "The Squad" to "Yellow Team".
    $('#yellowHeading').html("Yellow Team");

    //Change the background color for each team list to match the name of the team.
    $('#orangeTeamList').css('background-color', 'orange');
    $('#blueTeamList').css('background-color', 'blue');
    $('#redTeamList').css('background-color', 'red');
    $('#yellowTeamList').css('background-color', 'yellow');

    //Add Joseph Banks and Simon Jones to the Yellow Team list.
    $('#yellowTeamList').append('<li>Joseph Banks</li><li>Simon Jones</li>');

    //Hide the element containing the text "Hide Me!!!"
    $('#oops').hide();

    //Remove the element containing the text "Bogus Contact Info" from the footer.
    $('#footerPlaceholder').remove();

    //Add a paragraph element containing your name and email to the footer.The text must be in Courier font and be 24 pixels in height.
    $('#footer').append('<p>Tia Simmons<br> t.simmons06@live.com</p>').css({ 'font-size': '24px', 'font-family': 'Courier'})
});