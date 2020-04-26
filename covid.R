library(tidyverse)

positive <- read_csv('~/Desktop/wacounty - positive.csv',
                     col_types = list(tag = col_character(),
                               .default = col_double()))
pos_data <- positive %>%
  pivot_longer(-tag, names_to = "date", values_to = "count") %>% 
  replace(is.na(.), 0) 
pos_data$date <- as.Date(pos_data$date)



# remove today because missing for many health districts
pos_data <- pos_data %>%
  filter(date < Sys.Date())

pos_totals <- pos_data %>% 
  group_by(tag) %>% 
  summarise(total = sum(count)) 

compare_counties <- pos_totals$tag[pos_totals$total > 200]

pos_average <- pos_data %>%
  filter(tag %in% compare_counties) %>%
  group_by(tag) %>%
  mutate(cum = cumsum(count)) %>%
  filter(cum > 1) %>%
  arrange(tag, date) %>%
  mutate(lag1=lag(count),
         lag2=lag(count,2),
         lag3=lag(count,3),
         lag4=lag(count,4),
         movave=(count+lag1+lag2+lag3+lag4)/5,
         obs = row_number()) %>%
  select(tag, obs, cum, movave)

library(broom)
xx <- pos_average %>% 
  group_by(tag) %>%
  filter(obs >= max(obs) -5) %>%
  split(.$tag) %>% 
  map(~lm(movave ~ obs, data = .x)) %>% 
  map_df(tidy) %>%
  filter(term == 'obs')

# let us set up a legend for the graph
legend <- pos_average %>%
  group_by(tag) %>%
  filter(obs == max(obs)) %>%
  bind_cols(xx) %>%
  mutate(trend = ifelse(between(estimate, -0.1,0.1), "flat", 
                      ifelse(estimate > 0, "rising", "declining"))) %>%
  select(label = tag, y_pos = movave, x_pos = obs, trend) 
trend <- legend %>%
  select(tag = label, trend)
graph_data <- left_join(pos_average, trend)  

ggplot(graph_data, aes(x = obs, y = movave)) +
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
  expand_limits(x = c(0, 80)) +
  theme_minimal() + 
  theme(legend.justification=c(1,0), legend.position=c(1,0))  
ggsave("~/Desktop/covid-19-wa.png")

ggplot(graph_data, aes(x = obs, y = movave)) +
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
  expand_limits(x = c(0, 80)) +
  theme_minimal() + 
  theme(legend.justification=c(1,0), legend.position=c(1,0)) +
  geom_text(data = legend, 
            aes(x = x_pos, y = y_pos, label = label, color = trend,
                hjust = 0, vjust = 1),
            show.legend = FALSE) 
ggsave("~/Desktop/covid-19-wa-log.png") 


## get the death data
death_raw <- read_csv('~/Desktop/wacounty - deaths.csv',
                     col_types = list(tag = col_character(),
                                      .default = col_double()))
d_data <- death_raw %>%
  pivot_longer(-tag, names_to = "date", values_to = "deaths") %>% 
  replace(is.na(.), 0) 
d_data$date <- as.Date(d_data$date)

# remove today because missing for many health districts
d_data <- d_data %>%
  filter(date < Sys.Date())
d_totals <- d_data %>% 
  group_by(tag) %>% 
  summarise(total = sum(deaths)) 

d_counties <- d_totals$tag[d_totals$total > 10]

d_average <- d_data %>%
  filter(tag %in% d_counties) %>%
  group_by(tag) %>%
  mutate(cumdead = cumsum(deaths)) %>%
  filter(cumdead > 1) %>%
  arrange(tag, date) %>%
  mutate(d1 = lag(deaths),
         d2 = lag(deaths, 2),
         d3 = lag(deaths, 3),
         d4 = lag(deaths, 4),
         movavedead = (deaths+d1+d2+d3+d4)/5,
         obs = row_number()) %>%
  select(obs, cumdead, movavedead, date)

library(broom)
xx <- d_average %>% 
  group_by(tag) %>%
  filter(obs >= max(obs) -5) %>%
  split(.$tag) %>% 
  map(~lm(movavedead ~ obs, data = .x)) %>% 
  map_df(tidy) %>%
  filter(term == 'obs')

# let us set up a legend for the graph
legend <- d_average %>%
  group_by(tag) %>%
  filter(obs == max(obs)) %>%
  bind_cols(xx) %>%
  mutate(trend = ifelse(between(estimate, -0.1,0.1), "flat", 
                        ifelse(estimate > 0, "rising", "declining"))) %>%
  select(label = tag, y_d = movavedead, x_d = obs, trend) 
trend <- legend %>%
  select(tag = label, trend)
graph_data <- left_join(d_average, trend)  


ggplot(graph_data, aes(x = obs, y = movavedead)) +
  geom_line(aes(group = tag, color = trend)) + 
  scale_color_manual(values = c("rising" = "#993333", "flat" = "#666666", "declining" = "#000055")) +
  scale_y_log10() +
  labs(title = "COVID-19 Deaths Curves - Log Scale",
       subtitle = "5 day moving average, Counties with at least 10 deaths",
       x="Days Since 3rd Case",
       color = "Current Trend",
       y = "New Reported Deaths per Day",
       caption = paste("Based on 35 WA Health Departments reporting through", 
                       Sys.Date() - 1,
                       "as of 1800",
                       Sys.Date(), 
                       "\n data at https://github.com/monkeywithacupcake/covid-19-wa",
                       sep=" "))+  
  expand_limits(x = c(0, 80)) +
  theme_minimal() + 
  theme(legend.justification=c(1,0), legend.position=c(1,0)) +
  geom_text(data = legend, 
            aes(x = x_d, y = y_d, label = label, color = trend,
                hjust = 0, vjust = 1),
            show.legend = FALSE) 
ggsave("~/Desktop/covid-19-wa-log-deaths.png") 

## make a state aggregate
state_pos <- pos_data %>% 
  group_by(date) %>%
  summarise(count = sum(count))
## make a state aggregate
state_dead <- d_data %>% 
  group_by(date) %>%
  summarise(deaths = sum(deaths))
state_avg <- state_pos %>%
  left_join(state_dead) %>%
  mutate(cum = cumsum(count), cumdead = cumsum(deaths)) %>%
  filter(cum > 3) %>%
  arrange(date) %>%
  mutate(lag1=lag(count), d1 = lag(deaths),
         lag2=lag(count,2), d2 = lag(deaths, 2),
         lag3=lag(count,3), d3 = lag(deaths, 3),
         lag4=lag(count,4), d4 = lag(deaths, 4),
         movave=(count+lag1+lag2+lag3+lag4)/5,
         movavedead = (deaths+d1+d2+d3+d4)/5,
         obs = row_number()) %>%
  select(obs, cum, movave, cumdead, movavedead, date)

ggplot(state_avg, aes(x = obs, y = movave)) +
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

ggplot(state_avg, aes(x = obs, y = movave)) +
  geom_line() +
  geom_line(aes(y = movavedead), color = "#993333") +
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