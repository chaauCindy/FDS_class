/*! vue.form.js © yamoo9.net, 2017 */
;(function(global, $){
  'use strict';
  var container       = $.selector('.container');
  var form_container  = $.selector('.form-container');
  var form            = $.selector('form');
  var btn_expand      = $.selector('.btn-expand');
  var btn_fold        = $.selector('.btn-fold');

  btn_expand.onclick = function(){
    $.addClass(container, 'show-form-overlay');
    $.addClass(form_container, 'expand');
  }

  btn_fold.onclick = function(){
    $.removeClass(container, 'show-form-overlay');
    $.removeClass(form_container, 'expand');
  }

  form.onsubmit = function(e){
    $.addClass(container, 'form-submitted');
    e.preventDefault();
  }

})//(window, window.FDS)
;(function(global){
    'use strict';
  var document = global.document,
      container, form_container, form, btn_expand, btn_fold;

  function init(){
    container       = document.querySelector('.demo');
    form_container  = document.querySelector('.form-container');
    form            = document.querySelector('form');
    btn_expand      = document.querySelector('.btn-expand');
    btn_fold        = document.querySelector('.btn-fold');
    
    bindEvents();
  }

  function bindEvents(){
    btn_expand.onclick = expandForm;
    btn_fold.onclick = foldForm;
    form.onsubmit = submitForm;
  }

  function expandForm(){
    container.classList.add('show-form-overlay');
    form_container.classList.add('expand');
  }

  function foldForm(){
    container.classList.remove('show-form-overlay');
    form_container.classList.remove('expand');
  }

  function submitForm(e){
    e.preventDefault();
    var name_value     = document.querySelector('#user_name').value.trim();
    var email_value    = document.querySelector('#user_email').value.trim();
    var subject_value  = document.querySelector('#user_subject').z;
    var message_value  = document.querySelector('#user_message').value.trim();
    var user_inputs = {
      name    : name_value,
      email   : email_value,
      subject : subject_value,
      message : message_value
    };

    for(var prop in user_inputs){
      if(user_inputs.hasOwnProperty(prop)){
        switch(prop){
          case 'name':
          case 'subject':
          case 'message':
            if(!user_inputs[prop]){
              global.alert(prop+' 필드를 입력하세요!');
              return false;
            }
            break;
          case 'email':
            var email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!email_reg.test(user_inputs.email)){
              global.alert('이메일을 정확하게 입력해주세요.');
              return false;
            }
        }
      }
    }
  

    // container.classList.add('form-submitted');
  }

  init();
})(window);