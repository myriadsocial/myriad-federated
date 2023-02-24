import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'src/api/axiosInstance';
import { Credential } from 'src/api/POST_Admin';
import { encryptMessage } from 'src/lib/crypto';

import cookie from 'cookie';
import { omit } from 'lodash';

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res
      .status(404)
      .send({ error: `Endpoint ${req.method} ${req.url} not found` });
  }

  try {
    const data: Credential = req.body;

    if (!data.apiURL || !data.address)
      return res.status(401).send({ status: 'Unauthorized' });

    const result = await axios(data.apiURL).post(
      '/authentication/login/wallet',
      omit(data, ['apiURL', 'address']),
    );
    const payload = encryptMessage(
      result.data.token.accessToken,
      data.publicAddress,
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize(
        'session',
        JSON.stringify({
          currentAddress: data.address,
          publicAddress: data.publicAddress,
          apiURL: data.apiURL,
          token: payload.encryptedMessage,
        }),
        {
          path: '/',
          sameSite: true,
          maxAge: 1 * 24 * 60 * 60, // 1 day
        },
      ),
    );

    return res.status(200).send({ status: true });
  } catch (e) {
    const error = e instanceof Error ? e.message : e;
    return res.status(400).send({ error });
  }
}
