const d3 = require('d3');

const makeChart = () => {
  const svg = d3.select('#svgBubbleChart'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

  const color = d3.scaleOrdinal(d3.schemeCategory20c);

  const pack = d3.pack()
    .size([width, height])
    .padding(1.5);

  d3.csv('/assets/topArtists.csv',
    function(dataRow) {
      dataRow.rank = +dataRow.rank;
      if (dataRow.rank) return dataRow;
    },
    function(error, artistsData) {
      if (error) throw error;

      const root = d3.hierarchy({children: artistsData})  //  root.value = 20; each child node .value = 1;
        .sum(data => (artistsData.length + 1) - data.rank)
        .each(node => {
          if (node.data.name) {
            node.id = node.data.name.split(' ').join('');
          }
        });

      const nodes = svg.selectAll('.node')
        .data(pack(root).leaves())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', node => `translate(${node.x},${node.y})`);

      nodes.append('title')
        .text(node => `#${node.data.rank}: ${node.data.name}`);

      nodes.append('circle')
        .attr('id', node => node.id)
        .attr('r', node => node.r)
        .style('fill', node => color(node.value));

      nodes.append('clipPath')
        .attr('id', node => 'clip-' + node.id)
        .append('use')
        .attr('href', node => '#' + node.id);

      nodes.append('image')
        .attr('x', node => -(node.r + 10))
        .attr('y', node => -(node.r + 10))
        .attr('width', node => (node.r * 2 + 20) + 'px')
        .attr('height', node => (node.r * 2 + 20) + 'px')
        .attr('href', node => `assets/artworks/${node.id}.jpg`)
        .attr('clip-path', node => `url(#clip-${node.id})`);

      nodes.append('text')
        .attr('clip-path', node => `url(#clip-${node.id})`)
        .selectAll('tspan')
        .data(node => node.data.name.split(' '))
        .enter()
        .append('tspan')
        .attr('x', 0)
        .attr('y', (nameData, i, fullNameData) => 15 + (i - fullNameData.length / 2) * 15)  //  for example, nameData = Pablo;  i = 0; and fullNameData = ["Pablo", "Picasso"];
        .text(nameData => nameData);

  });

};

export default makeChart;
