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

      const nodes = svg.selectAll('g')
        .data(pack(root).leaves())
        .enter()
        .append('g')
        .attr('class', 'node-bubbleChart')
        .attr('transform', node => `translate(${node.x},${node.y})`);

      nodes.append('title')
        .text(node => `#${node.data.rank}: ${node.data.name}`);

      nodes.append('circle')
        .attr('id', node => node.id + '-bubbleChart')
        .attr('r', node => node.r)
        .style('fill', node => color(node.value));

      nodes.append('clipPath')
        .attr('id', node => 'clip-bubbleChart-' + node.id)
        .append('use')
        .attr('href', node => `#${node.id}-bubbleChart`);

      nodes.append('image')
        .attr('x', node => -(node.r * 1.6))
        .attr('y', node => -(node.r * 1.6))
        .attr('width', node => (node.r * 3.5) + 'px')
        .attr('height', node => (node.r * 3.5) + 'px')
        .attr('href', node => `assets/artworks/${node.id}.jpg`)
        .attr('clip-path', node => `url(#clip-bubbleChart-${node.id})`);

      nodes.append('text')
        .attr('class', 'artist-rank')
        .attr('fill', 'transparent')
        .attr('x', 0)
        .attr('y', 0)
        .attr('font-size', node => (node.data.rank > 6 ? 400 / (node.data.rank / 2.5) : 400 / 2.5))
        .text(node => node.data.rank);

      nodes.append('a')
        .attr('href', node => 'https://www.google.com/search?q=' + node.data.name)
        .append('text')
        .attr('clip-path', node => `url(#clip-bubbleChart-${node.id})`)
        .attr('fill', node => {
          const namesFontBlack = ['TakashiMurakami'];
          return namesFontBlack.indexOf(node.id) !== -1 ? 'black' : 'white';
        })
        .selectAll('tspan')
        .data(node => node.data.name.split(' '))
        .enter()
        .append('tspan')
        .attr('x', 0)
        .attr('y', (nameData, i, fullNameTSpans) => 15 + (i - fullNameTSpans.length / 2) * 15)  //  for example, nameData = Pablo;  i = 0; and fullNameData = ["Pablo", "Picasso"];
        .text(nameData => nameData);

    }
  );
};

export default makeChart;
