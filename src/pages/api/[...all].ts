import type {NextApiRequest, NextApiResponse} from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

import {parseCookies} from 'nookies';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = parseCookies({req});
    const data = JSON.parse(cookies.session);
    const headers = {Authorization: `Bearer ${data.token}`};

    return httpProxyMiddleware(req, res, {
      target: data.apiURL,
      pathRewrite: [
        {
          patternStr: '/api',
          replaceStr: '',
        },
      ],
      changeOrigin: true,
      headers,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({error: e});
  }
}
