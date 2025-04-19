import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const form = useRef();
  const [captchaToken, setCaptchaToken] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify you are human (reCAPTCHA).");
      return;
    }

    emailjs
      .sendForm(
        "your_service_id",
        "your_template_id",
        form.current,
        "your_user_id"
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
          setCaptchaToken(null);
        },
        () => {
          setError(true);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-16 py-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Contact Home Hunt Team</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white shadow-md rounded p-6 flex-1"
        >
          {/* inputs here... */}
          {/* reCAPTCHA Integration */}
          <div className="my-4">
            <ReCAPTCHA
              sitekey="your_site_key" // replace with your key
              onChange={handleCaptchaChange}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded text-white font-semibold"
          >
            Submit
          </button>

          {success && <p className="text-green-600 mt-2">Message sent successfully!</p>}
          {error && <p className="text-red-600 mt-2">Something went wrong. Try again.</p>}
        </form>

        {/* right column contact info */}
      </div>

      {/* Google Map embed below... */}
    </div>
  );
};

export default Contact;
