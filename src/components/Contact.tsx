import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState({
    type: 'success',
    mainText: '',
    subText: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      
      await emailjs.send(
        'service_9h8x9d8',
        'template_8h7x9d8',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        '7tDyC3h17GtQ4mty8'
      );

      setMessageContent({
        type: 'success',
        mainText: 'The message has been sent! ✅',
        subText: 'Thanks — I\'ll get back to you soon.'
      });
      setShowMessage(true);
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setMessageContent({
        type: 'error',
        mainText: 'Message failed to send! ❌',
        subText: 'Please try again later.'
      });
      setShowMessage(true);
    }
  };

  const handleNewMessage = () => {
    setShowMessage(false);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <section
      id="contact"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-3xl font-semibold text-c06c84 underline-animate text-glow slide-up">
            Contact Me
          </h2>
          <p
            className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Let's Work Together
          </p>
          <p className="mt-6 text-lg text-gray-300">
            Feel free to reach out for collaborations or just to say hello!
          </p>
        </div>

        <div
          id="form-container"
          className="mt-12 max-w-2xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm"
          style={{ opacity: 0.97 }}
        >
          {!showMessage ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-gray-700 text-white px-4 py-3 focus:border-c06c84 focus:ring-c06c84"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-gray-700 text-white px-4 py-3 focus:border-c06c84 focus:ring-c06c84"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 block w-full rounded-lg bg-gray-700 text-white px-4 py-3 focus:border-c06c84 focus:ring-c06c84"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover-glow"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div
              id="contact-message"
              className="mt-6"
              role="status"
              aria-live="polite"
            >
              <div
                className="max-w-2xl mx-auto p-4 sm:p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm animated-bg transform transition-all duration-300 opacity-100 translate-y-0"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div
                    className="p-3 rounded-lg bg-indigo-600 text-white shrink-0"
                  >
                    <i className="fa-solid fa-envelope-circle-check text-xl"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-white wrap-break-word"
                    >
                      {messageContent.mainText}
                    </p>
                    <p
                      className="text-sm text-gray-300 mt-1 wrap-break-word"
                    >
                      {messageContent.subText}
                    </p>
                  </div>
                  <div
                    className="flex gap-2 items-start w-full sm:w-auto flex-wrap sm:flex-nowrap"
                  >
                    <button
                      onClick={handleNewMessage}
                      className="px-3 sm:px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm flex-1 sm:flex-none"
                    >
                      Send another
                    </button>
                    <button
                      onClick={handleCloseMessage}
                      className="px-3 py-2 text-gray-300 hover:text-white text-sm flex-1 sm:flex-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="mt-8 flex justify-center gap-6"
          >
            <a
              className="text-white text-2xl hover:text-indigo-400 transition-colors duration-300"
              href="https://github.com/omartantawy360"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i
                className="fab fa-github"
              ></i>
            </a>
            <a
              className="text-white text-2xl hover:text-indigo-400 transition-colors duration-300"
              href="mailto:omartantawy360@gmail.com"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a
              className="text-white text-2xl hover:text-indigo-400 transition-colors duration-300"
              href="https://wa.me/201061720405"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              className="text-white text-2xl hover:text-indigo-400 transition-colors duration-300"
              href="https://www.linkedin.com/in/omar-tantawy-a74a96376"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
