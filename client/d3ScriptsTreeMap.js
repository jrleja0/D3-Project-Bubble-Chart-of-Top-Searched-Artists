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

    const root = d3.hierarchy(artistsData)  //  ?? {children: artistsData} ??
      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
      .sum(sumBySize)
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);

    const cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });
    // ......
    // ......

  });

};
