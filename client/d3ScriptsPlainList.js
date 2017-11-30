const d3 = require('d3');

const makePlainList = () => {

  const svg = d3.select('#svgPlainList');

  d3.csv('/assets/topArtists.csv',
    function(dataRow) {
      dataRow.rank = +dataRow.rank;
      if (dataRow.rank) return dataRow;
    },
    function(error, artistsData) {
      if (error) throw error;

      const nodes = svg.selectAll('g')
        .data(artistsData)
        .enter()
        .append('g')
        .attr('class', 'node-plainList');

      nodes.append('image')
        .attr('x', 20)
        .attr('y', node => 120 * +node.rank - 100)
        .attr('width', 100)
        .attr('height', 100)
        .attr('xlink:href', node => `assets/artworks/${node.name.split(' ').join('')}.jpg`)
        .attr('href', node => `assets/artworks/${node.name.split(' ').join('')}.jpg`);

      nodes.append('a')
        .attr('xlink:href', node => 'https://www.google.com/search?q=' + node.name)
        .attr('href', node => 'https://www.google.com/search?q=' + node.name)
        .append('text')
        .attr('x', 140)
        .attr('y', node => 120 * +node.rank - 50)
        .attr('font-size', 18)
        .text(node => `#${node.rank}. ${node.name}`);

    }
  );
};

export default makePlainList;
