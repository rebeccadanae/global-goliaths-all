
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
    figure_11();
    figure_16();
  }

  function figure_11(){
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
    var svg = d3.select("#graph_1_svg"),
        margin = {top: 20, right: 50, bottom: 20, left: 50},
        width = parseInt(d3.select('.graphsvg').style('width'))

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
  function figure_16(){
    var glines
      var mouseG
      var tooltip

      var parseDate = d3.timeParse("%Y")


      var margin = {top: 40, right: 80, bottom: 40, left: 40}

      var width = parseInt(d3.select('#graph_2_svg').style('width')) - margin.left - margin.right
      var height = parseInt(d3.select('#graph_2_svg').style('height')) - margin.top - margin.bottom

      var lineOpacity = 1
      var lineStroke = "2px"

      var axisPad = 6 // axis formatting

      var category = ["Category A", "Category B", "Category C", "Category D", "Category E"]
      // since Category B and E are really close to each other, assign them diverging colors
      var color = d3.scaleOrdinal()
        .domain(category)
        .range(["#003A70", "#f26d00"])

      d3.csv("assets/fig_1-6_data.csv", data => {

        var res = data.map((d,i) => {
          return {
            date : parseDate(d.year),
            category : d.category,
            share : +d.share
          }
        })


        var xScale = d3.scaleTime()
          .domain(d3.extent(res, d=>d.date))
          .range([0, width])



        var yScale = d3.scaleLinear()
          .domain([0, .40])
          .range([height, 0]);

        var svg = d3.select("#graph_2_svg").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var formatPercent = d3.format(".0%");

        // CREATE AXES //
        // render axis first before lines so that lines will overlay the horizontal ticks
        var xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(5)).tickSize(0)
        var yAxis = d3.axisLeft(yScale).ticks(10, "s").tickSize(-width).tickFormat(formatPercent) //horizontal ticks across svg width

        svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
          .call(g => {
            var years = xScale.ticks(d3.timeYear.every(1))
            var xshift = (width/(years.length))/2
            g.selectAll("text").attr("transform", `translate(${xshift}, 0)`) //shift tick labels to middle of interval
              .style("text-anchor", "middle")
              .attr("y", axisPad)


          })

        svg.append("g")
          .attr("class", "y-axis")
          .call(yAxis)
          .call(g => {
            g.selectAll("text")
            .style("text-anchor", "middle")
            .attr("x", -axisPad*2)

            g.selectAll("line")
              .attr('stroke', '#A9A9A9')
              .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
              .attr('opacity', 0.3)

            g.select(".domain").remove()

           })





        // line generator
        var line = d3.line()
          .x(d => xScale(d.date))
          .y(d => yScale(d.share))

        renderChart() // inital chart render (set default to Bidding Exercise 1 data)


        function renderChart() {


          var res_nested = d3.nest() // necessary to nest data so that keys represent each category
            .key(d=>d.category)
            .entries(res)

          // APPEND MULTIPLE LINES //
          var lines = svg.append('g')
            .attr('class', 'lines')

          glines = lines.selectAll('.line-group')
            .data(res_nested).enter()
            .append('g')
            .attr('class', 'line-group')

          glines
            .append('path')
              .attr('class', 'line')
              .attr('d', d => line(d.values))
              .style('stroke', (d, i) => color(i))
              .style('fill', 'none')
              .style('stroke-width', 2)




          // CREATE HOVER TOOLTIP WITH VERTICAL LINE //
          tooltip = d3.select(".graph-container").append("div")
            .attr('class', 'toolTip')
            .style('position', 'absolute')
            .style("background-color", "#e6e6e6")
            .style('padding', 6)
            .style('display', 'none')

          mouseG = svg.append("g")
            .attr("class", "mouse-over-effects");

          mouseG.append("path") // create vertical line to follow mouse
            .attr("class", "mouse-line")
            .style("stroke", "#e6e6e6")
            .style("stroke-width", lineStroke)
            .style("opacity", "0");

          var lines = document.getElementsByClassName('line');

          var mousePerLine = mouseG.selectAll('.mouse-per-line')
            .data(res_nested)
            .enter()
            .append("g")
            .attr("class", "mouse-per-line");



          mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseout', function () { // on mouse out hide line, circles and text
              d3.select(".mouse-line")
                .style("opacity", "0");

              d3.selectAll(".mouse-per-line text")
                .style("opacity", "0");
              d3.selectAll("#tooltip")
                .style('display', 'none')

            })
            .on('mouseover', function () { // on mouse in show line, circles and text
              d3.select(".mouse-line")
                .style("opacity", "1");
          
              d3.selectAll("#tooltip")
                .style('display', 'block')
            })
            .on('mousemove', function () { // update tooltip content, line, circles and text when mouse moves
              var mouse = d3.mouse(this)


              d3.selectAll(".mouse-per-line")
                .attr("transform", function (d, i) {
                  var xDate = xScale.invert(mouse[0]) // use 'invert' to get date corresponding to distance from mouse position relative to svg
                  var bisect = d3.bisector(function (d) { return d.date; }).left // retrieve row index of date on parsed csv
                  var idx = bisect(d.values, xDate);

                  d3.select(".mouse-line")
                    .attr("d", function () {
                      var data = "M" + xScale(d.values[idx].date) + "," + (height);
                      data += " " + xScale(d.values[idx].date) + "," + 0;
                      return data;
                    });
                  return "translate(" + xScale(d.values[idx].date) + "," + height/*yScale(d.values[idx].share)*/ + ")";

                });

              updateTooltipContent(mouse, res_nested)

            })

          }

      function updateTooltipContent(mouse, res_nested) {

        sortingObj = []
        res_nested.map(d => {
          var xDate = xScale.invert(mouse[0])
          var bisect = d3.bisector(function (d) { return d.date; }).left
          var idx = bisect(d.values, xDate)
          sortingObj.push({key: d.values[idx].category, share: d.values[idx].share, year: d.values[idx].date.getFullYear()})
        })

        sortingObj.sort(function(x, y){
           return d3.descending(x.share, y.share);
        })

        var sortingArr = sortingObj.map(d=> d.key)

        var res_nested1 = res_nested.slice().sort(function(a, b){
          return sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key) // rank category based on price of premium
        })
        tooltip.html(sortingObj[0].year)
          .style('display', 'block')
          .style('left', d3.event.pageX + 20+ "px")
          .style('top', d3.event.pageY - 20+ "px")
          .style('font-weight', 700)
          .selectAll()
          .data(res_nested1).enter() // for each category, list out name and price of premium
          .append('div')
          .attr('class', 'dataText')
          .style('color', d => {
            return color(d.key)
          })
          .style('font-size', 20)
          .html(d => {
            var xDate = xScale.invert(mouse[0])
            var bisect = d3.bisector(function (d) { return d.date; }).left
            var idx = bisect(d.values, xDate)
            return d.key + ": " + (d.values[idx].share*100).toFixed() + "%"
          })
      }

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
