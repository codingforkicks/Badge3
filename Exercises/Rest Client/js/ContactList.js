$(document).ready(function () {
    loadContacts();
});


function loadContacts() {
    var contentRows = $('#contentRows');
    $.ajax({
        type: 'GET',
        url: 'https://tsg-contactlist.herokuapp.com/contacts',
        success: function (contactArray) {
            $.each(contactArray, function (index, contact) {
                var name = contact.firstName + ' ' + contact.lastName;
                var company = contact.company;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + company + '</td>';
                row += '<td><button type="button" class="btn btn-info">Edit</button></td>';
                row += '<td><button type="button" class="btn btn-danger">Delete</button></td>';
                row += '</tr>';

                contentRows.append(row);
            })
        },
        error: function () {

        }
    })
}