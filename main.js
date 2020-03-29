// get the paths to github data
var foverall =
  "https://raw.githubusercontent.com/monkeywithacupcake/covid-19-wa/master/wacounty - overall.csv";
var fpositive =
  "https://raw.githubusercontent.com/monkeywithacupcake/covid-19-wa/master/wacounty - positive.csv";
var fdeath =
  "https://raw.githubusercontent.com/monkeywithacupcake/covid-19-wa/master/wacounty - deaths.csv";
// across each of these files, the key is tag
// fpositive and fdeath have dates in header row

// if foverall positive > 0 then, include it
var ncty = [];
var npos = [];
var ndea = [];
var nday = [];
var ndata = [];
var ctable =
  "<tr><th>County</th><th>Positive</th><th>Deaths</th><th>Negative</th><th>Pending</th><th>Portion of Population Tested</th></tr>";
//reusable graph layout
var layout = {
  title: {
    text: "",
    font: {
      family: "Courier New, monospace",
      size: 24
    },
    xref: "paper",
    x: 0.05
  },
  xaxis: {
    title: {
      text: "Date",
      font: {
        family: "Courier New, monospace",
        size: 18,
        color: "#7f7f7f"
      }
    }
  },
  yaxis: {
    title: {
      text: "People",
      font: {
        family: "Courier New, monospace",
        size: 18,
        color: "#7f7f7f"
      }
    }
  },
  autosize: false,
  width: 800,
  height: 600,
  margin: {
    l: 100,
    r: 100,
    b: 100,
    t: 100,
    pad: 4
  }
};
// reusable functions
function mySum(total, num) {
  return total + num;
}
function average(array) {
  return Math.round(array.reduce((acc, next) => acc + next) / array.length);
}
function getIndexToIns(arr, num) {
  return arr
    .concat(num)
    .sort((a, b) => a - b)
    .indexOf(num);
}

// start reading in data and making plots
d3.csv(foverall).then(function (fover) {
  d3.csv(fpositive).then(function (fpos) {
    nday = Object.keys(fpos[0]);
    nday.shift();
    d3.csv(fdeath).then(function (fdea) {
      fover.forEach(function (oitem) {
        // for each item in overall

        var resultpos = fpos.filter(function (p) {
          return p.tag === oitem.tag;
        });
        var resultdea = fdea.filter(function (p) {
          return p.tag === oitem.tag;
        });
        oitem.poslist = Object.values(resultpos[0]);
        oitem.poslist.shift();
        oitem.dealist = Object.values(resultdea[0]);
        oitem.dealist.shift();
        // several things need to be numbers instead of strings
        oitem.hospitalized = +oitem.hospitalized;
        oitem.lat = +oitem.lat;
        oitem.lon = +oitem.lon;
        oitem.positive = +oitem.positive;
        if (oitem.positive > 0) {
          ncty.push(oitem.tag); // add to ncty
        }
        oitem.deaths = +oitem.deaths;
        oitem.poslist = oitem.poslist.map(Number);
        oitem.dealist = oitem.dealist.map(Number);
        ndata[oitem.tag] = oitem;
        // get the summary graphics
        for (var i = 0; i < oitem.poslist.length; ++i) {
          npos[i] =
            typeof npos[i] === "undefined"
              ? oitem.poslist[i]
              : npos[i] + oitem.poslist[i];
          ndea[i] =
            typeof ndea[i] === "undefined"
              ? oitem.dealist[i]
              : ndea[i] + oitem.dealist[i];
        }

        // make a nice clean table
        ctable =
          ctable +
          `<tr><td class="heavy">${oitem.County}</td><td>${oitem.positive}</td><td>${oitem.deaths}</td><td>${oitem.negative}</td><td>${oitem.pending}</td><td>${oitem.TR}</td></tr>`;
      }); // this is the end of each oitem

      document.getElementById("ctable").innerHTML =
        `<table class="table table-striped">` + ctable + `</table>`;

      // need to extend the positive and dead to all dates
      var ndates = []; // this will hold actual dates
      var startDate = nday[0];
      var endDate = nday[nday.length - 1];
      var dateMove = new Date(nday[0]);
      var strDate = startDate;
      while (strDate < endDate) {
        var strDate = dateMove.toISOString().slice(0, 10);
        ndates.push(strDate);
        dateMove.setDate(dateMove.getDate() + 1);
      }

      var npositive = [];
      var ndeaths = [];
      for (var i = 0; i < ndates.length; ++i) {
        npositive[i] = i == 0 ? 0 : npositive[i - 1];
        ndeaths[i] = i == 0 ? 0 : ndeaths[i - 1];
        for (var coi = 0; coi < nday.length; ++coi) {
          if (nday[coi] == ndates[i]) {
            npositive[i] = npositive[i] + npos[coi];
            ndeaths[i] = ndeaths[i] + ndea[coi];
          }
        }
      }

      // create a cumulative line plot
      var gdata = [
        { x: ndates, y: npositive, name: "Confirmed", type: "scatter" },
        { x: ndates, y: ndeaths, name: "Dead", type: "scatter" }
      ];
      layout.title.text = "COVID-19 in Washington (cumulative)";
      Plotly.newPlot("walineplotdiv", gdata, layout);

      //
      // and let us make a hypothetical case estimate based on deaths
      // cdc says that median of 13 days to death (for those that die)
      // source: https://wwwnc.cdc.gov/eid/article/26/6/20-0320_article
      // fatality rates are all over the place, assume 3%
      // -> for each death count back 13 days and multiply by 33
      var hypothetical = [];
      var hypotheticalone = [];
      for (var i = 0; i < ndates.length - 13; ++i) {
        hypothetical[i] = i == 0 ? 0 : 33 * ndeaths[i + 13];
        hypotheticalone[i] = i == 0 ? 0 : 100 * ndeaths[i + 13];
      }

      // show a cumulative chart of all in wa w hypot

      var gdata = [
        { x: ndates, y: npositive, name: "Confirmed", type: "scatter" },
        { x: ndates, y: ndeaths, name: "Dead", type: "scatter" },
        {
          x: ndates,
          y: hypothetical,
          name: "Hypothetical Cases @ 3% Fatality",
          type: "scatter"
        },
        {
          x: ndates,
          y: hypotheticalone,
          name: "Hypothetical Cases @ 1% Fatality",
          type: "scatter"
        }
      ];

      Plotly.newPlot("walineplotdivwhypo", gdata, layout);

      // show county graphs
      var barpositive = [];
      var bardead = [];
      var ctyName = [];
      var ctyLon = [];
      var ctyLat = [];
      var ctyPos = [];
      var ctyDea = [];
      var hoverText = [];

      for (const dd in ndata) {
        barpositive.push({
          x: nday,
          y: ndata[dd].poslist,
          name: ndata[dd].County,
          type: "bar"
        });
        bardead.push({
          x: nday,
          y: ndata[dd].dealist,
          name: ndata[dd].County,
          type: "bar"
        });
        ctyName.push(ndata[dd].County);
        ctyLon.push(ndata[dd].lon);
        ctyLat.push(ndata[dd].lat);
        ctyPos.push(ndata[dd].positive);
        ctyDea.push(ndata[dd].deaths);
        hoverText.push(
          ndata[dd].County +
            " Pos: " +
            ndata[dd].positive +
            " Dead: " +
            ndata[dd].deaths +
            " CFR: " +
            ndata[dd].CFR
        );
      }

      // positive by county
      layout.title = "COVID-19 Positive in Washington state by county";
      layout.barmode = "stack";
      layout.annotations = [];
      layout.shapes = [];
      layout.legend = { orientation: "h" };
      Plotly.newPlot("posbycounty", barpositive, layout);
      // death by county
      layout.title = "COVID-19 Deaths in Washington state by county (only new)";
      Plotly.newPlot("deathbycounty", bardead, layout);
      // build a map

      var scl = [
        [0, "#a43506"],
        [0.35, "#bd3d06"],
        [0.5, "#ee4d08"],
        [0.6, "#f75b18"],
        [0.7, "#f86d31"],
        [1, "#fff"]
      ];
      var mdata = [
        {
          type: "scattergeo",
          locationmode: "USA-states",
          lat: ctyLat,
          lon: ctyLon,
          hoverinfo: "text",
          text: hoverText,
          mode: "markers",
          marker: {
            size: 10,
            opacity: 0.8,
            reversescale: true,
            autocolorscale: false,
            symbol: "square",
            line: {
              width: 1,
              color: "rgb(102,102,102)"
            },
            colorscale: scl,
            cmin: 0,
            color: ctyPos,
            colorbar: {
              title: "Positive"
            }
          }
        }
      ];

      var mlayout = {
        title: {
          text: "MAP - Current WA COVID-19",
          font: {
            family: "Courier New, monospace",
            size: 24
          },
          xref: "paper",
          x: 0.05
        },
        showlegend: false,
        geo: {
          scope: "usa",
          center: {
            lon: -120.7,
            lat: 47.7
          },
          lonaxis: { range: [-117, -124.2] },
          lataxis: { range: [45.6, 49.2] },
          showland: true,
          landcolor: "rgb(217, 217, 217)",
          subunitcolor: "rgb(55,55,55)",
          countrycolor: "rgb(255,255,255)"
        }
      };
      Plotly.newPlot(
        "map",
        mdata,
        mlayout,
        { showLink: false },
        { displayModeBar: true }
      );

      // overall calculations
      // and let us calculate the current doubling rate (for the past 7 days).
      var doubling = [];

      for (var i = npositive.length - 7; i < npositive.length; ++i) {
        var half = npositive[i] / 2;
        var match = getIndexToIns(npositive, half - 1);
        doubling[npositive.length - i - 1] = i - match;
      }

      // add totals to title
      var totPos = ctyPos.reduce(mySum);
      var totDea = ctyDea.reduce(mySum);

      document.getElementById("wacounts").innerHTML =
        totPos.toLocaleString() +
        " Cases & " +
        totDea.toLocaleString() +
        " Deaths";
      document.getElementById("wacfr").innerHTML =
        "There are positive cases in " +
        ncty.length +
        " of 39 WA counties. The current doubling rate is " +
        doubling[0] +
        " days. The average doubling rate for the past week has been " +
        average(doubling) +
        " days. The statewide Case Fatality Rate (CFR) is " +
        ((totDea / totPos) * 100).toFixed(1) +
        "%; CFR by county is on the map below. Hypothetical cases on " +
        ndates[ndates.length - 14] +
        " are estimated at: " +
        hypothetical[hypothetical.length - 1].toLocaleString() +
        " assuming a 3% death rate and " +
        hypotheticalone[hypotheticalone.length - 1].toLocaleString() +
        " assuming a 1% death rate. This estimate is based of of the CDC estimate of median of 13 days to death (for those that die)";

      //close all data
    });
  });
}); // end of data
