const d3 = require('d3');

const makeChart = () => {
  var svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

  var color = d3.scaleOrdinal(d3.schemeCategory20c);

  var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

  d3.csv('/assets/topArtists.csv',
    function(dataRow) {
      dataRow.rank = +dataRow.rank;
      if (dataRow.rank) return dataRow;
    },
    function(error, artistsData) {
      if (error) throw error;

      var root = d3.hierarchy({children: artistsData})  //  root.value = 20; each child node .value = 1;
        .sum(data => (artistsData.length + 1) - data.rank)
        .each(node => {
          if (node.data.name) {
            node.id = node.data.name;
          }
        });

      var nodes = svg.selectAll('.node')
        .data(pack(root).leaves())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate( ${d.x}, ${d.y} )`);

      nodes.append('title')
        .text(d => `#${d.data.rank}: ${d.id}`);

      nodes.append('circle')
        .attr('id', d => d.id)
        .attr('r', d => d.r)
        .style('fill', d => color(d.value));

      nodes.append('clipPath')
        .attr('id', d => 'clip-' + d.id)
        .append('use')
        .attr('href', d => '#' + d.id);

      nodes.append('text')
        .attr('clip-path', d => `url(#clip- ${d.id} )`)
        .selectAll('tspan')
        .data(d => d.id.split(' '))
        .enter()
        .append('tspan')
        .attr('x', 0)
        .attr('y', (nameData, i, fullNameData) => 15 + (i - fullNameData.length / 2) * 15)  //  for example, nameData = Pablo;  i = 0; and fullNameData = ["Pablo", "Picasso"];
        .text(nameData => nameData);

  });

};

export default makeChart;
