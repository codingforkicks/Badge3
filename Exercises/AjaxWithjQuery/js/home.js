//File for use in Ajax lesson

$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: 'https://tsg-contactlist.herokuapp.com/contacts',
        //grab and store API data then display to browser
        success: function (contactArray) {
            var contactsDiv = $('#allContacts');
            $.each(contactArray, function (index, contact) {
                var contactInfo = '<p>';
                contactInfo += 'Name: ' + contact.firstName + ' ' + contact.lastName + '<br>';
                contactInfo += 'Company: ' + contact.company + '<br>';
                contactInfo += 'Email: ' + contact.email + '<br>';
                contactInfo += 'Phone: ' + contact.phone + '<br>';
                contactInfo += '</p><hr>';

                contactsDiv.append(contactInfo);
            })
        },
        error: function () {
            alert('FAILURE!');
        }
    })

})