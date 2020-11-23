import axios from "axios";
import "./Form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const UserForm = () => {
  const history = useHistory();

  const confirm = yup.object().shape({
    user: yup
      .string()
      .min(6, "Digite um usuário com mínimo de 6 caracteres")
      .required("Campo obrigatório"),

    name: yup
      .string()
      .required("Campo obrigatório")
      .matches(/^([A-z]+\s+[A-z])\w+/, "Digite pelo menos um sobrenome"),

    email: yup.string().email("Email inválido").required("Campo obrigatório"),

    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório")
      .matches(
        /^((?=.*[!@#$%^&*()\-_=+/?{};:,<.>]){1})(?=.*\d).*$/,
        "Senha deve conter ao menos um caracter especial"
      ),

    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Senha diferentes")
      .required("Campo obrigatório"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(confirm),
  });

  const submitForm = (user) => {
    axios
      .post("https://ka-users-api.herokuapp.com/users", { user })
      .then(history.push("/sucess"));
  };

  return (
    <div className="form-content-right">
      <form action="" className="form" onSubmit={handleSubmit(submitForm)}>
        <h1>
          Comece hoje, crie aqui sua conta <span>JumpyCat!</span>
        </h1>

        <div className="form-inputs">
          <label htmlFor="user" className="form-label">
            Usuário
          </label>

          <input
            id="user"
            type="text"
            name="user"
            className="form-input"
            placeholder="Digite seu usuário"
            ref={register}
          />

          <p style={{ color: "red" }}>{errors.user?.message}</p>
        </div>

        <div className="form-inputs">
          <label htmlFor="name" className="form-label">
            Nome
          </label>

          <input
            id="name"
            type="name"
            name="name"
            className="form-input"
            placeholder="Digite seu nome completo"
            ref={register}
          />

          <p style={{ color: "red" }}>{errors.name?.message}</p>
        </div>

        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            id="email"
            type="text"
            name="email"
            className="form-input"
            placeholder="Digite seu e-mail"
            ref={register}
          />

          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Senha
          </label>

          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="Digite sua senha"
            ref={register}
          />

          <p style={{ color: "red" }}>{errors.password?.message}</p>
        </div>

        <div className="form-inputs">
          <label htmlFor="confirmPassword" className="form-label">
            Confirme sua senha
          </label>

          <input
            id="confirmPassword"
            type="password"
            name="password_confirmation"
            className="form-input"
            placeholder="Confirme sua senha"
            ref={register}
          />
          <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
        </div>

        <button className="form-input-btn" type="submit">
          Registrar{" "}
        </button>

        <span className="form-input-login">
          Já possui uma conta JumpyCat ? <a href="/login">Entre aqui </a>
        </span>
      </form>
    </div>
  );
};

export default UserForm;
