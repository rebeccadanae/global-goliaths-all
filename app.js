
!(function() {
  function analytics(action) {
    var label =
      1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "null";
    window.dataLayer.push({
      event: "Interactive",
      category: "Interactive",
      action: action,
      label: label
    });
  }
  function app() {
    var legend_container = d3.select("#legend-container-1-1")
      .append("svg")
        .attr("width", 50)
        .attr("height", 50)

        var us_text = legend_container
        .append("text")
        .text("U.S. Parents")
        .attr("y", 25)
        .attr("x", 23);

        var foreign_text = legend_container
        .append("text")
        .text("U.S. Affiliates of Foreign MNCs")
        .attr("y", 25)
        .attr("x", 147);

        legend_container
        .append("rect")
        .attr("width", 16)
        .attr("height", 16)
        .attr("y", 13)
        .attr("fill", "#003a70")

        legend_container
        .append("rect")
        .attr("width", 16)
        .attr("height", 16)
        .attr("y", 13)
        .attr("x", 125)
        .attr("fill", "#8ac6ff")

    var legend_svg = d3.select()
    var svg = d3.select("#graphsvg"),
        margin = {top: 20, right: 50, bottom: 20, left: 50},
        width = parseInt(d3.select('#graphsvg').style('width'))


        console.log(width)
        var width = width - margin.left - margin.right,
        graphRatio = .45,
        height = width * graphRatio;

        ;
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    // Parse the Data
    d3.csv("new_data.csv", function(data) {

      // List of subgroups = header of the csv files = soil condition here
      var subgroups = data.columns.slice(1)

      // List of groups = species here = value of the first column called group -> I show them on the X axis
      var groups = d3.map(data, function(d){return(d.group)}).keys()



      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0 ]);
      var formatPercent = d3.format(".0%");

      svg.append("g")
      .attr("transform", "translate(" + margin.left + "," +  margin.top + ")")
        .call(d3.axisLeft(y).tickSizeInner([-width]).tickSizeOuter(0).ticks(5).tickFormat(formatPercent))
        .attr("class", "y-axis")
      // color palette = one color per subgroup
      var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#003a70','#8ac6ff'])

      //stack the data? --> stack per subgroup
      var stackedData = d3.stack()
        .keys(subgroups)
        (data)
        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
/*
            svg.append("text")
              .attr("text-anchor", "middle")
              .attr("transform", "rotate(-90)")
              .attr("x", -(height+ margin.top + margin.bottom)/2)
              .attr("y", margin.left/4)
              .text("Percent of activity accounted for by multinational firms")
              .style("font-weight", 700)
*/

        svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
          .call(d3.axisBottom(x).tickSizeOuter(0).tickSize(0))
          .attr("class", "x-axis")
          .selectAll("text")
          .attr("y", margin.bottom-5)
          .attr("x", -5)
          .attr("dy", ".35em")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end");
      // Show the bars
      svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
          .attr("fill", function(d) { return color(d.key); })
          .selectAll("rect")
          // enter a second time = loop subgroup per subgroup to add all rectangles
          .data(function(d) {
            return d; })
          .enter().append("rect")
          .attr("id", function(d) { return d.key})
            .attr("x", function(d) { return x(d.data.group); })
            .attr("transform", "translate(" + margin.left + "," +  margin.top + ")")
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("class", "bar")
            .attr("width",x.bandwidth())
            .on("mousemove", function(d){

              d3.select(this)
              .attr("fill", function(d){
                if(d[0] == 0){
                  us_text
                  .style("font-weight", "700")
                  return "#022A4E"
                }else{
                  foreign_text
                  .style("font-weight", "700")

                  return "#5AADF6"
                }
              });





          // Replace hard coded vals (50, 90) with 50% of the tooltip wioth and height + a top buffer
                tooltip
                  .style("left", d3.event.pageX -80 + "px")
                  .style("top", d3.event.pageY - 60 + "px")
                  .style("display", "inline-block")
                  .html((d.data.group) + "<br><span>" + ((d[1]-d[0])*100).toFixed(1) + "% </span>");
            })
        		.on("mouseout", function(d){

              d3.select(this)
              .attr("fill", function(d){
                if(d[0] == 0){
                  us_text
                  .style("font-weight", "400")
                  return "#003a70"
                }else{
                  foreign_text
                  .style("font-weight", "400")
                  return "#8ac6ff"

                }
              });

              tooltip.style("display", "none");


          });

    })

  }



  document.addEventListener(
    "readystatechange",
    function() {
      "interactive" === document.readyState && app();
    },
    !1
  );
})();
//# sourceMappingURL=./app.js.map
