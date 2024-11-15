import { useState } from "react";
import "./Auth.css";
import supabase from "./supabase";

export default function Auth() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(supabase);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        // options: {
        //   emailRedirectTo: "http://localhost:5173",
        // },
      });

      if (data) {
        console.log(data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp} className="form">
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

        <button onClick={handleSignUp}>sign Up</button>
      </form>
    </div>
  );
}
