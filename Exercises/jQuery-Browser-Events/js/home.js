$(document).ready(function () {
    //Only the content in the Main section should display when the page is loaded.
    $('#akronInfoDiv').hide();
    $('#minneapolisInfoDiv').hide();
    $('#louisvilleInfoDiv').hide();

    //When the Akron button is clicked, only the content in the Akron section should display; the weather information for Akron should be hidden initially.

    $('#akronButton').on('click', function () {
        $('#akronInfoDiv').show();
        $('#akronWeather').hide();
        $('#mainInfoDiv').hide();
        $('#minneapolisInfoDiv').hide();
        $('#louisvilleInfoDiv').hide();
    });

    $('#akronWeatherButton').on('click', function () {
        $('#akronWeather').toggle();
    });

    //When the Minneapolis button is clicked, only the content in the Minneapolis section should display; the weather information for Minneapolis should be hidden initially.

    $('#minneapolisButton').on('click', function () {
        $('#minneapolisInfoDiv').show();
        $('#minneapolisWeather').hide();
        $('#mainInfoDiv').hide();
        $('#akronInfoDiv').hide();
        $('#louisvilleInfoDiv').hide();
    });

    $('#minneapolisWeatherButton').on('click', function () {
        $('#minneapolisWeather').toggle();
    });

    //When the Louisville button is clicked, only the content in the Louisville section should display; the weather     information for Louisville should be hidden initially.

    $('#louisvilleButton').on('click', function () {
        $('#louisvilleInfoDiv').show();
        $('#louisvilleWeather').hide();
        $('#mainInfoDiv').hide();
        $('#akronInfoDiv').hide();
        $('#minneapolisInfoDiv').hide();
    });

    $('#louisvilleWeatherButton').on('click', function () {
        $('#louisvilleWeather').toggle();
    });

    //The background color of any table row should change to “WhiteSmoke” when the mouse pointer is hovering over the row.
    //The background color of the row should return to white when the mouse pointer is no longer hovering over the row.
     //This applies to all rows in all tables except the first(header) row in a given table.The first(header) row in any table should not change appearance when the mouse pointer hovers over it.
    $('tr').hover(
        function () {
            //in callback
            $(this).css('background-color', 'whitesmoke');
        },
        function () {
            //out callback
            //The background color of the row should return to white when the mouse pointer is no longer hovering over the row.
            $(this).css('background-color', '');
        }
    );
});