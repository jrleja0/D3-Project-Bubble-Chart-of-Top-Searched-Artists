const d3 = require('d3');

const makeTreeMap = () => {

  const svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height');

  const color = d3.scaleOrdinal(d3.schemeCategory20c);

  const treemap = d3.treemap()
  .tile(d3.treemapSquarify)
  .size([width, height])
  .round(true)
  .paddingInner(1);

  d3.csv('/assets/topArtists.csv',
  function(dataRow) {
    dataRow.rank = +dataRow.rank;
    if (dataRow.rank) return dataRow;
  },
  function(error, artistsData) {
    if (error) throw error;

    const root = d3.hierarchy({children: artistsData})
      .sum(data => (artistsData.length + 1) - data.rank)
      .sort((a, b) => { return b.height - a.height || b.value - a.value; })
      .each(node => {
        if (node.data.name) {
          node.id = node.data.name.split(' ').join('');
        }
      });

    treemap(root);

    const nodes = svg.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', node => `translate(${node.x0},${node.y0})`);

    nodes.append('title')
      .text(node => `#${node.data.rank}: ${node.data.name}`);

    nodes.append('rect')
      .attr('id', node => node.id)
      .attr('width', node => (node.x1 - node.x0))
      .attr('height', node => (node.y1 - node.y0))
      .attr('fill', node => color(node.value))
      .each(node => {
        node.largestSide = (node.x1 - node.x0) >= (node.y1 - node.y0) ?
          'x' : 'y';
      });

    nodes.append('clipPath')
      .attr('id', node => 'clip-' + node.id)
      .append('use')
      .attr('href', node => '#' + node.id);

    nodes.append('image')
      .attr('x', node => { return node.largestSide === 'x' ? '0px' : -((node.x1 - node.x0) * 2.5 / 4) + 'px'; }) // approx. '-200px for largest rects'
      .attr('y', node => { return node.largestSide === 'x' ? -((node.y1 - node.y0) * 2.5 / 4) + 'px' : '0px'; }) // approx. '-200px'
      .attr('width', node => { return node.largestSide === 'x' ?
        (node.x1 - node.x0) + 'px' : (node.x1 - node.x0) * 2.5 + 'px'; })
      .attr('height', node => { return node.largestSide === 'x' ?
        (node.y1 - node.y0) * 2.5 + 'px' : (node.y1 - node.y0) + 'px'; })
      .attr('href', node => `assets/artworks/${node.id}.jpg`)
      .attr('clip-path', node => `url(#clip-${node.id})`);

    nodes.append('text')
      .attr('clip-path', node => `url(#clip-${node.id})`)
      .selectAll('tspan')
      .data(node => node.data.name.split(' '))
      .enter()
      .append('tspan')
      .attr('x', 45)
      .attr('y', (nameData, i) => 15 + i * 15)
      .text(nameData => nameData);

  });

};

export default makeTreeMap;
