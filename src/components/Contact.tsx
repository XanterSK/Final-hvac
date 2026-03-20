"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const nameValue = String(formData.get("name") ?? "").trim();
    const emailValue = String(formData.get("email") ?? "").trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!nameValue || !emailIsValid) {
      form.reportValidity();
      return;
    }

    setIsSubmitted(true);
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title reveal">{t("contactTitle")}</h2>
        <div className="contact-grid">
          <div className="contact-panel reveal">
            <h3 className="contact-company">{t("contactCompany")}</h3>
            <ul className="contact-items">
              <li>
                <span aria-hidden="true">📍</span>
                <span>{t("contactAddress")}</span>
              </li>
              <li>
                <svg className="contact-inline-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M3 5.75A2.75 2.75 0 0 1 5.75 3h12.5A2.75 2.75 0 0 1 21 5.75v12.5A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25zm2.32-.75 6.68 5.11L18.68 5zM19 6.27l-5.8 4.44a2 2 0 0 1-2.4 0L5 6.27v11.98c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75z"
                  />
                </svg>
                <a href="mailto:info@hvacbms.sk">info@hvacbms.sk</a>
              </li>
              <li>
                <svg className="contact-inline-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.31.56 3.59.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.52 21 3 13.48 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.28.19 2.47.56 3.59a1 1 0 0 1-.24 1z"
                  />
                </svg>
                <a href="tel:+421918113689">+421&nbsp;918&nbsp;113&nbsp;689</a>
              </li>
              <li>
                <svg className="contact-inline-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.31.56 3.59.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.52 21 3 13.48 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.28.19 2.47.56 3.59a1 1 0 0 1-.24 1z"
                  />
                </svg>
                <a href="tel:+421907848563">+421&nbsp;907&nbsp;848&nbsp;563</a>
              </li>
            </ul>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.5945917072477!2d17.1558050120599!3d48.17589427112789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8ee7c0b90979%3A0x9bdbc5f64326d77e!2s11%2C%20Tylova%201042%2C%20831%2004%20Bratislava%2C%20Slovensko!5e0!3m2!1ssk!2sca!4v1773601490654!5m2!1ssk!2sca"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contact-bottom">
              <hr className="contact-divider" />
              <p className="contact-response">{t("contactResponseTime")}</p>
            </div>
          </div>

          <div className="form-panel reveal">
            {!isSubmitted ? (
              <form
                ref={formRef}
                id="contact-form"
                className="contact-form"
                action="#"
                method="post"
                noValidate
                onSubmit={handleSubmit}
              >
                <label htmlFor="name">{t("contactName")}</label>
                <input id="name" name="name" type="text" autoComplete="name" required />

                <label htmlFor="email">{t("contactEmail")}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />

                <label htmlFor="subject">{t("contactSubject")}</label>
                <input id="subject" name="subject" type="text" autoComplete="off" />

                <label htmlFor="message">{t("contactMessage")}</label>
                <textarea id="message" name="message" />

                <button type="submit" className="form-submit">
                  {t("contactSend")}
                </button>
              </form>
            ) : (
              <p className="form-success" id="form-success">
                {t("contactSuccess")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
