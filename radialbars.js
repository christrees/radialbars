var rbObj = {
  mainObject: null,
  mainSelect: '.radial-bars',
  viewBox: '0 0 300 300',
  hub: {
    classname: 'hub',
    type: 'circle',
    attr: [ 
      ['r', '50'], 
      ['fill', 'white'],
      ['stroke', 'green'],
      ['stroke-width', '3']
    ]
  },
};
document.addEventListener('DOMContentLoaded', function(event) {
  // verify d3 is an object in the dom
  if (typeof d3 == 'object') {
    rbObj.main = d3.select(rbObj.mainSelect);
    rbObj.main.append('svg')
      .attr('viewBox', rbObj.viewBox)
      .append('circle').classed('hub', true)
      .attr('r', '50')
      .attr('fill', 'red')
      .attr('stroke', 'green')
      .attr('stroke-width', '3');
  } else {
    alert('D3.js object not found');
  }
});

function startGame(){
  alert('play');
}
