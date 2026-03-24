import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    const serviceID = 'service_f6y55p6';
    const templateID = 'template_t9jcx0t';
    const publicKey = '7tDyC3h17GtQ4mty8';

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err.text || 'Something went wrong. Please try again.');
      });
  };

  const socialLinks = [
    { name: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/omartantawy360' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/omar-tantawy-a74a96376' },
    { name: 'WhatsApp', icon: 'fab fa-whatsapp', href: 'https://wa.me/201061720405' },
    { name: 'Email', icon: 'fa-solid fa-envelope', href: 'mailto:omartantawy360@gmail.com' }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Info Side */}
          <div className="lg:w-1/3 animate-fade-in-up">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Contact</h2>
            <h3 className="text-4xl font-bold text-white mb-8">Get In Touch</h3>
            <p className="text-slate-400 text-lg mb-12">
              Have a project in mind or just want to chat? Feel free to reach out. 
              I'm always open to new opportunities and collaborations.
            </p>
            
            <div className="space-y-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl glass hover:bg-slate-900/60 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <i className={`${link.icon} text-lg`}></i>
                  </div>
                  <span className="text-slate-200 font-medium group-hover:text-white">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 w-full animate-fade-in-up [animation-delay:200ms]">
            <div className="glass-card p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98] ${
                      status === 'sending' 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                    }`}
                  >
                    {status === 'sending' ? (
                      <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center animate-fade-in">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center animate-fade-in">
                    {errorMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

