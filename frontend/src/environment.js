const IS_PROD = true;

const server = IS_PROD
  ? "https://classconnect-l6zm.onrender.com"
  : "http://localhost:8000";

export default server;
