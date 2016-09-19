$(document).ready(() => {
    var index = 1;
    $.ajax({
        url: '/getAllData',
        dataType: 'json',
        method: 'GET',
        success: getResult
    });

    
    $('#onSearch').click( () => {
       if($('#search').val() === '')
           return false;
        $('#PhoneBox').empty();        
        $.ajax({
            url: '/search',
            dataType: 'json',
            method: 'POST',
            data: { name: $('#search').val() },
            success: getResult
        });
    });
    
    // Событие добавление нового пользователя

    $('#adduser').click( () => {
        let data = sendData();

        $.ajax({
            url: '/add',
            dataType:'json',
            method: 'POST',
            data: data,
            success: getResult
        }); 
    });

    //Создание нового текстового поля под дополнительный номер телефона

    $('.addphone').click( () => {           
        console.log('Click is work');            
        $('form').append('<input id=\"phone'+index+'\" type=\"text\">');
        index++;
    });
    // Функция для вывода  данных полученных от сервера
    function getResult(data){
        let out = '';
        if(Array.isArray(data)){
            data.forEach((doc) => {
                out += `<li> ${doc.name} <ul class=\"phonein\"> `;
                doc.phone.forEach((item) => {
                    out += `<li> ${item} </li>`;
                });
                out += '</ul></li>';
            })
        } else {
            out += `<li> ${data.name} <ul class=\"phonein\"> `;
            data.phone.forEach((item) => {
                out += `<li> ${item} </li>`;
            });
        }
        out += '</ul></li>';                    
        $('#PhoneBox').append(out);
    };
    // Функция для подготовки и отправки данных на сервер
    function sendData(){
        let data = {};

        data.phone = [];
        data.name = $('#name').val();
        $('#name').val('');
        data.phone.push($('#phone').val());
        $('#phone').val('');

        if(index !== 1){                        
            for(let i=1; i < index; i++){
                data.phone.push($('#phone'+i).val());
                $('#phone'+i).remove();
            }
        };
        console.log(data);
        return data;
    };
});