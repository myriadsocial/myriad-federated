import { useCookies } from 'react-cookie';

import { useRouter } from 'next/router';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { decodeAddress } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';

import { getUserNonce } from 'src/api/GET_UserNonce';
import { login } from 'src/api/POST_Admin';
import { PolkadotJs } from 'src/lib/services/polkadot-js';

type SignInProps = {
  account: InjectedAccountWithMeta;
  callbackURL: string;
  apiURL?: string;
};
type SwitchInstanceProps = {
  account: InjectedAccountWithMeta;

  apiURL?: string;
};

export const useAuth = () => {
  const router = useRouter();

  const [cookie, setCookie, removeCookie] = useCookies([
    'session',
    'selectedInstance',
    'listOwnerInstances',
  ]);

  const connectWallet = (signInProps: SignInProps) => {
    const { account, callbackURL } = signInProps;
    const data = { currentAddress: account.address };

    setCookie('session', JSON.stringify(data), {
      path: '/',
      sameSite: true,
      maxAge: 1 * 24 * 60 * 60, // 1 day
    });

    router.push(callbackURL);
  };

  const loginDashboard = async (signInProps: SignInProps) => {
    const { apiURL, account, callbackURL } = signInProps;
    if (!apiURL) return;

    const toHex = u8aToHex(decodeAddress(account.address));
    const { nonce } = await getUserNonce(apiURL, toHex);

    if (!nonce) throw new Error('Unauthorized (User not exists)');

    const signature = await PolkadotJs.signWithWallet(account, nonce);
    const success = await login({
      nonce,
      signature,
      publicAddress: toHex,
      walletType: 'polkadot{.js}',
      networkType: 'myriad',
      apiURL,
      address: account.address,
    });

    if (!success) throw new Error('Failed to authorize');
    router.push(callbackURL);
  };

  const switchInstance = async (SwitchInstanceProps: SwitchInstanceProps) => {
    const { apiURL, account } = SwitchInstanceProps;
    if (!apiURL) return;

    const toHex = u8aToHex(decodeAddress(account.address));
    const { nonce } = await getUserNonce(apiURL, toHex);

    if (!nonce) throw new Error('Unauthorized (User not exists)');

    const signature = await PolkadotJs.signWithWallet(account, nonce);
    const success = await login({
      nonce,
      signature,
      publicAddress: toHex,
      walletType: 'polkadot{.js}',
      networkType: 'polkadot',
      apiURL,
      address: account.address,
    });

    if (!success) throw new Error('Failed to authorize');
  };

  const logout = () => {
    removeCookie('session');
    router.push('/');
  };

  return {
    connectWallet,
    loginDashboard,
    logout,
    cookie,
    switchInstance,
  };
};
