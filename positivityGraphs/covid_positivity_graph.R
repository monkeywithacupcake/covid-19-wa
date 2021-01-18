# looking at positivty
# On May 12, 2020 the World Health Organization (WHO) advised governments 
# before reopening, rates of positivity should remain at 5% or lower for at least 14 days.

library(tidyverse)

sumAndGraph <- function(place) {
  fname <- paste0("https://covidtracking.com/data/download/",place,"-history.csv")
  target <- 0.05 # WHO positivity target
  caption <- "WHO target maximum positivity rate 5% shown as dashed line\nData from covidtracking.com"
  ylim <- c(-0, 0.3)
  title <- paste0("Positivity Rate by Day and Cumulative, ", toupper(place))
  df <- read_csv(fname) %>%
    mutate(daily = ifelse(positiveIncrease < totalTestResultsIncrease, 
                          positiveIncrease/totalTestResultsIncrease, NA),
           cumulative = positive/totalTestResults) %>%
    select(date, daily, cumulative) %>%
    pivot_longer(-date, names_to="period", values_to="positivity")
  
  dfplot <- ggplot(df, aes(date, positivity, color = period)) +
    geom_hline(yintercept = target, lty=2) +
    geom_point(alpha = 0.5) +
    scale_color_manual(values=c("grey3", "hotpink1")) + 
    scale_y_continuous(labels = scales::percent) +
    labs(title = title, 
         subtitle = "zoomed in to 30% and lower", 
         x = "",
         y = "Percent of Tests that are Positive",
         caption = caption) +
    coord_cartesian(ylim = ylim)  +
    theme_minimal() +
    theme(legend.position = "top", legend.title=element_blank())
  ggsave(paste0(place,".png"), dfplot)
  print(dfplot)
}


places <- c("national", "washington")

for(i in 1:length(places)) {
  sumAndGraph(places[i])
}


