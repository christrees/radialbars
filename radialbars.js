let rbObj = {
  mainObject: null,
  mainSelect: '.radial-bars',
  viewBox: '0 0 300 300',
  score: {
    selectorByID: "Score",
    current: 0,
    maxPlayer: 0,
  },
  hub: {
    classname: 'hub',
    type: 'circle',
    center: '(150,150)',
    text: 'Click to Start',
    attr: { 
      r: 50, 
      fill: 'red',
      stroke: 'green',
      strokewidth: 3
    }
  },
  bars: {
    width: 20,
    height: 100,
    count: 1,
    timeout: 10000,
    pntValAttr: "pointValue",
    barObjectID: "rect.bar",
    bar: {
      durationTime:2000,
      delayTime:1000,
      degrees: 360,
      pointValue: 5,
    }
  },
  makeBoard() {
    d3.select(rbObj.mainSelect).selectAll('svg').remove();
    rbObj.main = d3.select(rbObj.mainSelect);
    rbObj.main.append('svg')
      .attr('viewBox', rbObj.viewBox);
  },
  makeHub() {
    d3.select('.hub').remove();
    d3.select('text').remove();
    d3.select('svg')
      .append('circle').classed('hub', true)
      .attr('r', rbObj.hub.attr.r)
      .attr('fill', rbObj.hub.attr.fill)
      .attr('stroke', rbObj.hub.attr.stroke)
      .attr('stroke-width', rbObj.hub.attr.strokewidth)
      .attr('transform', 'translate'+rbObj.hub.center);
    d3.select('svg')
      .append('text')
      .text(rbObj.score.current)
      .attr('transform', 'translate'+rbObj.hub.center);
  },
  manageHubClick() {
    d3.select(this).remove();
    //console.log(d3.event);
    //alert(d3.event);
    rbObj.makeBar();
    rbObj.makeHub();
  },
  makeBar() {
    var degrees = Math.floor(Math.random() * 360);
    d3.select("svg")
    .append("rect")
    .classed("bar", true)
    .attr("height", 10)
    .attr("width", rbObj.bars.width)
    .attr("rx",rbObj.bars.width/2)
    .attr("ry",rbObj.bars.width/2)
    .attr("x", -rbObj.bars.width/2)
    .attr("y", -rbObj.bars.width/2)
    .attr(rbObj.bars.pntValAttr, rbObj.bars.bar.pointValue)
    .attr('transform', 'translate'+rbObj.hub.center+'rotate('+degrees+')')
    .on("click", rbObj.manageBarClick);
    d3.selectAll("rect")
    .attr("height",10)
    .style("fill","blue")
    .transition()
    .attr("height",rbObj.bars.height)
    .style("fill","green")
    .duration(rbObj.bars.bar.durationTime)
    .transition()
    .attr("height",10)
    .style("fill","green")
    .delay(rbObj.bars.bar.delayTime).duration(rbObj.bars.bar.durationTime);
    barTimer = d3.timer(function(duration) { //console.log(duration);
      if (duration > rbObj.bars.bar.durationTime)  {
        rbObj.endGameAnim();
        barTimer.stop();
      }
    }, 1000);
  },
  manageBarClick() {
    barTimer.stop();
    rbObj.updateScore(d3.select(this).attr(rbObj.bars.pntValAttr));
    d3.select(this)
     .attr("height", 10)
     .transition()
     .on('end', function() {  
       d3.select(this).remove();  
       rbObj.makeBar();
       rbObj.makeHub();
      });
  },
  updateScore(value) {
    rbObj.score.current = rbObj.score.current + parseInt(value);
    d3.select('.score').text(rbObj.score.current);
    d3.select('text').text("+ "+value);
  },
  endGameAnim() {
    d3.select('text').text("Game Over");
  }
};

document.addEventListener('DOMContentLoaded', function(event) {
  if (typeof d3 == 'object') {//verify d3 is an object in the dom
    rbObj.makeBoard();
    rbObj.makeHub();
    d3.select('.hub').on('click', rbObj.manageHubClick);
    d3.select('text').text(rbObj.hub.text);
  } else {
    alert('Error: d3 not found');
  }
});
