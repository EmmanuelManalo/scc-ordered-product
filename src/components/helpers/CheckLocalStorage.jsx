export const checkLocalStorage = () => {
  let tmv1token = null;
  try {
    tmv1token = JSON.parse(localStorage.getItem("tmv1token"));
  } catch (error) {
    tmv1token = null;
  }

  return tmv1token;
};
