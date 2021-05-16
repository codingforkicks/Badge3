$(document).ready(function () {
    loadDvds();
    deleteConfirmation();
});

function loadDvds() {
    clearContactTable();
    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvds',
        success: function (movieArray) {
            $.each(movieArray, function (index, movie) {
                var movieId = movie.id;
                var title = movie.title;
                var release = movie.releaseYear;
                var director = movie.director;
                var rating = movie.rating;

                var row = '<tr>';
                row += '<td><button type="button" class="btn btn-link" onclick="showMovieContent(' + movieId + ')">' + title + '</button></td>';
                row += '<td>' + release + '</td>';
                row += '<td>' + director + '</td>';
                row += '<td>' + rating + '</td>';
                row += '<td><button type="button" class="btn btn-link" onclick="deleteConfirmation(' + movieId + ')">Delete</button></td>';
                row += '</tr>';

                contentRows.append(row);
            })
            $("#deleteDiv").hide();
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    });
};

function deleteConfirmation(movieId) {
    $('#deleteDiv').show();
    $('#yesButton').on('click', function () {

    });
    $('#cancelButton').on('click', function () {
        $('#deleteDiv').hide();
        return false;
    });
}

function deleteMovie(movieId) {
    $.ajax({
        type: 'DELETE',
        url: 'https://tsg-dvds.herokuapp.com/dvds' + movieId,
        success: function () {
            loadMovies();
        }
    });
}

function hideEditForm() {
    $('#errorMessages').empty();

    $('#editFirstName').val('');
    $('#editLastName').val('');
    $('#editCompany').val('');
    $('#editPhone').val('');
    $('#editEmail').val('');

    $('#contactTableDiv').show();
    $('#editFormDiv').hide();
}

//clear table data
function clearContactTable() {
    $('#contentRows').empty();
}