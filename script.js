$.ajax(
    {
        url: 'https://lista-zakupow-acd7a.firebaseio.com/lists.json',
        crossDomain: true,
        dataType: 'json',
        success: (result) => {
            const keys = Object.keys(result);
            for (let i = 0; i < keys.length; i++) {
                $('#lists').append('<li>' + result[keys[i]].name + '</li>');
                $.ajax({
                    url: 'https://lista-zakupow-acd7a.firebaseio.com/lists/'
                    + keys[i] + '.json',
                    crossDomain: true,
                    dataType: 'json',
                    success: (result) => {
                        // console.log(result.elements[0]);
                        const elements = result.elements;
                        console.log(elements);
                        for (let j = 0; j < elements.length; i++){
                            $('#elements').append('<li>' + elements[j].name + '  ' +elements[j].quantity + ' sztuk</li>');
                        }
                    }
                });
            }
        }
    });