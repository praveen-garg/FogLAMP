export const environment = {
  production: true,
  BASE_URL: localStorage.getItem('API_END_POINT') == null ? 'http://0.0.0.0:8082/foglamp/' : localStorage.getItem('API_END_POINT')
};
