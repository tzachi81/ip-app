import { IDomain } from "../../types/domain.types";

interface IDomainItem {
  domainItem: IDomain;
}

export const DomainItem: React.FC<IDomainItem> = ({ domainItem }) => {
  return (
    <li>
      {domainItem.domain}: {domainItem.ip}
    </li>
  );
};
