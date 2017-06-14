(function(global,_){
    'use strict';
    
    var container       = _.selector('.photo-showcase-controller');
    var showcase        = _.selector('.photo-showcase', container);
    var showcase_view   = _.selector('img', showcase);
    var indicators      = _.selectorAll('.photo-showcase-indicator', container);
    var showbox         = _.selector('.showbox');

    var setPhotoShowCase = function(){
        var indicator_img   = _.selector('img',this);
        var indicator_index = indicator_img.src.split('=')[1];
        var path = showcase_view.src.split('=')[0] + '=' + indicator_index;
        showcase_view.src = path;
        showbox.style.left = (indicator_index * 80)+ 'px';
        return false;
    };
    
    for(var i=0, l=indicators.length; i<l; ++i){
        var indicator = indicators[i];
        indicator.onclick = setPhotoShowCase;
    }
})(window, window.FDS);