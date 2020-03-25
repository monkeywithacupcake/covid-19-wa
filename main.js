// setup raw data
//var ghurl =
//"https://raw.githubusercontent.com/monkeywithacupcake/covid-19-wa/master/dailydata.json";
//fetch(ghurl)
//  .then(res => res.json())
//  .then(out => {
//    console.log("Checkout this JSON! ", out);
// need to create a list of counties
// will need to create an object for each county
// create a date array, positive array, and dead array
//  })
//  .catch(err => {
//    throw err;
//  });
var adams = {
  name: "Adams",
  lat: 46.9272,
  lon: -118.511,
  date: ["2020-03-21"],
  positive: [1],
  deaths: [0]
};
var benton = {
  name: "Benton",
  lat: 46.3166,
  lon: -119.5022,
  date: [
    "2020-03-15",
    "2020-03-19",
    "2020-03-20",
    "2020-03-21",
    "2020-03-23",
    "2020-03-24"
  ], // death noted on 3/18 to have happened over the weekend, attrib to 3/15
  positive: [1, 1, 1, 5, 2, 2],
  deaths: [1, 1, 0, 1, 0, 0]
};
var chelan = {
  name: "Chelan",
  lat: 47.9445,
  lon: -120.6749,
  date: ["2020-03-17", "2020-03-20", "2020-03-23", "2020-03-24"],
  positive: [2, 1, 4, 3],
  deaths: [0, 0, 0, 1]
};
var clallam = {
  name: "Clallam",
  lat: 48.0405,
  lon: -124.0168,
  date: ["2020-03-18", "2020-03-20", "2020-03-23"],
  positive: [1, 1, 2],
  deaths: [0, 0, 0]
};
var clark = {
  name: "Clark",
  lat: 45.7466,
  lon: -122.5194,
  date: [
    "2020-03-06",
    "2020-03-13",
    "2020-03-16",
    "2020-03-17",
    "2020-03-19",
    "2020-03-20",
    "2020-03-21",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [1, 2, 1, 0, 0, 3, 3, 3, 3],
  deaths: [0, 0, 2, 1, 1, 0, 0, 0, 0] // mar 19 death reported mar 23
};
var columbia = {
  name: "Columbia",
  lat: 46.2775,
  lon: -117.8143,
  date: ["2020-03-19"],
  positive: [1],
  deaths: [0]
};
var cowlitz = {
  name: "Cowlitz",
  lat: 46.1746,
  lon: -122.7747,
  date: ["2020-03-20", "2020-03-23"],
  positive: [2, 1],
  deaths: [0, 0]
};
var douglas = {
  name: "Douglas",
  lat: 47.7791,
  lon: -119.7475,
  date: ["2020-03-23", "2020-03-24"],
  positive: [1, 1],
  deaths: [0, 0]
};
var franklin = {
  name: "Franklin",
  lat: 46.4937,
  lon: -118.8672,
  date: ["2020-03-15", "2020-03-17", "2020-03-22", "2020-03-23", "2020-03-24"],
  positive: [1, 1, 2, 2, 1],
  deaths: [0, 0, 0, 0, 0]
};
var grant = {
  name: "Grant",
  lat: 47.1981,
  lon: -119.3732,
  date: [
    "2020-03-05",
    "2020-03-08",
    "2020-03-13",
    "2020-03-16",
    "2020-03-19",
    "2020-03-20",
    "2020-03-21",
    "2020-03-22",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [1, 0, 1, 5, 1, 3, 7, 5, 2, 2],
  deaths: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
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
  // updates from Island are sporadic
  name: "Island",
  lat: 48.1976,
  lon: -122.5795,
  date: ["2020-03-10", "2020-03-12", "2020-03-19", "2020-03-23"],
  positive: [1, 2, 14, 2],
  deaths: [0, 0, 1, 0]
};
var jefferson = {
  name: "Jefferson",
  lat: 47.7425,
  lon: -123.304,
  date: [
    "2020-03-06",
    "2020-03-13",
    "2020-03-16",
    "2020-03-17",
    "2020-03-21",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [1, 1, 1, 1, 3, 1, 1],
  deaths: [0, 0, 0, 1, 0, 0, 0]
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
    "2020-03-11",
    "2020-03-12",
    "2020-03-13",
    "2020-03-14",
    "2020-03-15",
    "2020-03-16",
    "2020-03-17",
    "2020-03-18",
    "2020-03-19",
    "2020-03-20",
    "2020-03-21",
    "2020-03-22",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [
    3,
    7,
    4,
    7,
    10,
    20,
    7,
    13,
    12,
    33,
    74,
    44,
    36,
    58,
    60,
    32,
    68,
    30,
    44,
    131,
    100,
    141,
    106,
    130,
    107
  ],
  deaths: [
    1,
    1,
    3,
    3,
    2,
    1,
    1,
    2,
    2,
    3,
    2,
    4,
    1,
    5,
    3,
    2,
    6,
    3,
    10,
    4,
    7,
    8,
    1,
    12,
    7
  ]
};
var kitsap = {
  name: "Kitsap",
  lat: 47.6477,
  lon: -122.6413,
  date: [
    "2020-03-09",
    "2020-03-10",
    "2020-03-13",
    "2020-03-15",
    "2020-03-16",
    "2020-03-18",
    "2020-03-19",
    "2020-03-21",
    "2020-03-22",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [1, 1, 1, 2, 2, 2, 3, 3, 3, 2, 1],
  deaths: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};
var kittitas = {
  name: "Kittitas",
  lat: 46.9832,
  lon: -120.417,
  date: [
    "2020-03-09",
    "2020-03-11",
    "2020-03-18",
    "2020-03-22",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [1, 2, 1, 1, 1, 1],
  deaths: [0, 0, 1, 0, 0, 0]
};
var klickitat = {
  name: "Klickitat",
  lat: 45.8888,
  lon: -120.9711,
  date: ["2020-03-14", "2020-03-19", "2020-03-21"],
  positive: [1, 1, 2],
  deaths: [0, 0, 0]
};
var lewis = {
  name: "Lewis",
  lat: 46.6195,
  lon: -122.4555,
  date: ["2020-03-15", "2020-03-19"],
  positive: [1, 1],
  deaths: [0, 0]
};
var lincoln = {
  name: "Lincoln",
  lat: 47.5321,
  lon: -118.4701,
  date: ["2020-03-14"],
  positive: [1],
  deaths: [0]
};
var mason = {
  name: "Mason",
  lat: 47.4251,
  lon: -123.1951,
  date: ["2020-03-17", "2020-03-23"],
  positive: [1, 1],
  deaths: [0, 0]
};
var pierce = {
  name: "Pierce",
  lat: 47.067,
  lon: -122.1295,
  date: [
    "2020-03-06",
    "2020-03-07",
    "2020-03-08",
    "2020-03-09",
    "2020-03-10",
    "2020-03-12",
    "2020-03-13",
    "2020-03-14",
    "2020-03-15",
    "2020-03-16",
    "2020-03-18",
    "2020-03-19",
    "2020-03-20",
    "2020-03-21",
    "2020-03-22",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [1, 2, 4, 7, 3, 2, 7, 3, 9, 6, 12, 19, 8, 12, 12, 19, 12],
  deaths: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
};
var sanjuan = {
  name: "San Juan",
  lat: 48.6118,
  lon: -122.9603,
  date: ["2020-03-20"],
  positive: [1],
  deaths: [0]
};
var skagit = {
  name: "Skagit",
  lat: 48.4242,
  lon: -121.7114,
  date: [
    "2020-03-10",
    "2020-03-12",
    "2020-03-13",
    "2020-03-16",
    "2020-03-17",
    "2020-03-18",
    "2020-03-19",
    "2020-03-21",
    "2020-03-23"
  ],
  positive: [1, 1, 2, 3, 2, 5, 4, 14, 16],
  deaths: [0, 0, 0, 0, 0, 0, 0, 0, 1]
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
    "2020-03-09",
    "2020-03-10",
    "2020-03-11",
    "2020-03-12",
    "2020-03-13",
    "2020-03-14",
    "2020-03-16",
    "2020-03-17",
    "2020-03-18",
    "2020-03-19",
    "2020-03-20",
    "2020-03-21",
    "2020-03-22",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [
    1,
    1,
    1,
    1,
    2,
    4,
    9,
    8,
    4,
    10,
    15,
    19,
    33,
    30,
    16,
    46,
    66,
    44,
    38,
    47,
    52,
    0,
    72,
    95
  ],
  deaths: [
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    2,
    0,
    1,
    2,
    3,
    0,
    2,
    2,
    0
  ]
};
var spokane = {
  name: "Spokane",
  lat: 47.658,
  lon: -117.4225,
  date: [
    "2020-03-14",
    "2020-03-17",
    "2020-03-18",
    "2020-03-19",
    "2020-03-21",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [3, 1, 1, 4, 7, 13, 4],
  deaths: [0, 0, 0, 0, 0, 0, 0]
};
var stevens = {
  name: "Stevens",
  lat: 48.4558,
  lon: -117.906,
  date: ["2020-03-20"],
  positive: [1],
  deaths: [0]
};
var thurston = {
  name: "Thurston",
  lat: 46.8646,
  lon: -122.7696,
  date: [
    "2020-03-11",
    "2020-03-14",
    "2020-03-16",
    "2020-03-18",
    "2020-03-20",
    "2020-03-21",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [1, 2, 2, 1, 2, 2, 1, 3],
  deaths: [0, 0, 0, 1, 0, 0, 0, 0]
};
var wallawalla = {
  name: "Walla Walla",
  lat: 46.237,
  lon: -118.5855,
  date: ["2020-03-21", "2020-03-24"],
  positive: [1, 1],
  deaths: [0, 0]
};
var whatcom = {
  name: "Whatcom",
  lat: 48.8787,
  lon: -121.9719,
  date: [
    "2020-03-11",
    "2020-03-13",
    "2020-03-16",
    "2020-03-17",
    "2020-03-19",
    "2020-03-20",
    "2020-03-21",
    "2020-03-23",
    "2020-03-24"
  ],
  positive: [1, 1, 1, 4, 0, 3, 4, 34, 16],
  deaths: [0, 0, 0, 0, 1, 1, 0, 0, 0]
};
var whitman = {
  name: "Whitman",
  lat: 46.8363,
  lon: -117.5887,
  date: ["2020-03-23"],
  positive: [2],
  deaths: [0]
};
var yakima = {
  name: "Yakima",
  lat: 46.5436,
  lon: -120.7558,
  date: [
    "2020-03-11",
    "2020-03-13",
    "2020-03-16",
    "2020-03-17",
    "2020-03-18",
    "2020-03-20",
    "2020-03-21",
    "2020-03-24"
  ],
  positive: [2, 1, 1, 1, 4, 11, 12, 15],
  deaths: [0, 0, 0, 1, 0, 0, 0, 0]
};

var counties = [
  adams,
  benton,
  chelan,
  clallam,
  clark,
  columbia,
  douglas,
  franklin,
  grant,
  graysharbor,
  island,
  jefferson,
  king,
  kitsap,
  kittitas,
  klickitat,
  lewis,
  lincoln,
  mason,
  pierce,
  sanjuan,
  skagit,
  snohomish,
  spokane,
  stevens,
  thurston,
  wallawalla,
  whatcom,
  whitman,
  yakima
];
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
var ddates = Array.prototype.concat.apply(
  [],
  counties.map(function(d) {
    return d.date;
  })
);

var set = new Set(ddates);
ddates = Array.from(set);
ddates.sort();
var dates = [];
var startDate = ddates[0];
var endDate = ddates[ddates.length - 1];
var dateMove = new Date(ddates[0]);
var strDate = startDate;
while (strDate < endDate) {
  var strDate = dateMove.toISOString().slice(0, 10);
  dates.push(strDate);
  dateMove.setDate(dateMove.getDate() + 1);
}

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

//
// and let us make a hypothetical case estimate based on deaths
// cdc says that median of 13 days to death (for those that die)
// source: https://wwwnc.cdc.gov/eid/article/26/6/20-0320_article
// fatality rates are all over the place, assume 3%
// -> for each death count back 13 days and multiply by 33
var hypothetical = [];
var hypotheticalone = [];
for (var i = 0; i < dates.length - 13; ++i) {
  hypothetical[i] = i == 0 ? 0 : 33 * deaths[i + 13];
  hypotheticalone[i] = i == 0 ? 0 : 100 * deaths[i + 13];
}
// and let us calculate the current doubling rate (for the past 7 days).
var doubling = [];
function getIndexToIns(arr, num) {
  return arr
    .concat(num)
    .sort((a, b) => a - b)
    .indexOf(num);
}
for (var i = positive.length - 7; i < positive.length; ++i) {
  var half = positive[i] / 2;
  var match = getIndexToIns(positive, half - 1);
  doubling[positive.length - i - 1] = i - match;
}
console.log(doubling);
// show a cumulative chart of all in wa
var data = [
  { x: dates, y: positive, name: "Confirmed", type: "scatter" },
  { x: dates, y: deaths, name: "Dead", type: "scatter" }
];

var layout = {
  title: {
    text: "COVID-19 in Washington state over time",
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

Plotly.newPlot("walineplotdiv", data, layout);
// show a cumulative chart of all in wa
var data = [
  { x: dates, y: positive, name: "Confirmed", type: "scatter" },
  { x: dates, y: deaths, name: "Dead", type: "scatter" },
  {
    x: dates,
    y: hypothetical,
    name: "Hypothetical Cases @ 3% Fatality",
    type: "scatter"
  },
  {
    x: dates,
    y: hypotheticalone,
    name: "Hypothetical Cases @ 1% Fatality",
    type: "scatter"
  }
];

var layout = {
  title: {
    text: "COVID-19 in Washington state w/hypothetical cases",
    font: {
      family: "Courier New, monospace",
      size: 24
    },
    xref: "paper",
    x: 0.05
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
  annotations: [
    {
      xref: "paper",
      yref: "paper",
      x: 0.5,
      y: -0.1,
      xanchor: "center",
      yanchor: "top",
      text:
        "Hypothetical based only on reported deaths and assumes 13 days median to death source: https://wwwnc.cdc.gov/eid/article/26/6/20-0320_article",
      showarrow: false,
      font: {
        family: "Arial",
        size: 10,
        color: "rgb(150,150,150)"
      }
    }
  ]
};

Plotly.newPlot("walineplotdivwhypo", data, layout);

// show positive cumulative by county
var barpositive = Array.prototype.concat.apply(
  [],
  counties.map(function(d) {
    return { x: d.date, y: d.positive, name: d.name, type: "bar" };
  })
);
layout.title = "COVID-19 Confirmed in Washington state by county (only new)";
layout.barmode = "stack";
layout.annotations = [];
layout.shapes = [];
layout.legend = { orientation: "h" };
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
        title: "Confirmed Positive"
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

function average(array) {
  return Math.round(array.reduce((acc, next) => acc + next) / array.length);
}
// add totals to title
var totPos = ctyPos.reduce(mySum);
var totDea = ctyDea.reduce(mySum);

document.getElementById("wacounts").innerHTML =
  totPos + " Cases & " + totDea + " Deaths";
document.getElementById("wacfr").innerHTML =
  "There are positive cases in " +
  counties.length +
  " of 39 WA counties. The current doubling rate is " +
  doubling[0] +
  " days. The average doubling rate for the past week has been " +
  average(doubling) +
  " days. The statewide Case Fatality Rate (CFR) is " +
  ((totDea / totPos) * 100).toFixed(1) +
  "%; CFR by county is on the map below. Hypothetical cases on " +
  dates[dates.length - 14] +
  " are estimated at: " +
  hypothetical[hypothetical.length - 1] +
  " assuming a 3% death rate and " +
  hypotheticalone[hypotheticalone.length - 1] +
  " assuming a 1% death rate. This estimate is based of of the CDC estimate of median of 13 days to death (for those that die)";
