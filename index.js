
let myChart;
let notice = document.getElementById('notice');
let noticeError = document.getElementById('noticeError');
let chartNotice = document.getElementById('chartNotice');
let output = document.getElementById('output');

function reset(){
  document.getElementById('form1').reset();
  document.getElementById('output').innerHTML='';
  if(myChart != null){
      myChart.destroy();
    }
  notice.style.display = 'block';
  notice.style.visibility = 'visible';
  noticeError.style.visibility = 'hidden';
  noticeError.style.display = 'none';
  chartNotice.style.display = 'block';
  output.style.display = 'none';
}


function createChart(){

  let exampleString = document.getElementById("form1").elements.word.value;
  let stringBase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let countObject = {};

  // letters counting
  function characterCount(word, character){
    let count = 0;
    for(let i = 0; i < word.length; i++){
      if (word[i] === character){
        count++;
      }
    }
    return count;
  }

  function count(){
    for (let i = 0, j = stringBase.length; i < j; i++){
      let currentChar = stringBase[i];
      let string = exampleString.toLowerCase();
      countObject[currentChar] = characterCount(string, currentChar);
      if(countObject[currentChar] === 0){
        delete countObject[currentChar];
      };
    }
    console.log(countObject);
  }
  count();

  // create random color for chart labels
  function randomColor(){
    let randomColor = [];

    for(let i = 0; i < Object.keys(countObject).length; i++){
      let letters = '0123456789abcdef';
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      randomColor.push(color);
    }
    return randomColor;
  }

  function destroyChart(){
    if(myChart != null){
      myChart.destroy();
    }
  }
// create pie chart using chart.js
  function drawChart(){
    destroyChart();
    let canvas = document.getElementById("pie-chart");
    let ctx = canvas.getContext('2d');

    myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(countObject),
        datasets: [
          {
            label: "countNumber",
            backgroundColor:randomColor(),
            data: Object.values(countObject),
            datalabels:{
              display:true,
              anchor:'end'
            }
          }
        ]
      },
      options: {
        responsive:true,
        legend:{
          position:'bottom',

          labels:{
            fontColor:'#1f1f7a',
            fontStyle:'bold',
            padding:25,
            fontSize:20
          }
        },

        title: {
          display: true,
          text: 'numbers of each letter',
          fontSize:28,
          fontColor:'#1f1f7a',
          fontStyle:'bold',
          padding:25
        },

        animation: {
          animateScale: true,
          animateRotate: true
        },

        plugins:{
          datalabels:{
            display:true,
            backgroundColor:function(ctx){
              return ctx.dataset.backgroundColor;
            },
            borderColor:'white',
            borderWidth:1,
            color:'white',
            display:function(ctx){
              let dataset=ctx.dataset;
              let count=dataset.data.length;
              let value=dataset.data[ctx.dataIndex];
              return value > count * 1.5;
            },
            font:{
              weight:'bold',
              size:18
            },
            formatter: Math.round
          }
        }
      }

    });
  }

  function checkValid(){

      if (!exampleString){
        notice.style.display = 'block';
        notice.style.visibility = 'visible';
        noticeError.style.display = 'none';
        chartNotice.style.display = 'block';
        destroyChart();
        output.style.display = 'none';
      }else if( Object.keys(countObject).length < 1){
        noticeError.style.display = 'block';
        noticeError.style.visibility = 'visible';
        notice.style.display = 'none';
        chartNotice.style.display = 'block';
        destroyChart();
        output.style.display = 'none';
      }else {
        notice.style.visibility = 'hidden';
        noticeError.style.visibility = 'hidden';
        chartNotice.style.display = 'none';
        drawChart();
        output.style.display = 'block';
      }
  }
  checkValid();

  let outputString = 'Result:' + '<br>'+ JSON.stringify(countObject).substring(1, JSON.stringify(countObject).length-1).replace(/['"]+/g, ' ').replace(/,(?=[^\s])/g, ", ").split('').join(' ');
  document.getElementById('output').innerHTML = outputString;
}

