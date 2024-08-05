import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const PreguntasFrecuentes = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const questionsAnswers = [
    {
      question: "¿Qué es Inelar?",
      answer:
        "Inelar es una empresa de tecnología especializada en el desarrollo de software y soluciones digitales para empresas de diversos sectores.",
    },
    {
      question: "¿Cuál es la misión de Inelar?",
      answer:
        "Nuestra misión es proporcionar a las empresas herramientas tecnológicas innovadoras que les permitan mejorar su eficiencia y competitividad en el mercado.",
    },
    {
      question: "¿Qué tipos de servicios ofrece Inelar?",
      answer:
        "Inelar ofrece una amplia gama de servicios, que incluyen desarrollo de software a medida, consultoría tecnológica, diseño de aplicaciones móviles y web, y soluciones de comercio electrónico.",
    },
    {
      question: "¿Cómo puedo contactar a Inelar para obtener más información?",
      answer:
        "Puedes ponerte en contacto con nosotros a través de nuestro correo electrónico de contacto: info@inelar.com o llamando al número de teléfono +123-456-789.",
    },
    {
      question: "¿Cuáles son los servicios que ofrece Inelar en el ámbito de seguridad contra incendios?",
      answer:
        "Inelar es una empresa especializada en seguridad contra incendios. Ofrecemos una amplia gama de servicios que incluyen la instalación y mantenimiento de sistemas de detección de incendios, extintores, sistemas de rociadores, y capacitación en seguridad contra incendios. Nuestro objetivo es garantizar la seguridad y protección de tu negocio frente a posibles incendios.",
    },
    {
      question: "¿Inelar proporciona soporte técnico y mantenimiento continuo?",
      answer:
        "Sí, ofrecemos servicios de soporte técnico y mantenimiento continuo para garantizar que las soluciones tecnológicas sigan siendo efectivas y actualizadas a lo largo del tiempo.",
    },
  ];

  const handleClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  useEffect(() => {
    const toggleButtons = document.querySelectorAll(`.${styles.toggleButton}`);

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const faqItem = button.parentElement;
        const answer = faqItem.querySelector(`.${styles.respuesta}`);

        faqItem.classList.toggle("active");
        answer.classList.toggle("show");
        button.textContent = answer.classList.contains("show") ? "-" : "+";

        if (answer.classList.contains("show")) {
          faqItem.style.height = faqItem.scrollHeight + "px";
        } else {
          faqItem.style.height = null;
        }
      });
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Preguntas frecuentes | Inelar</title>
        <meta name="description" content="Descripción de mi aplicación" />
        <link rel="icon" href="/inelar.ico" />
      </Head>
      <h1 className={styles.tituloPaginas}>Preguntas frecuentes</h1>
      <div className={styles.posicionPreguntasFrecuentes}>
        {questionsAnswers.map((item, index) => (
          <div
            className={`${styles.contenedorPreguntaRespuesta} ${
              openQuestion === index ? styles.respuestaAbierta : ""
            }`}
            key={index}
            style={{
              marginBottom: openQuestion === index ? "20px" : "0",
              height: openQuestion === index ? "auto" : "60px",
            }}
          >
            <button
              className={styles.toggleButton}
              onClick={() => handleClick(index)}
            >
              {openQuestion === index ? "-" : "+"}
            </button>
            <h2 id={styles.titulosPreguntas}>{item.question}</h2>
            <div
              className={`${styles.respuesta} ${
                openQuestion === index ? styles.respuestaVisible : ""
              } show`}
            >
              <p id={styles.respuestasPreguntas}>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default PreguntasFrecuentes;
