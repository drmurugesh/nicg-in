import {
  select,
  csv,
  scaleLinear,
  extent,
  axisLeft,
  axisRight,
  axisBottom
} from 'd3';
import { dropdownMenu } from './dropdownMenu';
import { scatterPlot } from './scatterPlot';
import { colorLegend } from './colorLegend';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

let data;
let xColumn;
let yColumn;
let zColumn;
let dataA;

// assinging data and column invocation
const onXColumnClicked = column => {
  xColumn = column;
  render();
};

const onYColumnClicked = column => {
  yColumn = column;
  render();
};

const onZColumnClicked = column => {
  zColumn = column;
  render();
};

const render = () => {
  
  select('#x-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
    });
  
  
  select('#y-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
    });
  
  select('#z-menu')
    .call(dropdownMenu, {
      options: data.columns,
      onOptionClicked: onZColumnClicked,
      selectedOption: zColumn
    });
  
  svg.call(scatterPlot, {
    xValue: d => d[xColumn],
    xAxisLabel: 'gross vs budget vs imdb_score',
    yValue: d => d[yColumn],
    zValue: d => d[zColumn],
    circleRadius: 5,
    yAxisLabel: yColumn,
    xAxisLabel: xColumn,
    zAxisLabel: zColumn,
    margin: { top: 40, right: 60, bottom: 88, left: 160 },
    width,
    height,
    
    data
  });
};

// loading the data
csv('data.csv')
  .then(loadedData => {
    data = loadedData;
    data.forEach(d => {
			d.budget = +d.budget;
      d.imdb_score = +d.imdb_Score;
      d.gross = +d.gross;
   		
    });
    xColumn = data.columns[1];
    yColumn = data.columns[0];
  	zColumn = data.columns[2];
  
  
    render();
  });


