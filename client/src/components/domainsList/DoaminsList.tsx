import classes from "./DomainList.module.scss";
import { IDomain } from "../../types/domain.types";
import { DomainItem } from "./DomainItem";

interface IDomainHistory {
  domainHistory: IDomain[];
}

export const DomainsList: React.FC<IDomainHistory> = ({ domainHistory }) => {
  if (!domainHistory || domainHistory.length === 0) {
    return <div className={classes.emptyList}>No domains found</div>;
  }

  return (
    <div className={classes.listContainer}>
      <header>
        <h2>Resolved Domains</h2>
      </header>
      <div className={classes.listHeader}>
        <span>Domain Name</span>
        <span>IP Address</span>
      </div>
      <ul className={classes.list}>
        {domainHistory.map((domainItem) => (
          <DomainItem key={domainItem.domain} domainItem={domainItem} />
        ))}
      </ul>
    </div>
  );
};
