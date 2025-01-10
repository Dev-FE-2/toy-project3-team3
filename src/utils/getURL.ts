const getURL = () => {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_VERCEL_URL
    : 'http://localhost:5173';
};

export default getURL;
