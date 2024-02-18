const URLS = {
  HOST: "https://coral-app-6m75s.ondigitalocean.app",
  //for localhost: HOST: "http://[your ip]:1338", to find your ip type ipconfig in terminal
  CHECK_STATUS: "/api/check-status",
  REPORTED_PRODUCT: "/api/reported-products",
  INGREDIENTS: "/api/ingredients",
  PRODUCTS: "/api/products",
  NEW_PRODUCT: "/api/new-products",
  SCANS: "/api/scans",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  LOGIN: "/api/auth/local",
  POPULATE_INGREDIENTS: "populate[0]=ingredients&populate[1]=ingredients.ingredient_state",
  INGREDIENT_STATE: "/api/ingredient-states",
};

module.exports = URLS;
