import axios from 'axios';

const createPlainPair = (token) => {
  const pairItems = token.split('/');
  //ignore PERP and oter dash pairs
  if (pairItems.length === 1) return [];

  if (pairItems[1].includes('USD')) {
    const item = pairItems[0];
    return [`${item}USDT`, `${item}BUSD`];
  } else {
    //return signle item
    return [pairItems.join('')];
  }
};

export const getFtxTiker = async () => {
  try {
    const res = await axios('https://ftx.com/api/markets');
    const items = res.data.result;
    const resultItems = [];

    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const { volumeUsd24h, last, name } = element;
      const variants = createPlainPair(element.name);

      if (variants.length && volumeUsd24h > 0 && last) {
        resultItems.push({name, variants, price: (Number(last)).toFixed(5)});
      }
    }

    return resultItems;
  } catch (err) {
    console.log('error = ', err);
    return [];
  }
};