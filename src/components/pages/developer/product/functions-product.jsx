export const getProductCountRecord = (product) => {
  let active = 0;
  let inactive = 0;

  const resultActive = product?.data.filter(
    (acItem) => acItem.product_is_active === 1
  );
  active = resultActive?.length;

  const resultInactive = product?.data.filter(
    (inacItem) => inacItem.product_is_active === 0
  );
  inactive = resultInactive?.length;

  return { active, inactive };
};
