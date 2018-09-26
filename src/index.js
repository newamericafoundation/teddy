import './index.scss';

let queue = [];
let data = null;

const settings = {
  'viz__id': (el) => {
    // use data
  }
};

fetch('endpoint').then(response => response.json()).then((_data)=>{
  data = _data;
  for(let i=0; i<queue.length; i++)
    queue[i]();
});

window.renderDataViz = function(el){
  let id = el.getAttribute('id');
  let chart = settings[id];
  if(!chart) return;

  if(data){
    chart(el);
  } else {
    queue.push(() => chart(el));
  }
}
