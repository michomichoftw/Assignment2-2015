var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5)


console.log("testing0");

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");
//console.log(g);
console.log("testing1");

d3.json("/igMediaLikes", function(error, data) {


console.log("testing2");


//}) end d3.json

  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(data))
      .filter(function(d) { return !d.children; }))
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


  node.append("title")
      .text(function(d) { return d.username; });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      //.attr("class", function(d) { return d.className; })
      .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });

});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(data) {
  var classes = [];

  _.map(data, function(photo) {
    classes.push({
      size: photo.likes.length + 1,
      pic_likes: photo.likes,
      pic_url: photo.url
    });
  });

  return {children: classes};
}


/*
  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}*/

d3.select(self.frameElement).style("height", diameter + "px");