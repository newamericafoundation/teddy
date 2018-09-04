import './index.scss';


let settings = {


};

let queue = [];
let data = null;

fetch('endpoint').then(response => response.json()).then((_data)=>{
  data = _data;
  for(let i=0; i<queue.length; i++)
    queue[i].render(data);
});

window.renderDataViz = function(el){
  let id = el.getAttribute('id');
  let chart = settings[id];
  if(!chart) return;

  if(data){
    chart.render(data);
  } else {
    queue.push(chart);
  }
}
