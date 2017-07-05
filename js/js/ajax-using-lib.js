/*! ajax-using-lib.js @ 2017, yamoo9.net */
(function(global, $){
  'use strict';

  let frag = null;
  let frag_root = null;
  let template = document.querySelector('#user-card-template').innerHTML;
  let bind = document.querySelector('.data-zone');
  // Ajax 통신 사용
  $.get('./DB/user.json', function(data){
    bind.innerHTML = '';
    bind.classList.remove('has-text-centered');
    $.each($.parse(data), function(key, value){
      if(key === 'results') {
        $.each(value, function(o) {
          renderDataBinding(o);
        });
      }
    });
  });
  let initFragment = () =>{
    frag = document.createDocumentFragment();
    frag_root = document.createElement('div');
    frag_root.innerHTML = template;
    frag.appendChild(frag_root);
  };
  let renderDataBinding = (o) =>{
        initFragment();
        frag_root.querySelector('.name').textContent              = o.name.first + ' ' + o.name.last;
        frag_root.querySelector('.email').textContent             = o.email;
        frag_root.querySelector('.gender').classList.add(o.gender === 'female' ? 'fa-venus': 'fa-mars');
        frag_root.querySelector('.address').textContent           = o.location.street + ',' + o.location.city + ',' + o.location.state + '(' + o.location.postcode + ')';
        frag_root.querySelector('.picture').src                   = o.picture.thumbnail;
        frag_root.querySelector('.dob').textContent               = o.dob;
        frag_root.querySelector('.phone').textContent             = o.phone;
        bind.appendChild(frag_root.children[0]);
    }

})(window, window.FDS);