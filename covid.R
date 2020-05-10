library(tidyverse)
`%ni%` = Negate(`%in%`)

positive_raw <- read_csv('~/Desktop/wacounty - positive.csv',
                     col_types = list(tag = col_character(),
                               .default = col_double()))
death_raw <- read_csv('~/Desktop/wacounty - deaths.csv',
                      col_types = list(tag = col_character(),
                                       .default = col_double()))
# overall_raw <- read_csv('~/Desktop/wacounty - overall.csv')
# ## get overall data
# tested <- overall_raw %>%
#   mutate(pop_tested = tested/population) %>%
#   select(County, population, positive, pop_tested) %>%
#   filter(pop_tested > 0.01)


## mutate the data
pos_data <- positive_raw %>%
  pivot_longer(-tag, names_to = "date", values_to = "positive") %>% 
  replace(is.na(.), 0) 
pos_data$date <- as.Date(pos_data$date)

d_data <- death_raw %>%
  pivot_longer(-tag, names_to = "date", values_to = "dead") %>% 
  replace(is.na(.), 0) 
d_data$date <- as.Date(d_data$date)

## combine the data

data <- left_join(pos_data, d_data)

# remove today because missing for many health districts
data <- data %>%
  filter(date < Sys.Date())

average <- data %>%
  group_by(tag) %>%
  mutate(cum_pos = cumsum(positive),
         cum_dea = cumsum(dead)) %>%
  arrange(tag, date) %>%
  mutate(p1=lag(positive), d1 = lag(dead),
       p2=lag(positive,2), d2 = lag(dead, 2),
       p3=lag(positive,3), d3 = lag(dead, 3),
       p4=lag(positive,4), d4 = lag(dead, 4),
       movave_pos=(positive+p1+p2+p3+p4)/5,
       movave_dea = (dead+d1+d2+d3+d4)/5) 

# get totals
totals <- data %>% 
  group_by(tag) %>% 
  summarise(total_dea = sum(dead),
            total_pos = sum(positive)) 

compare_counties_pos <- totals$tag[totals$total_pos > 200]
compare_counties_dea <- totals$tag[totals$total_dea > 10]

## make graphs for positive
graph_county_pos <- average %>%
  filter(tag %in% compare_counties_pos) %>%
  filter(cum_pos > 3) %>%
  mutate(obs = row_number()) %>%
  select(obs, cum_pos, movave_pos)

graph_county_other <- data %>%
  filter(tag %ni% compare_counties_pos) %>%
  group_by(date) %>%
  summarise(positive = sum(positive),
            dead = sum(dead)) %>%
  mutate(cum_pos = cumsum(positive),
         cum_dea = cumsum(dead)) %>%
  arrange(date) %>%
  mutate(p1=lag(positive), d1 = lag(dead),
         p2=lag(positive,2), d2 = lag(dead, 2),
         p3=lag(positive,3), d3 = lag(dead, 3),
         p4=lag(positive,4), d4 = lag(dead, 4),
         movave_pos=(positive+p1+p2+p3+p4)/5,
         movave_dea = (dead+d1+d2+d3+d4)/5) %>%
  filter(cum_pos > 3) %>%
  mutate(tag = "all other", obs = row_number()) %>%
  select(tag, obs, cum_pos, movave_pos)
graph_county_pos <- bind_rows(graph_county_pos, graph_county_other)
library(broom)
xx <- graph_county_pos %>% 
  group_by(tag) %>%
  filter(obs >= max(obs) -5) %>%
  split(.$tag) %>% 
  map(~lm(movave_pos ~ obs, data = .x)) %>% 
  map_df(tidy) %>%
  filter(term == 'obs')

# let us set up a legend for the graph
legend <- graph_county_pos %>%
  group_by(tag) %>%
  filter(obs == max(obs)) %>%
  arrange(tag) %>%
  bind_cols(xx) %>%
  mutate(trend = ifelse(between(estimate, -0.1,0.1), "flat", 
                      ifelse(estimate > 0, "rising", "declining"))) %>%
  select(label = tag, y_pos = movave_pos, x_pos = obs, trend) 
trend <- legend %>%
  select(tag = label, trend)
graph_data <- left_join(graph_county_pos, trend)  

ggplot(graph_data, aes(x = obs, y = movave_pos)) +
  geom_line(aes(color = tag)) +
  labs(title = "COVID-19 Case Curves",
       subtitle = "5 day moving average, Counties with at least 200 cases",
       x="Days Since 3rd Case",
       color = "Counties",
       y = "New Reported Cases per Day",
       caption = paste("Based on 35 WA Health Departments reporting through", 
                       Sys.Date() - 1,
                       "as of 1800",
                       Sys.Date(), 
                       "\n data at https://github.com/monkeywithacupcake/covid-19-wa",
                       sep=" ")) +  
  expand_limits(x = c(0, 100)) +
  theme_minimal() + 
  theme(legend.justification=c(1,0), legend.position=c(1,0))  
ggsave("~/Desktop/covid-19-wa.png")

ggplot(graph_data, aes(x = obs, y = movave_pos)) +
  geom_line(aes(group = tag, color = trend)) + 
  scale_color_manual(values = c("rising" = "#993333", "flat" = "#666666", "declining" = "#000055")) +
  scale_y_log10() +
  labs(title = "COVID-19 Case Curves - Log Scale",
       subtitle = "5 day moving average, Counties with at least 200 cases",
       x="Days Since 3rd Case",
       color = "Current Trend",
       y = "New Reported Cases per Day",
       caption = paste("Based on 35 WA Health Departments reporting through", 
             Sys.Date() - 1,
             "as of 1800",
             Sys.Date(), 
             "\n data at https://github.com/monkeywithacupcake/covid-19-wa",
             sep=" "))+  
  expand_limits(x = c(0, 100)) +
  theme_minimal() + 
  theme(legend.justification=c(1,0), legend.position=c(1,0)) +
  geom_text(data = legend, 
            aes(x = x_pos, y = y_pos, label = label, color = trend,
                hjust = 0, vjust = 1),
            show.legend = FALSE) 
ggsave("~/Desktop/covid-19-wa-log.png") 

## make a state aggregate
state <- data %>% 
  group_by(date) %>%
  summarise(positive = sum(positive),
            dead = sum(dead))

state_avg <- state %>%
  mutate(cum_pos = cumsum(positive), cum_dea = cumsum(dead)) %>%
  arrange(date) %>%
  mutate(p1=lag(positive), d1 = lag(dead),
         p2=lag(positive,2), d2 = lag(dead, 2),
         p3=lag(positive,3), d3 = lag(dead, 3),
         p4=lag(positive,4), d4 = lag(dead, 4),
         movave_pos=(positive+p1+p2+p3+p4)/5,
         movave_dea = (dead+d1+d2+d3+d4)/5) %>%
  filter(cum_pos > 3) %>%
  mutate(obs = row_number()) %>%
  select(obs, cum_pos, movave_pos, cum_dea, movave_dea, date)

ggplot(state_avg, aes(x = obs, y = movave_pos)) +
  geom_line() +
  scale_y_log10() +
  labs(title = "COVID-19 Case Curves",
       subtitle = "5 day moving average, Whole State",
       x="Days Since 3rd Case",
       color = "Current Trend",
       y = "New Reported Cases per Day",
       caption = paste("Based on 35 WA Health Departments reporting through", 
                       Sys.Date() - 1,
                       "as of 1800",
                       Sys.Date(), 
                       "\n data at https://github.com/monkeywithacupcake/covid-19-wa",
                       sep=" "))+  
  theme_minimal()
ggsave("~/Desktop/covid-19-wa-state.png") 

ggplot(state_avg, aes(x = obs, y = movave_pos)) +
  geom_line() +
  geom_line(aes(y = movave_dea), color = "#993333") +
  scale_y_log10() +
  labs(title = "COVID-19 Case & Death Curves - Log Scale",
       subtitle = "5 day moving average, Whole State",
       x="Days Since 3rd Case",
       color = "Current Trend",
       y = "New Reported Cases / Deaths per Day",
       caption = paste("Based on 35 WA Health Departments reporting through", 
             Sys.Date() - 1,
             "as of 1800",
             Sys.Date(), 
             "\n data at https://github.com/monkeywithacupcake/covid-19-wa",
             sep=" "))+  
  theme_minimal()
ggsave("~/Desktop/covid-19-wa-state-log-w-death.png") 