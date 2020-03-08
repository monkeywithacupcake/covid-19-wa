// setup raw data
var clark = {
  name: "Clark",
  date: ["2020-03-06"],
  positive: [1],
  deaths: [0]
};
var grant = {
  name: "Grant",
  date: ["2020-03-05"],
  positive: [1],
  deaths: [0]
};
var jefferson = {
  name: "Jefferson",
  date: ["2020-03-06"],
  positive: [1],
  deaths: [0]
};
var snohomish = {
  name: "Snohomish",
  date: [
    "2020-01-21",
    "2020-02-28",
    "2020-03-01",
    "2020-03-02",
    "2020-03-03",
    "2020-03-04",
    "2020-03-05",
    "2020-03-07"
  ],
  positive: [1, 1, 1, 0, 2, 4, 9, 13],
  deaths: [0, 0, 0, 1, 0, 0, 0, 0]
};

var king = {
  name: "King",
  date: [
    "2020-02-29",
    "2020-03-01",
    "2020-03-02",
    "2020-03-03",
    "2020-03-04",
    "2020-03-05",
    "2020-03-06",
    "2020-03-07"
  ],
  positive: [3, 7, 4, 7, 10, 20, 7, 13],
  deaths: [1, 1, 3, 3, 2, 1, 0]
};

var counties = [grant, snohomish, jefferson, king, clark];
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
