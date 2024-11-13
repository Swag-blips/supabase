import { useState } from "react";
import "./Auth.css";

export default function Auth() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent)
  return (
    <div>
      <form>
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className="form-input"
          type="passowrd"
          name="password"
          placeholder="password"
        />
        <input
          className="form-input"
          type="text"
          name="firstName"
          placeholder="first name"
        />
        <input
          className="form-input"
          type="text"
          name="lastName"
          placeholder="last name"
        />
      </form>
    </div>
  );
}
