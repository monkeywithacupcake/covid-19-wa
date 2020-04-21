library(tidyverse)

positive <- read_csv('~/Desktop/wacounty - positive.csv',
                     col_types = list(tag = col_character(),
                               .default = col_double()))
pos_data <- positive %>%
  pivot_longer(-tag, names_to = "date", values_to = "count") %>% 
  replace(is.na(.), 0) 
pos_data$date <- as.Date(pos_data$date)


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

ggplot(pos_average, aes(x = obs, y = movave, color = tag)) +
  geom_line() + 
  labs(title = "COVID-19 Case Curves",
       subtitle = "5 day moving average, Counties with at least 200 cases",
       color = "County",
       x="Days Since 3rd Case", 
       y = "New Reported Cases per Day") + 
  theme_minimal() + theme(legend.key.height=unit(.6,"line"))

ggplot(pos_average, aes(x = obs, y = movave, color = tag)) +
  geom_line() + 
  scale_y_log10() +
  labs(title = "COVID-19 Case Curves - Log Scale",
       subtitle = "5 day moving average, Counties with at least 200 cases",
       color = "County",
       x="Days Since 3rd Case", 
       y = "New Reported Cases per Day") + 
  theme_minimal() + theme(legend.key.height=unit(.6,"line"))
 