import type {NextApiRequest, NextApiResponse} from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

import {decryptMessage} from 'src/lib/crypto';

import cookie from 'cookie';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = cookie.parse(req?.headers?.cookie ?? '');
    const data = JSON.parse(cookies?.session ?? '');
    const accessToken = decryptMessage(data.token, data.publicAddress);
    const headers = {Authorization: `Bearer ${accessToken}`};

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
    const error = e instanceof Error ? e.message : e;
    return res.status(500).send({error});
  }
}
