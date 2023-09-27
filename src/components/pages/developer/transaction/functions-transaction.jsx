export const getTransactionCountRecord = (transaction) => {
  let active = 0;
  let inactive = 0;

  const resultActive = transaction?.data.filter(
    (acItem) => acItem.transaction_is_paid === 1
  );
  active = resultActive?.length;

  const resultInactive = transaction?.data.filter(
    (inacItem) => inacItem.transaction_is_paid === 0
  );
  inactive = resultInactive?.length;

  return { active, inactive };
};
