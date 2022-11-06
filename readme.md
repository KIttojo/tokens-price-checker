Binance API - binance-api-node

list of binance pairs - https://api3.binance.com/api/v3/ticker/price
list of ftx pairs - https://ftx.com/api/markets

flow: 
1. Посылать по 1 запросу на получение всего списка
2. Трансформировать неподходящие данные под общий формат
3. Затем искать среди всех массивов общие имена и группировать, пример
---
{
  name: 'BTC-USD',
  spread: '10%'
  links: ['Биржа1', 'Биржа2']
}
---