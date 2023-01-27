import React from 'react';

const Gasfee = ({ amount }: { amount: string }) => {
  return (
    <div className="flex justify-between gap-x-2 text-xs">
      <div className="text-[#616161]">Estimated gas fee</div>
      <div className="text-black">{amount} MYRIA</div>
    </div>
  );
};

export default Gasfee;
