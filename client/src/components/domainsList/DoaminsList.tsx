import { IDomain } from "../../types/domain.types";
import { DomainItem } from "./DomainItem";

interface IDomainHistory {
  domainHistory: IDomain[];
}

export const DomainsList: React.FC<IDomainHistory> = ({ domainHistory }) => {
  return (
    <>
      <h2>Domain History</h2>
      <ul>
        {domainHistory.map((domainItem, index) => (
          <DomainItem key={index} domainItem={domainItem} />
        ))}
      </ul>
    </>
  );
};
