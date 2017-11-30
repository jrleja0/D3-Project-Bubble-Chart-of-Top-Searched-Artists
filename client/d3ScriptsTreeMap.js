const d3 = require('d3');

const makeTreeMap = () => {

  const svg = d3.select('#svgTreeMap'),
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
        .attr('class', 'node-treeMap')
        .attr('transform', node => `translate(${node.x0},${node.y0})`);

      nodes.append('title')
        .text(node => `#${node.data.rank}: ${node.data.name}`);

      nodes.append('rect')
        .attr('id', node => node.id + '-treeMap')
        .attr('width', node => (node.x1 - node.x0))
        .attr('height', node => (node.y1 - node.y0))
        .attr('fill', node => color(node.value))
        .each(node => {
          node.largestSide = (node.x1 - node.x0) >= (node.y1 - node.y0) ?
            'x' : 'y';
        });

      nodes.append('clipPath')
        .attr('id', node => 'clip-treeMap-' + node.id)
        .append('use')
        .attr('xlink:href', node => `#${node.id}-treeMap`)
        .attr('href', node => `#${node.id}-treeMap`);

      nodes.append('image')
        .attr('x', node => (node.largestSide === 'x' ? 0 : -((node.y1 - node.y0) - (node.x1 - node.x0)) / 2))
        .attr('y', node => (node.largestSide === 'y' ? 0 : -((node.x1 - node.x0) - (node.y1 - node.y0)) / 2))
        .attr('width', node => (node.largestSide === 'x' ? node.x1 - node.x0 + 10 : node.y1 - node.y0 + 10))
        .attr('height', node => (node.largestSide === 'y' ? node.y1 - node.y0 + 10 : node.x1 - node.x0 + 10))
        .attr('xlink:href', node => `assets/artworks/${node.id}.jpg`)
        .attr('href', node => `assets/artworks/${node.id}.jpg`)
        .attr('clip-path', node => `url(#clip-treeMap-${node.id})`);

      nodes.append('text')
        .attr('class', 'artist-rank')
        .attr('fill', 'transparent')
        .attr('x', node => (node.x1 - node.x0) / 2)
        .attr('y', node => (node.data.rank > 4 ? (node.y1 - node.y0) / 2 + 20 : (node.y1 - node.y0) / 2 + 30))
        .attr('font-size', node => (node.data.rank > 4 ? 400 / (node.data.rank / 2.5) : 400 / 2.5))
        .text(node => node.data.rank);

      nodes.append('a')
        .attr('xlink:href', node => 'https://www.google.com/search?q=' + node.data.name)
        .attr('href', node => 'https://www.google.com/search?q=' + node.data.name)
        .append('text')
        .attr('clip-path', node => `url(#clip-treeMap-${node.id})`)
        .attr('fill', node => {
          const namesFontBlack = ['Banksy', 'KAWS', 'TakashiMurakami'];
          return namesFontBlack.indexOf(node.id) !== -1 ? 'black' : 'white';
        })
        .selectAll('tspan')
        .data(node => node.data.name.split(' '))
        .enter()
        .append('tspan')
        .attr('x', 45)
        .attr('y', (nameData, i) => 15 + i * 15)
        .text(nameData => nameData);

    }
  );
};

export default makeTreeMap;
