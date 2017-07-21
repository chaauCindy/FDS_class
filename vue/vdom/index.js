// ―――――――――――――――――――――――――――――――――
// Actual DOM 
// ―――――――――――――――――――――――――――――――――
//  <div class="hello">
//     <p class="message">Hello Virtual DOM</p>
// </div>
let mount_el = document.querySelector('.actual-dom');

let hello = document.createElement('div');
hello.setAttribute('class','hello');
let message = document.createElement('p');
message.setAttribute('class','message');
let message_content = document.createTextNode('Hello Virtual DOM');
message.appendChild(message_content);
hello.appendChild(message);
mount_el.appendChild(hello);

// ―――――――――――――――――――――――――――――――――
// Virtual DOM 
// ―――――――――――――――――――――――――――――――――
const h             = require('virtual-dom/h');
const diff          = require('virtual-dom/diff');
const patch         = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

let mount_vl = document.querySelector('.virtual-dom');
let data = ['vue.js', 'angular','react'];
let vtree    = render(data); 
let rootTree = createElement(vtree);

function render(data){
    let lists = data.map((item, index) => h('li', [
        item,
        h('button',{
            type: 'button',
            onclick: function(){
               data.splice(index, 1); 
               update();
            }
        }, 'delete')
    ]));
    let list = h('ul', lists);
    let input = h('input.add-content',{
        type: 'text',
        placeholder : 'Add Framework'
    });
    let addBtn = h('button',{
        type: 'button',
        onclick: function(){
            let input = document.querySelector('.add-content');
            data.push( input.value );
            update();
            input.value = '';
        }
    }, 'Add');
    let container = h('div.container', [input, addBtn, list]);
    return container;
}
function update(){
    let ctree   = render(data);
    let patches = diff(vtree, ctree);
    rootTree    = patch(rootTree, patches);
    vtree       = ctree;
}
mount_vl.appendChild(rootTree);