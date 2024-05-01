import { useState, useEffect } from "react";

const ProfileForm = ({ label, value = "", name, backendPath }) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [err, setErr] = useState(null);
  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`${backendPath}/scholar/change-info`, {
      method: "POST",
      credentials: "include",
      body: {
        name: name,
        newValue: fieldValue,
      },
    });
  };
  const handleChange = (event) => {
    const val = event.target.value.trim();
    if (val === "") setErr(`${label} field cannot be null`);
    else setErr(null);
    setFieldValue(val);
  };
  return (
    <form className="profile-lblform" onSubmit={(event) => handleSubmit(event)}>
      <div className="label">{label}</div>
      <div>
        <div className="profile-action">
          <input
            type="text"
            value={fieldValue}
            name={name}
            placeholder={label}
            onChange={(event) => handleChange(event)}
            className={err ? "input-err" : null}
          />
          <button className="btn-view">change</button>
        </div>
        {err ? <div className="err-msg">{err}</div> : null}
      </div>
    </form>
  );
};

export default ProfileForm;
