import classes from "./App.module.scss";
import { useEffect, useState } from "react";
import {
  fetchDomainHistory,
  fetchHostAddresses,
  getCleanDomainName,
  isDomainExists,
  isValidDomainPattern,
  resolveDomain,
} from "./api/apiCalls";
import { DomainsList } from "./components/domainsList/DoaminsList";

import { ToastContainer, toast } from "react-toastify";
import { HostAddresses } from "./components/hostAddresses/HostAddresses";
import { AppLoader } from "./components/appLoader/AppLoader";

function App() {
  const [ipAddresses, setIpAddresses] = useState<any>(null);
  const [domainHistory, setDomainHistory] = useState<any[]>([]);
  const [fetchingHistory, setFetchingHistory] = useState<boolean>(false);
  const [, setDomainInput] = useState<string>("");
  const [domain, setDomain] = useState("");

  const notifyInfo = (message: string) => toast(message, { type: "info" });
  const notifySuccess = (message: string) => toast(message, { type: "success" });
  const notifyError = (message: string) => toast(message, { type: "error" });
  const notifyWarn = (message: string) => toast(message, { type: "warning" });

  useEffect(() => {
    const getIPAddresses = async () => {
      try {
        const data = await fetchHostAddresses();
        setIpAddresses(data);
      } catch (error: string | unknown) {
        notifyError(`${error}`);
        console.error(`${error}`);
      }
    };

    const getDomainHistory = async () => {
      try {
        setFetchingHistory(true);
        const history = await fetchDomainHistory();
        setDomainHistory(history.reverse());
      } catch (error: string | unknown) {
        notifyError(`${error}`);
        console.error(`${error}`);
      } finally {
        setFetchingHistory(false);
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

    try {
      const cleanDomain = getCleanDomainName(domain);

      if (!isValidDomainPattern(cleanDomain)) {
        notifyError(
          `Invalid domain input: "${cleanDomain}".
          Try to use a valid pattern like: "www.mydomain.com"`
        );
        console.error("Invalid domain input.");
        return;
      }

      // Consider if checking the existing domain name directly in the db is better
      if (isDomainExists(cleanDomain, domainHistory)) {
        notifyWarn(`${cleanDomain} is already in your history list.`);
        return;
      }
      const result = await resolveDomain(cleanDomain);
      const reversedHistory = [...domainHistory, result].reverse();

      setDomainHistory(reversedHistory);
      setDomainInput("");
      notifySuccess(
        `The domain name "${cleanDomain}" was successfully resolved to: ${result.ip}`
      );
    } catch (error) {
      setDomainInput("Invalid domain input");
      notifyError(`${error}\nTry to use a valid pattern like: "www.mydomain.com"`);
      console.error(error);
    } finally {
      setTimeout(() => setDomain(""), 500);
    }
  };

  return (
    <div className={classes.content}>
      <header>
        <h1>Domain-IP Resolver</h1>
      </header>

      <main>
        <HostAddresses hostAddresses={ipAddresses} />

        <div className={classes.formContainer}>
          <h2>Resolve Domain's IP</h2>
          <form className={classes.form} onSubmit={handleDomainSubmit}>
            <input
              name="domainName"
              autoFocus
              className={classes.input}
              type="text"
              value={domain}
              onChange={onInputChange}
              placeholder="Domain name..."
              required
            />
            <button className={classes.button} type="submit">
              Resolve
            </button>
          </form>
        </div>

        <div className={classes.resolvedHistory}>
          <h2>History</h2>
          {!fetchingHistory && domainHistory.length > 0 ? (
            <DomainsList domainHistory={domainHistory} />
          ) : (
            <div className={classes.fetchingHistory}>
              <AppLoader />
              <span>Getting history from database...</span>
            </div>
          )}
        </div>

        <ToastContainer
          position="bottom-center"
          closeOnClick
          theme="dark"
          toastClassName={classes.appToast}
        />
      </main>
    </div>
  );
}

export default App;
