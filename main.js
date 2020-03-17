// setup raw data
var ghurl =
  "https://raw.githubusercontent.com/monkeywithacupcake/covid-19-wa/master/dailydata.json";
fetch(ghurl)
  .then(res => res.json())
  .then(out => {
    console.log("Checkout this JSON! ", out);
    // need to create a list of counties
    // will need to create an object for each county
    // create a date array, positive array, and dead array
  })
  .catch(err => {
    throw err;
  });

var clark = {
  name: "Clark",
  lat: 45.7466,
  lon: -122.5194,
  date: ["2020-03-06","2020-03-13","2020-03-16"],
  positive: [1,2,1],
  deaths: [0,0.0]
};
var grant = {
  name: "Grant",
  lat: 47.1981,
  lon: -119.3732,
  date: ["2020-03-05","2020-03-08","2020-03-13","2020-03-16"],
  positive: [1,0,1,5],
  deaths: [0,1,0,0]
};
var graysharbor = {
  name: "Grays Harbor",
  lat: 46.9954,
  lon: -123.7012,
  date: ["2020-03-11"],
  positive: [1],
  deaths: [0]
};
var island = {
  name: "Island",
  lat: 48.1976,
  lon: -122.5795,
  date: ["2020-03-10","2020-03-12"],
  positive: [1,2],
  deaths: [0,0]
};
var jefferson = {
  name: "Jefferson",
  lat: 47.7425,
  lon: -123.304,
  date: ["2020-03-06","2020-03-13","2020-03-16"],
  positive: [1,1,1],
  deaths: [0,0,0]
};
var king = {
  name: "King",
  lat: 47.548,
  lon: -121.9836,
  date: [
    "2020-02-29",
    "2020-03-01",
    "2020-03-02",
    "2020-03-03",
    "2020-03-04",
    "2020-03-05",
    "2020-03-06",
    "2020-03-07",
    "2020-03-08",
    "2020-03-09",
    "2020-03-10",
    "2020-03-11","2020-03-12","2020-03-13","2020-03-14","2020-03-15","2020-03-16"
  ],
  positive: [3, 7, 4, 7, 10, 20, 7, 13, 12,33,74,44,36,58,60,32,68],
  deaths: [1, 1, 3, 3, 2, 1, 1, 2, 2,3,2,4,1,5,3,2,6]
};
var kitsap = {
  name: "Kitsap",
  lat: 47.6477,
  lon: -122.6413,
  date: [
    "2020-03-09", "2020-03-10","2020-03-13","2020-03-15","2020-03-16"
  ],
  positive: [1,1,1,2,2],
  deaths: [0,0,0,0,0]
};
var kittitas = {
  name: "Kittitas",
  lat: 46.9832,
  lon: -120.4170,
  date: [
    "2020-03-09",
    "2020-03-11"
  ],
  positive: [1,2],
  deaths: [0,0]
};
var klickitat = {
  name: "Klickitat",
  lat: 45.8888,
  lon: -120.9711,
  date: [
    "2020-03-14"
  ],
  positive: [1],
  deaths: [0]
};
var lewis = {
  name: "Lewis",
  lat: 46.6195,
  lon: -122.4555,
  date: [
    "2020-03-15"
  ],
  positive: [1],
  deaths: [0]
};
var pierce = {
  name: "Pierce",
  lat: 47.067,
  lon: -122.1295,
  date: ["2020-03-06", "2020-03-07", "2020-03-08","2020-03-09","2020-03-10","2020-03-12","2020-03-13","2020-03-14","2020-03-15"],
  positive: [1, 2, 4,7,3,2,7,3,9],
  deaths: [0, 0, 0,0,0,0,0,0,0]
};
var skagit = {
  name: "Skagit",
  lat: 48.4242,
  lon: -121.7114,
  date: ["2020-03-10","2020-03-12","2020-03-13","2020-03-16"],
  positive: [1,1,2,3],
  deaths: [0,0,0,0]
};
var snohomish = {
  name: "Snohomish",
  lat: 48.033,
  lon: -121.8339,
  date: [
    "2020-01-21",
    "2020-02-28",
    "2020-03-01",
    "2020-03-02",
    "2020-03-03",
    "2020-03-04",
    "2020-03-05",
    "2020-03-07",
    "2020-03-08",
    "2020-03-09","2020-03-10","2020-03-11","2020-03-12","2020-03-13","2020-03-14","2020-03-16"
  ],
  positive: [1, 1, 1, 1, 2, 4, 9, 8, 4,10,15,19,33,30,16,46],
  deaths: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1,1,1,0,0,0,0]
};
var spokane = {
  name: "Spokane",
  lat: 47.658,
  lon: -117.4225,
  date: ["2020-03-14"],
  positive: [3],
  deaths: [0]
};

var thurston = {
  name: "Thurston",
  lat: 46.8646,
  lon: -122.7696,
  date: ["2020-03-11","2020-03-14","2020-03-16"],
  positive: [1,2,2],
  deaths: [0,0,0]
};
var whatcom = {
  name: "Whatcom",
  lat: 48.8787,
  lon: -121.9719,
  date: ["2020-03-11","2020-03-13","2020-03-16"],
  positive: [1,1,1],
  deaths: [0,0,0]
};
var yakima = {
  name: "Yakima",
  lat: 46.5436,
  lon: -120.7558,
  date: ["2020-03-11","2020-03-13","2020-03-16"],
  positive: [2,1,1],
  deaths: [0,0,0]
};

var counties = [clark, grant, graysharbor, island, jefferson, king, kitsap, kittitas, klickitat,lewis,pierce, skagit, snohomish, spokane, thurston,whatcom,yakima];
function mySum(total, num) {
  return total + num;
}
var totalpos = counties.map(function(d) {
  return `<li>${d.name}: ${d.positive.reduce(mySum)}</li>`;
});
var totaldeath = counties.map(function(d) {
  return `<li>${d.name}: ${d.deaths.reduce(mySum)}</li>`;
});

// make the lists
var poslist = document.getElementById("poslist");
var deathlist = document.getElementById("deathlist");
deathlist.innerHTML = totaldeath.join("");
poslist.innerHTML = totalpos.join("");

// make the plots
var dates = Array.prototype.concat.apply(
  [],
  counties.map(function(d) {
    return d.date;
  })
);

var set = new Set(dates);
dates = Array.from(set);
dates.sort();
console.log(dates);

var positive = [];
var deaths = [];

for (var i = 0; i < dates.length; ++i) {
  positive[i] = i == 0 ? 0 : positive[i - 1];
  deaths[i] = i == 0 ? 0 : deaths[i - 1];
  counties.forEach(function(cty) {
    for (var coi = 0; coi < cty.date.length; ++coi) {
      if (cty.date[coi] == dates[i]) {
        positive[i] = positive[i] + cty.positive[coi];
        deaths[i] = deaths[i] + cty.deaths[coi];
      }
    }
  });
}

// show a cumulative chart of all in wa
var data = [
  { x: dates, y: positive, name: "Confirmed", type: "scatter" },
  { x: dates, y: deaths, name: "Dead", type: "scatter" }
];

var layout = {
  title: {
    text: "COVID-19 in Washington state over time (cumulative)",
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
  }
};

Plotly.newPlot("walineplotdiv", data, layout);

// show positive cumulative by county
var barpositive = Array.prototype.concat.apply(
  [],
  counties.map(function(d) {
    return { x: d.date, y: d.positive, name: d.name, type: "bar" };
  })
);
layout.title = "COVID-19 Confirmed in Washington state by county (only new)";

Plotly.newPlot("posbycounty", barpositive, layout);

// death by county
var bardead = Array.prototype.concat.apply(
  [],
  counties.map(function(d) {
    return { x: d.date, y: d.deaths, name: d.name, type: "bar" };
  })
);
layout.title = "COVID-19 Deaths in Washington state by county (only new)";

Plotly.newPlot("deathbycounty", bardead, layout);

// build a map

var ctyName = [];
var ctyLon = [];
var ctyLat = [];
var ctyPos = [];
var ctyDea = [];
var ctyCfr = []; // case fatality rate is dead/positive
var hoverText = [];
color = [, "rgb(255,65,54)", "rgb(133,20,75)", "rgb(255,133,27)", "lightgrey"];

for (var i = 0; i < counties.length; i++) {
  var pos = counties[i].positive.reduce(mySum);
  var dea = counties[i].deaths.reduce(mySum);
  var currentText =
    counties[i].name +
    " Pos: " +
    pos +
    " Dead: " +
    dea +
    " CFR: " +
    (dea / pos).toFixed(2) * 100 +
    "%";
  ctyName.push(counties[i].name);
  ctyLon.push(counties[i].lon);
  ctyLat.push(counties[i].lat);
  ctyPos.push(pos);
  ctyDea.push(dea);
  ctyCfr.push(Math.max((dea / pos) * 100, pos));
  hoverText.push(currentText);
}
var mdata = [
  {
    type: "scattergeo",
    locationmode: "USA-states",
    lat: ctyLat,
    lon: ctyLon,
    hoverinfo: "text",
    text: hoverText,
    marker: {
      size: Math.log(ctyCfr),
      line: {
        color: "black",
        width: 2
      }
    }
  }
];

var mlayout = {
  title: "MAP - Current WA COVID-19 (scale by case fatality rate)",
  showlegend: false,
  geo: {
    scope: "usa",
    center: {
      lon: -120,
      lat: 47
    },
    lonaxis: { range: [-116, -125] },
    lataxis: { range: [45, 50] },
    showland: true,
    landcolor: "rgb(217, 217, 217)",
    subunitcolor: "rgb(250,255,255)",
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

// add totals to title
var totPos = ctyPos.reduce(mySum);
var totDea = ctyDea.reduce(mySum);
document.getElementById("wacounts").innerHTML =
  totPos + " Cases & " + totDea + " Deaths";
document.getElementById("wacfr").innerHTML =
  "Case Fatality Rate: " + ((totDea / totPos) * 100).toFixed(1) + "%";
