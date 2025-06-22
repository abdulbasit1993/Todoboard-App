type baseUrlsList = {
  dev: string;
  prod: string;
};

const base_urls_list: baseUrlsList = {
  dev: 'https://localhost:3001/api',
  prod: 'https://todoboard-backend.onrender.com/api',
};

export const BASE_URL: string = base_urls_list.prod;
