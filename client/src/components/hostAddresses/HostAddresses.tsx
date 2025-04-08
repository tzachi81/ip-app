import { IHostAddresses } from "../../types/host.types";

interface IDomainHistory {
  hostAddresses: IHostAddresses;
}

export const HostAddresses: React.FC<IDomainHistory> = ({ hostAddresses }) => {
  return (
    <>
      {hostAddresses && (
        <div>
          <h2>Host IP Addresses</h2>
          <p>Public: {hostAddresses.publicIP}</p>
          <p>Internal: {hostAddresses.internalIP}</p>
        </div>
      )}
    </>
  );
};
