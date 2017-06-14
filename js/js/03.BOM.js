// ―――――――――――――――――――――――――――――――――
// Browser Object Model 
// ―――――――――――――――――――――――――――――――――
// 1. new Window() ==> window
// 전역객체 window

// window.screen
// window.location
// window.history
    // history.pushState , history.replaceState
// window.navigator
// window.navigator.onLine;
function isOnline(){
    return window.navigator.onLine;
}

function isWindow(){
    return window.navigator.platform.toLowerCase().indexOf('win') > -1;
}
function isMac(){
    return window.navigator.platform.toLowerCase().indexOf('mac') > -1;
}
function isBrowser(browser){
    return window.navigator.userAgent.toLowerCase().indexOf(browser) > -1;
}
function isChrome(){
    return isBrowser('chrome') && !isBrowser('safari') && !isBrowser('whale');
}
function isSafari(){
    return !isChrome() &&  isBrowser('safari');
}
function whatIsBrowser(){
    //chrome, safari, firefox, ie, opera
    if (isBrowser('safari') && !isBrowser('chrome')) {
        return 'safari';
    }else if (isBrowser('opr') || isBrowser('opera')){
        return 'opera';
    }else if(isBrowser('firefox')){
        return 'firefox';
    }else if (isBrowser('msi') || isBrowser('edge') || isBrowser('trident')){
        return 'ie';
    }else if (isBrowser('chrome') && !isBrowser('chromium')){
        return 'chrome';
    }else{
        return 'unknown';
    }
}
// window.document
