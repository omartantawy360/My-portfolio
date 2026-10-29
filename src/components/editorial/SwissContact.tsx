import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile, socialLinks } from '../../data/portfolioData';

const SwissContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID = 'service_f6y55p6';
    const templateID = 'template_t9jcx0t';
    const publicKey = '7tDyC3h17GtQ4mty8';

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      })
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err.text || 'Something went wrong. Please try again or reach out directly.');
      });
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-[#304FFE] text-white border-b-4 border-[#20201E] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-white pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#20201E] bg-[#D7FF45] px-3 py-1 border border-[#20201E] shadow-[2px_2px_0px_#20201E] w-max mb-2">
              <span>[07]</span>
              <span>{'//'} DIRECT TRANSMISSION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              Initiate Dialogue
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-white/80 max-w-sm">
            Available for contracts, full-time roles, and creative engineering collaborations.
          </span>
        </div>

        {/* Contact Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Coordinates Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F7F3E8] text-[#20201E] border-4 border-[#20201E] p-8 shadow-[8px_8px_0px_#20201E] space-y-6">
              <div>
                <span className="text-[10px] font-mono font-black tracking-widest text-[#FF4B35] uppercase block mb-1">
                  {'//'} DISPOSITION
                </span>
                <h3 className="text-2xl font-black tracking-tight">Available For Hire</h3>
                <p className="text-xs font-mono text-[#20201E]/70 mt-1">
                  Cairo, Egypt · GMT+2 · Ready to collaborate worldwide
                </p>
              </div>

              {/* Email with 1-Click Copy */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-black text-[#20201E]/60 uppercase">
                  DIRECT INBOX
                </span>
                <div className="flex items-center justify-between p-3 bg-white border-2 border-[#20201E] shadow-[3px_3px_0px_#20201E]">
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="EMAIL"
                    className="font-mono font-bold text-xs sm:text-sm truncate mr-2 hover:text-[#FF4B35] transition-colors"
                  >
                    {profile.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    data-cursor="COPY"
                    className="px-3 py-1 bg-[#D7FF45] hover:bg-[#FF4B35] hover:text-white border border-[#20201E] font-mono font-bold text-xs shadow-[1px_1px_0px_#20201E] transition-all shrink-0"
                  >
                    {copiedEmail ? 'COPIED!' : 'COPY'}
                  </button>
                </div>
              </div>

              {/* Social Grid */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-black text-[#20201E]/60 uppercase">
                  SOCIAL NODES
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="OPEN"
                      className="p-2.5 bg-white border-2 border-[#20201E] font-mono font-bold text-xs flex items-center justify-between shadow-[2px_2px_0px_#20201E] hover:bg-[#D7FF45] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#20201E] transition-all"
                    >
                      <span>{s.name}</span>
                      <span>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional EmailJS Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-[#20201E] border-4 border-[#20201E] p-8 sm:p-10 shadow-[8px_8px_0px_#20201E]">
              <span className="text-[10px] font-mono font-black tracking-widest text-[#FF4B35] uppercase block mb-6">
                {'//'} TRANSMISSION INTERFACE
              </span>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-black uppercase text-[#20201E]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full p-3 bg-[#FAF8F5] border-2 border-[#20201E] font-mono text-xs focus:outline-none focus:bg-white shadow-[2px_2px_0px_#20201E] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-black uppercase text-[#20201E]">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@studio.com"
                      className="w-full p-3 bg-[#FAF8F5] border-2 border-[#20201E] font-mono text-xs focus:outline-none focus:bg-white shadow-[2px_2px_0px_#20201E] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-black uppercase text-[#20201E]">
                    Project Brief / Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your timeline, scope, or collaboration ideas..."
                    className="w-full p-3 bg-[#FAF8F5] border-2 border-[#20201E] font-mono text-xs focus:outline-none focus:bg-white shadow-[2px_2px_0px_#20201E] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  data-cursor="SUBMIT"
                  className={`w-full py-4 border-2 border-[#20201E] font-mono font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#20201E] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#20201E] active:translate-x-0 active:translate-y-0 transition-all flex items-center justify-center gap-2 ${
                    status === 'sending'
                      ? 'bg-slate-300 text-[#20201E] cursor-not-allowed'
                      : 'bg-[#FF4B35] text-white hover:bg-[#20201E] hover:text-[#D7FF45]'
                  }`}
                >
                  {status === 'sending' ? (
                    <span>DISPATCHING TRANSMISSION...</span>
                  ) : (
                    <>
                      <span>DISPATCH MESSAGE</span>
                      <span>→</span>
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="p-3 bg-[#D7FF45] border-2 border-[#20201E] font-mono text-xs font-bold text-[#20201E] shadow-[2px_2px_0px_#20201E]">
                    ✔ Transmission received! Omar will respond promptly.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 bg-[#FF4B35] border-2 border-[#20201E] font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#20201E]">
                    ⚠ {errorMsg}
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

export default SwissContact;

