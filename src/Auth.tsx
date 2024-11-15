import { useState } from "react";
import "./Auth.css";

export default function Auth() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  return (
    <div>
      <form className="form">
        <input
          className="form-input"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="email"
        />
        <input
          className="form-input"
          type="passowrd"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <input
          className="form-input"
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="first name"
        />
        <input
          className="form-input"
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="last name"
        />
      </form>
    </div>
  );
}
