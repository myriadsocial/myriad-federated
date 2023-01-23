import Image from 'next/image';

interface ListSwitchNetwork {
  onClick?: () => void;
  label: string | undefined;
  image: string;
  classes?: string;
}
const ListNetwork = (props: ListSwitchNetwork) => {
  const { label, image, classes } = props;

  return (
    <div
      className={`flex justify-between items-center gap-x-2 ${classes ?? ''}`}
    >
      <div className="flex items-center gap-x-2">
        <Image src={image} alt="" height={24} width={24} />
        <div className="text-base text-black leading-4 capitalize font-thin">
          {label}
        </div>
      </div>
    </div>
  );
};

export default ListNetwork;
