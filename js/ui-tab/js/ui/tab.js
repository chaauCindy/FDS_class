/*! ui/tab.js @ 2017, yamoo9.net */
(function(global, $){
  'use strict';

  var tabList  = $.selector('.tablist');
  var tabLink  = $.selectorAll('.tab', tabList);
  var controls = $.selectorAll('.indicator', $.selector('.control-indicator'))

  $.each(tabLink, function(tab, idx){
    tab.onclick = changeTab.bind(tab, idx);
  });


  function changeTab(idx, e){
    e.preventDefault();
    $.radioClass($.parent(this), 'active');
    $.radioClass($.selectorAll('.tabpanels > .tabpanel')[idx], 'active');
  }

})(window, window.FDS);