import classes from './DomainList.module.scss';
import { IDomain } from '../../types/domain.types';
import { DomainItem } from './DomainItem';

interface IDomainHistory {
  domainHistory: IDomain[];
}

export const DomainsList: React.FC<IDomainHistory> = ({ domainHistory }) => {
  return (
    <>
      {/* <h2>Domain History</h2> */}
      <ul className={classes.list}>
        {domainHistory.map((domainItem) => (
          <DomainItem key={domainItem.domain} domainItem={domainItem} />
        ))}
      </ul>
    </>
  );
};
