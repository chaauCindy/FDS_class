const Todos = (function(global){
    'use strict';
    
    let document = global.document;
    let config = {};
    let defaults = {
        el: null,
        template: '',
        data: {},
        methods: {}
    };
    let init = config =>{
        if(!config.template.trim()) { throw 'templete는 초기화에 필요한 필수 속성입니다.'; }        
        let template = createfragDOM(config.template);
        let mount_el = document.querySelector(config.el);
        mount_el.appendChild(template);
        // console.log(template);
        loopTemplate(template);
    };
    let createfragDOM = template =>{
        template = template.includes('#') ? document.querySelector(template).innerHTML : template;
        let frag = document.createDocumentFragment();
        let root = document.createElement('div');
        frag.appendChild(root);
        root.innerHTML = template;
        return root.children[0];
    };
    let loopTemplate = template =>{
        console.log('template : ', template);
        let loop = template.querySelector('[data-for]');
        console.log('loop : ', loop);
        let match = loop.dataset.for.split('in')[1].trim();
        for (var item in config.data){
            if( config.data.hasOwnProperty(item) && item === match){
                console.log('config.data[item] : ', config.data[item]);
                match = config.data[item];
            }
        }
        renderTemplate(template, loop, match);
    };
    let renderTemplate = (template, loop, data) =>{
        let backup_loop = loop;
        template.removeChild(loop);
        data.forEach(function(item, index){
            backup_loop.removeAttribute('data-for');
            backup_loop.textContent = item;
            console.log('item : ', item);
            template.appendChild(backup_loop.cloneNode(true));
            console.log('template : ', template);
        });
        customEventBinding(template);
    };
    let customEventBinding = template => {
        let clicks = template.querySelectorAll('[data-click]');
        [].slice.call(clicks).forEach(function(clickable){
            var match = clickable.getAttribute('data-click');
            for(var method in config.methods){
                if( config.methods.hasOwnProperty(method) && method === match){
                    clickable.removeAttribute('data-click');
                    clickable.onclick = config.methods[method];
                }
            }
        });
    };
    class Todos{
        constructor(options){
            Object.assign(config, defaults, options);
            init(config);
        }
        get _config(){
            return config;
        }
    }

    return Todos;
})(window);