import axios from 'axios';

export const getBinanceTiker = async () => {
  try {
    const res = await axios('https://api3.binance.com/api/v3/ticker/price');
    return res.data;
  } catch (err) {
    console.log('error = ', err);
    return [];
  }
};