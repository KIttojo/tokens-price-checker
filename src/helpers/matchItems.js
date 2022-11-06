import { getBinanceTiker } from '../api/binance.js';
import { getFtxTiker } from '../api/ftx.js';

export const matchItems = async () => {
  const binanceItems = await getBinanceTiker();
  // ftx returns pairs (ABNB/USD) or shit like this (ALGO-1230)
  const ftxItems = await getFtxTiker();
  const intersection = [];

  binanceItems.forEach(binanceItem => {
    ftxItems.forEach(ftxItem => {
      if (ftxItem.variants.includes(binanceItem.symbol)) {
        const diff = Math.abs(Number(binanceItem.price) - ftxItem.price) / 100;

        if (diff > 1) {
          intersection.push({
            tokenPair: binanceItem.symbol,
            spread: Number(diff.toFixed(5)),
            prices: {
              binance: Number(binanceItem.price),
              ftx: Number(ftxItem.price)
            }
          });
        }
      }
    });
  });

  const sortedIntersection = intersection.sort((a, b) => b.spread - a.spread);
  console.log(sortedIntersection);
  console.log('-------END---------');
};