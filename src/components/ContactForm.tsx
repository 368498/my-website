import React from 'react';
import { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (This is a demo form.)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="w-full">
      <div className="flex items-end w-full mb-6">
        <h1 className="text-5xl font-bold whitespace-nowrap pr-6 border-b-2 border-secondary leading-none pb-1" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}>
          Contact
        </h1>
        <div className="flex-1 border-b-2 border-secondary" style={{ minWidth: 0 }}></div>
      </div>
      <form onSubmit={handleSubmit} className="flex  mt-12 flex-col gap-6">
        <label className="text-xs uppercase tracking-widest text-secondary" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }} htmlFor="name">
          Name
        </label>
        <input
          className="w-full bg-primary border-b-2 border-secondary text-secondary  focus:outline-none focus:border-accent transition-colors font-sans text-base"
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}
        />
        <label className="text-xs uppercase tracking-widest text-secondary" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }} htmlFor="email">
          Email
        </label>
        <input
          className="w-full bg-primary border-b-2 border-secondary text-secondary  focus:outline-none focus:border-accent transition-colors font-sans text-base"
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}
        />
        <label className="text-xs uppercase tracking-widest text-secondary" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }} htmlFor="message">
          Message
        </label>
        <textarea
          className="w-full bg-primary border-b-2 border-secondary text-secondary  focus:outline-none focus:border-accent transition-colors font-sans text-base min-h-[120px] resize-none"
          name="message"
          id="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}
        />
        <button
          type="submit"
          className="mt-4 bg-accent text-secondary uppercase px-8 py-3 tracking-widest text-center font-bold font-sans w-full hover:bg-red-accent transition-colors border-none"
          style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ContactForm; 