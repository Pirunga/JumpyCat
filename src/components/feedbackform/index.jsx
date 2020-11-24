import "../../pages/Form.css";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

import * as yup from "yup";

const FeedbackForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const token = window.localStorage.getItem("authToken");

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    comment: yup.string().required("Campo obrigatório"),
    grade: yup
      .number()
      .typeError("Nota deve ser em número")
      .integer("Digite somente o número antes da vírgula")
      .positive("Digite um número positivo")
      .max(10, "Máximo nota 10")
      .required("Campo obrigatório"),
  });

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (feedback) => {
    axios
      .post(
        `https://ka-users-api.herokuapp.com/users/${id}/feedbacks`,
        {
          feedback,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res);
        history.push(`/users/feedbacks/${id}`);
      })
      .catch((err) =>
        setError("grade", {
          message: err.response.data.error.user_authentication,
        })
      );
  };

  return (
    <div className="form-container-whole">
      <div className="form-content-whole">
        <form className="form-whole" onSubmit={handleSubmit(handleForm)}>
          <div className="form-inputs-whole">
            <label htmlFor="name" className="form-label">
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              className="form-input-whole"
              placeholder="Digite seu nome"
              ref={register}
            />

            <p style={{ color: "red" }}>{errors.name?.message}</p>
          </div>

          <div className="form-inputs-whole">
            <label htmlFor="comment" className="form-label">
              Comentário
            </label>

            <input
              id="comment"
              type="text"
              name="comment"
              className="form-input-whole"
              placeholder="Digite seu comentário"
              ref={register}
            />

            <p style={{ color: "red" }}>{errors.comment?.message}</p>
          </div>

          <div className="form-inputs-whole">
            <label htmlFor="grade" className="form-label">
              Nota
            </label>

            <input
              id="grade"
              type="number"
              name="grade"
              className="form-input-whole"
              placeholder="Digite sua nota"
              ref={register}
            />

            <p style={{ color: "red" }}>{errors.grade?.message}</p>
          </div>

          <button className="form-input-btn-whole" type="submit">
            Enviar{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
