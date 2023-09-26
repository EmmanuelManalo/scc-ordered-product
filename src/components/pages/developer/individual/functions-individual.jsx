export const getIndividualCountRecord = (individual) => {
  let active = 0;
  let inactive = 0;

  const resultActive = individual?.data.filter(
    (acItem) => acItem.individual_is_active === 1
  );
  active = resultActive?.length;

  const resultInactive = individual?.data.filter(
    (inacItem) => inacItem.individual_is_active === 0
  );
  inactive = resultInactive?.length;

  return { active, inactive };
};
