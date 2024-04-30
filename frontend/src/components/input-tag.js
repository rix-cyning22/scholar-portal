import { useState } from "react";

const Input = ({ inputname, placeholder }) => {
  const [err, setErr] = useState(null);
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    if (event.target.value === "")
      setErr(`${placeholder} field cannot be empty`);
    setValue(event.target.value);
  };
  const inputType = placeholder.includes("Password") ? "password" : "text";
  return (
    <>
      <input
        type={inputType}
        placeholder={placeholder}
        name={inputname}
        onChange={handleChange}
        value={value}
        className={err ? "input-err" : null}
      />
      {err ? <div className="err-msg">{err}</div> : null}
    </>
  );
};

export default Input;
