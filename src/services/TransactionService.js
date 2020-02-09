// Define services for Category
import {DOMAIN_API, ROUTES} from '../constants/ApiRoutes';
import {getApiWithParams} from '../utils/api.util';

/**
 * Get all transactions
 * @returns Array of transactions
 */
export const getTransactions = async () => {
  try {
    const url = `${DOMAIN_API}${ROUTES.getTransactions}`;
    const transactions = await getApiWithParams(url);
    return transactions;
  } catch (e) {
    throw e;
  }
};
