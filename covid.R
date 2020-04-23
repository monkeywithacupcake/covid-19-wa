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
       caption = "Based on 35 WA Health Departments reporting as of 1800 4/21 \n data at https://github.com/monkeywithacupcake/covid-19-wa") +  
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
       caption = "Based on 35 WA Health Departments reporting as of 1800 4/21 \n data at https://github.com/monkeywithacupcake/covid-19-wa") +  
  expand_limits(x = c(0, 80)) +
  theme_minimal() + 
  theme(legend.justification=c(1,0), legend.position=c(1,0)) +
  geom_text(data = legend, 
            aes(x = x_pos, y = y_pos, label = label, color = trend,
                hjust = 0, vjust = 1),
            show.legend = FALSE) 
ggsave("~/Desktop/covid-19-wa-log.png") 