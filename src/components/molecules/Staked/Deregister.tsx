import Button from 'src/components/atoms/Button';
import CardStaked from '../../atoms/CardStaked';

export const Deregister = () => {
  return (
    <CardStaked title="De-Register Instance">
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <div className="text-softGray text-xs mb-5">
            Your funds will be unstaked, and you will no longer receive rewards.
            Your instance will be removed from the official list.
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button
            onClick={null}
            label={'De-Register Instance'}
            error
            isFullWidth
          />
        </div>
      </div>
    </CardStaked>
  );
};
