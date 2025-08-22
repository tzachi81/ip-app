import classes from './HostAddresses.module.scss';
import { IHostAddresses } from '../../types/host.types';

interface IDomainHistory {
  hostAddresses: IHostAddresses;
}

export const HostAddresses: React.FC<IDomainHistory> = ({ hostAddresses }) => {
  return (
    <>
      {hostAddresses && (
        <div className={classes.hostAddresses}>
          <h3 className={classes.header}>Host IP Addresses</h3>
          <span>Public: {hostAddresses.publicIP}</span>
          <span>Internal: {hostAddresses.internalIP}</span>
        </div>
      )}
    </>
  );
};
