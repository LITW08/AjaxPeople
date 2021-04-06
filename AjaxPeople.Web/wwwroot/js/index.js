$(() => {
    clearTableAndPopulate();

    $("#show-add").on('click', function () {
        $(".modal-title").text('Add Person');
        $("#update").hide();
        $("#add").show();
        $(".modal").modal();
    });

    $("#add").on('click', function () {
        const person = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            age: $("#age").val()
        };
        $.post('/home/add', person, function () {
            clearTableAndPopulate(() => {
                clearModal();
                $(".modal").modal('hide');
            });
           
        });
    });

    $("#update").on('click', function () {
        const id = $(this).data('person-id');
        const person = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            age: $("#age").val(),
            id
        };
        $.post('/home/update', person, function () {
            clearTableAndPopulate();
            $(".modal").modal('hide');
            clearModal();
        });
    });

    function clearModal() {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
    }

    $(".table").on('click', '.edit', function () {
        $(".modal-title").text('Edit Person');
        $("#update").show();
        $("#add").hide();
        $(".modal").modal();

        const button = $(this);
        const row = button.closest('tr');
        const firstName = row.find('td:eq(0)').text();
        const lastName = row.find('td:eq(1)').text();
        const age = row.find('td:eq(2)').text();
        $("#firstName").val(firstName);
        $("#lastName").val(lastName);
        $("#age").val(age);
        $("#update").data('person-id', button.data('person-id'));   
    });

    $(".table").on('click', '.delete', function () {
        const id = $(this).data('person-id');
        $.post('/home/delete', { id }, function () {
            clearTableAndPopulate();
        });
    });
   
    function clearTableAndPopulate(cb) {
        $(".table tr:gt(1)").remove();
        $("#spinner-row").show();

        $.get('/home/getpeople', function (result) {
            $("#spinner-row").hide();
            result.forEach(person => {
                $(".table").append(`<tr><td>${person.firstName}</td><td>${person.lastName}</td>` +
                    `<td>${person.age}</td><td><button class='btn btn-warning edit'` +
                    `data-person-id='${person.id}'>Edit</button><button class='btn btn-danger delete'` +
                    `data-person-id='${person.id}' style='margin-left:10px;'>Delete</button>` +
                    `</td></tr>`);
            });

            if (cb) {
                cb();
            }
        });
    }
});