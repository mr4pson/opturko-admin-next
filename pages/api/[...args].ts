import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  target: 'http://localhost:3100',

  pathRewrite: {
    '^/api/': '/', // remove base path
  },
});

export default proxy;
