const { API_URL } = process.env;
export const apiUrl = () => API_URL ?? 'https://europe-west3-fanfire-01.cloudfunctions.net/api';
