import Image from 'next/image';

interface ListSwitchAccount {
  onClick?: () => void;
  label: string | undefined;
  network?: string | undefined;
  image: string;
  amount?: string;
  classes?: string;
}
const ListWallet = (props: ListSwitchAccount) => {
  const { label, image, network, amount, classes } = props;

  return (
    <div
      className={`flex justify-between items-center gap-x-2 ${classes ?? ''}`}
    >
      <div className="flex items-center gap-x-1">
        <Image
          src={image}
          alt=""
          height={network ? 35 : 18}
          width={network ? 35 : 18}
        />
        <div className="text-[14px] text-black font-semibold leading-4">
          <div>{label}</div>
          {network && (
            <div className="text-xs text-softGray3 capitalize font-medium">
              {network} network
            </div>
          )}
        </div>
      </div>

      {amount && (
        <div className="text-[14px] text-black font-semibold">{amount}</div>
      )}
    </div>
  );
};

export default ListWallet;
