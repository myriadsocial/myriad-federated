import Image from 'next/image';

interface ListSwitchAccount {
  onClick?: () => void;
  label: string | undefined;
  network?: string | undefined;
  image: string;
  amount: string;
}
const ListWallet = (props: ListSwitchAccount) => {
  const { label, image, network, amount } = props;

  return (
    <div className="flex justify-between items-center gap-x-2 pb-1">
      <div className="flex items-center gap-x-1">
        <Image
          src={image}
          alt=""
          height={network ? 35 : 18}
          width={network ? 35 : 18}
        />
        <div className="text-[14px] text-black font-semibold">
          <div>{label}</div>
          {network && (
            <div className="text-sm text-softGray capitalize">
              {network} network
            </div>
          )}
        </div>
      </div>

      <div className="text-[14px] text-black font-semibold">{amount}</div>
    </div>
  );
};

export default ListWallet;
