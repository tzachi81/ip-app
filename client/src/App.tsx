import './App.css';
import classes from './App.module.scss';
import { useEffect, useState } from 'react';
import {
  fetchDomainHistory,
  fetchHostAddresses,
  resolveDomain,
} from './api/apiCalls';
import { DomainsList } from './components/domainsList/DoaminsList';

import { ToastContainer, toast } from 'react-toastify';
import { HostAddresses } from './components/hostAddresses/HostAddresses';
import { IDomain } from './types/domain.types';

function App() {
  const [ipAddresses, setIpAddresses] = useState<any>(null);
  const [domainHistory, setDomainHistory] = useState<any[]>([]);
  const [, setDomainInput] = useState<string>('');
  const [domain, setDomain] = useState('');

  const notify = (message: string) => toast(message);

  useEffect(() => {
    const getIPAddresses = async () => {
      try {
        const data = await fetchHostAddresses();
        setIpAddresses(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getDomainHistory = async () => {
      try {
        const history = await fetchDomainHistory();
        setDomainHistory(history);
      } catch (error) {
        console.error(error);
      }
    };

    getIPAddresses();
    getDomainHistory();
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDomain(value);
  };
  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // I had an issue with the domain input sent to the server and returned null values,
    // so I added these checkups to remove the protocol prefix
    // and other suffix that may be applied

    const cleanDomain =
      domain.indexOf('://') > -1
        ? domain.split('://')[1].split('/')[0]
        : domain;

    const isValidDomainPattern = (domainName: string) => {
      const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return domainPattern.test(domainName);
    };

    const isDomainExists = (domainName: string) => {
      return domainHistory.some(
        (domainObj: IDomain) => domainObj.domain === domainName
      );
    };

    try {
      //TODO: add length check > 255 characters, and so on...

      if (!isValidDomainPattern(cleanDomain)) {
        notify(`Invalid domain input: ${cleanDomain}`);
        console.error('Invalid domain input.');
        return;
      }

      // TODO: consider if check existing directly in the db is better
      if (isDomainExists(cleanDomain)) {
        notify(
          `The domain name is already in your history list: ${cleanDomain}`
        );
        console.log(
          'The domain name is already in your history list.',
          cleanDomain
        );
        return;
      }
      const result = await resolveDomain(cleanDomain);
      setDomainHistory([...domainHistory, result]);
      setDomainInput('');
    } catch (error) {
      setDomainInput('Invalid domain input');
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <h1>Resolve Domain Names</h1>
      </header>

      <main>
        <HostAddresses hostAddresses={ipAddresses} />

        <div className={classes.content}>
          <h2>Domain Resolver</h2>
          <form className={classes.form} onSubmit={handleDomainSubmit}>
            {/* <label className={classes.label}>Resolve Domain Name</label> */}
            <input
              autoFocus
              className={classes.input}
              type='text'
              value={domain}
              onChange={onInputChange}
              placeholder='Domain name to resolve'
              required
            />
            <button className={classes.button} type='submit'>
              Get IP
            </button>
          </form>

          <ToastContainer position='bottom-center' closeOnClick theme='dark' />

          {domainHistory.length > 0 && <DomainsList domainHistory={domainHistory}/>}
        </div>
      </main>
    </>
  );
}

export default App;
