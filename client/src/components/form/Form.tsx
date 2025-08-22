import classes from "./Form.module.scss";

interface IFormProps {
  domain: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDomainSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.FC<IFormProps> = ({
  onInputChange,
  handleDomainSubmit,
  domain,
}) => {
  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleDomainSubmit}>
        {/* <label htmlFor="domainName">Resolve IP</label> */}
        <input
          name="domainName"
          autoFocus
          type="text"
          value={domain}
          onChange={onInputChange}
          placeholder="Domain name..."
          required
        />
        <button type="submit">Resolve</button>
      </form>
    </div>
  );
};
