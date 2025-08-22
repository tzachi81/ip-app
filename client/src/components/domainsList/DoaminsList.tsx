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
  
  {console.log(domainHistory.reverse())};
  return (
    <div className={classes.listContainer}>
      <div className={classes.listHeader}>
        <h3>Domain Name</h3>
        <h3>IP Address</h3>
      </div>
      <ul className={classes.list}>
        {domainHistory.reverse().map((domainItem) => (
          <DomainItem key={domainItem.domain} domainItem={domainItem} />
        ))}
      </ul>
    </div>
  );
};
