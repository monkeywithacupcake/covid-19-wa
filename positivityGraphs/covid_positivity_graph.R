# looking at positivty
# On May 12, 2020 the World Health Organization (WHO) advised governments 
# before reopening, rates of positivity should remain at 5% or lower for at least 14 days.

library(tidyverse)

createPositivityPlot <- function(place) {
  fname <- paste0("https://covidtracking.com/data/download/",place,"-history.csv")
  target <- 0.05 # WHO positivity target
  caption <- "WHO target maximum positivity rate 5% shown as dashed line\nData from covidtracking.com"
  ylim <- c(-0, 0.3)
  title <- paste0("Positivity Rate by Day and Cumulative, ", toupper(place))
  rawdf <- read_csv(fname) 
  df <- rawdf %>%
    mutate(daily = ifelse(positiveIncrease < totalTestResultsIncrease, 
                          positiveIncrease/totalTestResultsIncrease, NA),
           cumulative = positive/totalTestResults,
           lag1 = lag(daily, order_by = date),
           lag2 = lag(daily,2, order_by = date),
           lag3 = lag(daily,3, order_by = date),
           lag4 = lag(daily,4, order_by = date),
           lag5 = lag(daily,5, order_by = date),
           lag6 = lag(daily,6, order_by = date)) %>% 
    rowwise %>%
    mutate(
      weekly = mean(c(daily,lag1,lag2,lag3,lag4,lag5,lag6), na.rm=TRUE)) %>%
    select(date, daily, cumulative, weekly) %>%
    pivot_longer(-date, names_to="period", values_to="positivity")
  
  posplot <- ggplot(df, aes(date, positivity, color = period)) +
    geom_hline(yintercept = target, lty=2) +
    geom_point(alpha = 0.5, size = 4) +
    scale_color_manual(values=c("grey3", "hotpink1", "cyan3")) + 
    scale_y_continuous(labels = scales::percent) +
    labs(title = title, 
         subtitle = "zoomed in to 30% and lower", 
         x = "",
         y = "Percent of Tests that are Positive",
         caption = caption) +
    coord_cartesian(ylim = ylim)  +
    theme_minimal() +
    theme(legend.position = "top", legend.title=element_blank())
  ggsave(paste0(place,".png"), posplot)
  print(posplot)
}

createTestPlot <- function(place) {
  fname <- paste0("https://covidtracking.com/data/download/",place,"-history.csv")
  caption <- "WHO target maximum positivity rate 5% \nData from covidtracking.com"
  title <- paste0("Daily Tests Completed and Percent Positive, ", toupper(place))
  rawdf <- read_csv(fname) 
  df <- rawdf %>%
    mutate(positivity = ifelse(positiveIncrease < totalTestResultsIncrease, 
                               positiveIncrease/totalTestResultsIncrease, NA)) %>%
    select(date, positivity, totalTestResultsIncrease) %>%
    filter(!is.na(positivity))
  testplot <- ggplot(df, aes(date, totalTestResultsIncrease, color = positivity))+
    geom_point(alpha = 0.5, size=5) +
    scale_y_continuous(labels = scales::comma) +
    scale_colour_gradient2(
      limits = c(0,0.3),
      low = "darkgreen",
      mid = "yellow",
      high = "deeppink3",
      midpoint = 0.05,
      space = "Lab",
      na.value = "grey50",
      guide = "colourbar",
      aesthetics = "colour"
    ) +
    coord_cartesian(ylim = c(0,mean(df$totalTestResultsIncrease*2)))  +
    labs(title = title, 
         x = "",
         y = "Total Daily Tests Reported",
         caption = caption) +
    theme_minimal() 
    #theme(legend.position = "top", legend.title=element_text("Percent Positive"))
  print(testplot)
}


#places <- c("national", "washington")

#places <- c("south-dakota", "nebraska")

#for(i in 1:length(places)) {
#  createPositivityPlot(places[i])
  #createTestPlot(places[i])
#}

#createPositivityPlot("new-hampshire")
#createPositivityPlot("alabama")


