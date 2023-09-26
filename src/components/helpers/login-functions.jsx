import { devNavUrl } from "./functions-general";

export const checkRoleToRedirect = (navigate, data) => {
  data.role_is_developer === 1
    ? navigate(`${devNavUrl}/system/tools/workload`)
    : data.role_is_admin === 1
    ? navigate(`${devNavUrl}/${data.role_name.toLowerCase()}/tools/workload`)
    : data.role_is_trainer === 1
    ? navigate(`${devNavUrl}/${data.role_name.toLowerCase()}/tools/workload`)
    : data.role_is_accounting === 1
    ? navigate(`${devNavUrl}/${data.role_name.toLowerCase()}/tools/workload`)
    : navigate(`${devNavUrl}/${data.role_name.toLowerCase()}/tools/workload`);
};
