import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

// Definição do schema de validação com Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  message: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
});

function ContactPage() {
  const [formStatus, setFormStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setFormStatus("Mensagem enviada com sucesso!");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Entre em contato conosco</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ maxWidth: "600px" }}
      >
        {/* Nome */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nome
          </label>
          <input
            id="name"
            {...register("name")}
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && (
            <div className="invalid-feedback">
              {typeof errors.name.message === "string"
                ? errors.name.message
                : "Campo inválido"}
            </div>
          )}
        </div>

        {/* E-mail */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.name && (
            <div className="invalid-feedback">
              {typeof errors.name.message === "string"
                ? errors.name.message
                : "email inválido"}
            </div>
          )}
        </div>

        {/* Mensagem */}
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Mensagem
          </label>
          <textarea
            id="message"
            {...register("message")}
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            rows="8"
          ></textarea>
          {errors.name && (
            <div className="invalid-feedback">
              {typeof errors.name.message === "string"
                ? errors.name.message
                : "Campo inválido"}
            </div>
          )}
        </div>

        {/* Status do Formulário */}
        {formStatus && <div className="alert alert-success">{formStatus}</div>}

        {/* Botão de Enviar */}
        <button type="submit" className="btn btn-success w-100">
          Enviar
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-link">
          Voltar para loja
        </Link>
      </div>
    </div>
  );
}

export default ContactPage;
