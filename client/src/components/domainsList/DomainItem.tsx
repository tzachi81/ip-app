import classes from './DomainList.module.scss';
import { IDomain } from '../../types/domain.types';

interface IDomainItem {
  domainItem: IDomain;
}

export const DomainItem: React.FC<IDomainItem> = ({ domainItem }) => {
  
  const { domain, ip } = domainItem;
  //I added the anchor tag just to 
  //make it interactive for the user
  
  return (
    <li className={classes.listItem}>
      <span className={classes.domain}>
        <a target='_blank' rel='noopener noreferrer' href={`https://${domain}`}>
          {domain}
        </a>
      </span>
      <span className={classes.ip}>{ip}</span>
    </li>
  );
};
