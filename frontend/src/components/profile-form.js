import { useState, useEffect } from "react";

const ProfileForm = ({ label, value = "", name, backendPath }) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [status, setStatus] = useState({
    update: false,
    error: false,
    message: null,
  });
  useEffect(() => {
    setFieldValue(value);
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, [value]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fieldValue.trim() === "")
      setStatus({
        update: true,
        error: true,
        message: `${label} field cannot be empty while submitting`,
      });
    const response = await fetch(`${backendPath}/profile/change-info`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        newValue: fieldValue,
      }),
      headers: { "Content-type": "application/json" },
    });
    const msg = await response.json();
    if (response.ok)
      setStatus({
        update: true,
        error: false,
        message: `${label} changed to ${msg}`,
      });
    else
      setStatus({
        update: true,
        error: true,
        message: msg,
      });

    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  };
  const handleChange = (event) => {
    const val = event.target.value.trim();
    if (val === "")
      setStatus({
        update: true,
        error: true,
        message: `${label} field cannot be null`,
      });
    else
      setStatus({
        update: false,
        error: false,
        message: null,
      });
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
            className={
              status.update
                ? status.error
                  ? "input-err"
                  : "input-success"
                : null
            }
          />
          <button className="btn-view">change</button>
        </div>
        {status.update ? (
          <div className={status.error ? "err-msg" : "success-msg"}>
            {status.message}
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ProfileForm;
