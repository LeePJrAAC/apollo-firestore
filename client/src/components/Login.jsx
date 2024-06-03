import { useState, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error, data }] = useMutation(LOGIN);
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ variables: { email, password } });
      if (response.data.login.token) {
        loginContext(response.data.login.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
      <button type='submit'>Login</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && <p>{data.login.user.email} logged in</p>}
    </form>
  );
};
