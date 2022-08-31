import type {NextApiRequest, NextApiResponse} from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import getConfig from 'next/config';
const {serverRuntimeConfig} = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const headers =
      req.method === 'GET'
        ? undefined
        : {
            Authorization: `Bearer ${serverRuntimeConfig.myriadAPIKey}`,
          };

    return httpProxyMiddleware(req, res, {
      target: serverRuntimeConfig.myriadAPIURL,
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
