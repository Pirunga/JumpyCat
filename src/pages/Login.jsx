import axios from "axios";
import "./Form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

import * as yup from "yup";

const Login = ({ setAuthentication }) => {
  const history = useHistory();

  const schema = yup.object().shape({
    user: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (user) => {
    axios
      .post("https://ka-users-api.herokuapp.com/authenticate", { ...user })
      .then((res) => {
        window.localStorage.clear();
        console.log(res);
        window.localStorage.setItem("authToken", res.data.auth_token);
        setAuthentication(true);
        history.push("/users");
      });
    // .catch((err) =>
    //   setError("password", {
    //     message: err.response.data.error.user_authentication,
    //   })
    // );
  };

  const goBack = () => {
    history.push("/");
  };

  return (
    <div className="form-container-whole">
      <div className="form-content-whole">
        <form className="form-whole" onSubmit={handleSubmit(handleForm)}>
          <div className="form-inputs-whole">
            <label htmlFor="username" className="form-label">
              Usuário
            </label>

            <input
              id="user"
              type="text"
              name="user"
              className="form-input-whole"
              placeholder="Digite seu usuário"
              ref={register}
            />

            <p style={{ color: "red" }}>{errors.user?.message}</p>
          </div>

          <div className="form-inputs-whole">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              className="form-input-whole"
              placeholder="Digite sua senha"
              ref={register}
            />

            <p style={{ color: "red" }}>{errors.password?.message}</p>
          </div>

          <button className="form-input-btn-whole" type="submit">
            Login{" "}
          </button>

          <div className="form-criarConta">
            {" "}
            <span>Não possuí uma conta ? </span>
            <button className="form-input-btn-goback" onClick={goBack}>
              <RiArrowGoBackLine />
              <span>Cadastrar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
