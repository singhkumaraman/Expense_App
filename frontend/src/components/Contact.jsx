import React from "react";

const Contact = () => {
  return (
    <section className="bg-gradient-to-br from-white/80 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          Contact Us
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We’d love to hear from you. Whether you have a question, feedback, or
          need support.
        </p>
      </div>

      <form
        action="https://formspree.io/f/xaygwpvg"
        method="POST"
        className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200 space-y-6 transition-all duration-300"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            name="username"
            id="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 text-sm rounded-xl bg-gray-100 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            placeholder="How can we assist you?"
            className="w-full px-4 py-3 text-sm rounded-xl bg-gray-100 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="6"
            required
            placeholder="Write your message here..."
            className="w-full px-4 py-3 text-sm rounded-xl bg-gray-100 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-block w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
