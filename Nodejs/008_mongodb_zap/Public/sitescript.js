$(document).ready(() => {
    var index = 1, 
        outData = {};
    $.ajax({
        url: '/getData',
        dataType: 'json',
        method: 'POST',
        data: {},
        success: getResult
    });

    $('#PhoneBox').on('click', 'li.data', (event)=> {       
        outData.id = event.currentTarget.attributes[1].textContent;
        $.ajax({
            url: '/getData',
            dataType: 'json',
            method: 'POST',
            data: {_id: outData.id},
            success: setDataToForm
        });

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
                out += `<li class="data" data-id="${doc._id}" > ${doc.name} <ul class=\"phonein\"> `;
                doc.phone.forEach((item) => {
                    out += `<li> ${item} </li>`;
                });
                out += '</ul></li>';
            })
        } else {
            out += `<li class="data" data-id="${data._id}"> ${data.name} <ul class=\"phonein\"> `;
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
            index = 1;
        };        
        return data;
    };
    function setDataToForm(Data){
        let data = Data[0],
            countKey = Object.keys(data).length;

        if(countKey === 0)
            return false;
        $('#name').val(data.name);
        $('#phone').val(data.phone[0]);

        data.phone.forEach( (phoneNum, i) => {
            if(i !== 0){                
                $('form').append('<input id=\"phone'+index+'\" type=\"text\">');
                $('#phone'+index).val(phoneNum);
                index++;
            }
        })
    }

});