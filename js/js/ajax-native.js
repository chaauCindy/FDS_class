(function(global){
    'use strict';
    
    var xhr = new XMLHttpRequest(); //비동기 통신 객체 생성
    // xhr.open('GET','./DB/data.txt', false);    //동기통신 async(false) - 통신응답 후 다음 코드가 실행되므로 권장하지 않음
    
    function callbackCommunication(){
        // console.log(arguments);

        if(xhr.status === 200 && xhr.readyState == 4){
            console.log('통신 성공 :-)');

            console.log('응답 데이터 유형 : ',   xhr.responseType === '');
            console.log('응답 데이터 : ',        xhr.response);
            console.log('응답 데이터 : ',        xhr.responseText);
            console.log('응답 데이터 URL : ',    xhr.responseURL);

        }else if(xhr.status === 404){
            console.log('통신 실패 :-(');
        }
    }
    
    // xhr.onload = callbackCommunication;
    xhr.onreadystatechange = callbackCommunication;
    xhr.open('GET','./DB/data.txt');    //비동기통신 async(true)
    xhr.send(null);
    
})//(window);

{
    let xhr = null;
    let print_btn = document.querySelector('.btn-print-ajax');
    let data_zone = document.querySelector('.data-zone');
    // let data_url = './DB/data.txt';
    // let data_url = './DB/user.xml';
    let data_url = './DB/people.json';
    let renderAjaxData = () => {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = printJsonData;
        xhr.open('GET', data_url);
        xhr.send(null);
        // print_btn.removeEventListener('click', printAjaxData, true);
        print_btn.removeEventListener('click', printJsonData, true);
        print_btn.setAttribute('disable','disable');
    };
    let printJsonData = () =>{
        let user_collection = [];
        if(xhr.status === 200 && xhr.readyState === 4){
            data_zone.classList.remove('has-text-centered');
            JSON.parse(xhr.responseText).forEach(function(user, index){
                user_collection.push({
                    name : user.name,
                    gender : user.gender === 'female' ? '여성' : '남성',
                    email: user.email
                });
            });
            data_zone.innerHTML = renderTableUserCollection(user_collection);
        } else if( xhr.status > 400){
            data_zone.innerHTML = '통신에 실패했습니다.';
            data_zone.style.cssText = 'color:#ef1a62';
            window.setTimeout(function(){
                data_zone.removeAttribute('style');
            }, 1400);
        }else{
            data_zone.innerHTML = '<span class="fa fa-spinner fa-pulse" aria-label="로딩 중..."></span>';
        }
    };
    let printAjaxData = () =>{
        if(xhr.status === 200 && xhr.readyState === 4){
            // data_zone.innerHTML = renderDataBinding(xhr);
            data_zone.classList.remove('has-text-centered');

            let doc = xhr.responseXML;
            let results = doc.querySelectorAll('user > results');
            let user_collection = [];

            [].forEach.call(results, function(result){
                let name = {
                    first : result.querySelector('name > first').textContent,
                    last : result.querySelector('name > last').textContent
                };
                let email = result.querySelector('email').textContent;
                let gender = result.querySelector('gender').textContent;
                let user = {
                    name : `${name.first} ${name.last}`,
                    email,
                    gender
                };
                user_collection.push(user);
            });
            data_zone.innerHTML = renderTableUserCollection(user_collection);
        }else if( xhr.status > 400){
            data_zone.innerHTML = '통신에 실패했습니다.';
            data_zone.style.cssText = 'color:#ef1a62';
            window.setTimeout(function(){
                data_zone.removeAttribute('style');
            }, 1400);
        } else{
            data_zone.innerHTML = '<span class="fa fa-spinner fa-pulse" aria-label="로딩 중..."></span>';
        }
    }
    // javascript templete
    let renderTableUserCollection = collection => {
        let table_templete = document.querySelector('#user-table-template').innerHTML;
        table_templete = table_templete.split('<tbody></tbody>');
        let content_template = `${table_templete[0]}<tbody class="tbody">`;
        collection.forEach(function(user, index){
            let n = index+1;
            n = n<10 ? '0'+n : n;
            content_template += `
                <tr class="tr">
                    <td class="td num">${n}</td>
                    <td class="td name">${user.name}</td>
                    <td class="td gender">${user.gender}</td>
                    <td class="td email">${user.email}</td>
                    <td class="td etc"></td>
                </tr>
            `;
        });
        content_template += '</tbody>' + table_templete[1];
        return content_template;
    }
    // html templete file => new fragment
    let renderDataBinding = xhr =>{
        let frag = document.createDocumentFragment();
        let frag_root = document.createElement('div');
        frag.appendChild(frag_root);
        frag_root.innerHTML = xhr.response;
        frag_root.querySelector('.status').textContent   = xhr.status;
        frag_root.querySelector('.url').textContent      = xhr.responseURL;
        frag_root.querySelector('.type').textContent     = xhr.responseType || 'HTML';
        frag_root.querySelector('.response').textContent = xhr.responseText;
        return frag_root.innerHTML;
    }
  
    print_btn.addEventListener('click', renderAjaxData, true);
}