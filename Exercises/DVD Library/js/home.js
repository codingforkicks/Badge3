$(document).ready(function () {
    loadDvds();
});

function loadDvds() {
    clearMovieTable();
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
                row += '<td><button type="button" class="btn btn-link" onclick="showMovieInfo(' + movieId + ')">' + title + '</button></td>';
                row += '<td>' + release + '</td>';
                row += '<td>' + director + '</td>';
                row += '<td>' + rating + '</td>';
                row += '<td><button type="button" class="btn btn-link" onclick="showEditForm(' + movieId + ')">Edit </button>|<button type="button" class="btn btn-link" onclick="deleteConfirmation(' + movieId + ')">Delete</button></td>';
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
        deleteMovie(movieId);
    });
    $('#cancelButton').on('click', function () {
        $('#deleteDiv').hide();
        return false;
    });
}

function deleteMovie(movieId) {
    $.ajax({
        type: 'DELETE',
        url: 'https://tsg-dvds.herokuapp.com/dvds/' + movieId,
        success: function () {
            loadMovies();
        }
    });
}

function showEditForm (movieId) {
    $('#errorMessages').empty();

    var editHeader = $('#editHeader');

    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvd/' + movieId,
        success: function (data, status) {

            $('#editTitle').val(data.title);
            $('#editReleaseYear').val(data.releaseYear);
            $('#editDirector').val(data.director);
            $('#editNotes').val(data.notes);

            editHeader.append('Edit Dvd: ' + data.title);

        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    })

    $('#movieData').hide();
    $('.nav').hide();
    $('#editDiv').show();
};

function showMovieInfo(movieId) {
    $('#errorMessages').empty();
    var displayHeader = $('#displayHeader');
    var content = $('#displayContent')

    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvd/' + movieId,
        success: function (data, status) {
            var releaseYear = data.releaseYear;
            var director = data.director;
            var rating = data.rating;
            var notes = data.notes;

            displayHeader.append(data.title);

            var p;
            p += '<p> Release Year:' + releaseYear + '</p>';
            p += '<p> Director:' + director + '</p>';
            p += '<p> Rating:' + rating + '</p>';
            p += '<p> Notes:' + notes + '</p>';

            content.append(p);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    })

    $('#movieData').hide();
    $('.nav').hide();
    $('#displayDiv').show();
};

function hideForm() {
    $('#errorMessages').empty();
    $("#editHeader").empty();
    $('#displayHeader').empty();
    $('#displayContent').empty();

    $('#editTitle').val('');
    $('#editReleaseYEar').val('');
    $('#editDirector').val('');
    $('#editRating').val('');
    $('#editNotes').val('');

    $('#movieData').show();
    $('.nav').show();
    $('#editDiv').hide();
    $('#displayDiv').hide();
}

//clear table data
function clearMovieTable() {
    $('#contentRows').empty();
}