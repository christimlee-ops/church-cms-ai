"use client";

import { useState } from "react";
import { FiSend, FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="relative bg-navy-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/Chruch.webp" alt="St. Mark Lutheran Church" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/70" />
        </div>
        <div className="relative section-padding">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Contact Us</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              We&apos;d love to hear from you. Send us a message and we&apos;ll get back to you soon.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {status === "sent" ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <h3 className="text-xl text-green-700 mb-2">Message Sent!</h3>
                  <p className="text-green-600">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1.5">Name *</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1.5">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1.5">Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1.5">Subject *</label>
                      <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">Message *</label>
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" />
                  </div>
                  {status === "error" && (
                    <p className="text-red-500 text-sm mb-4">Something went wrong. Please try again.</p>
                  )}
                  <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-50">
                    <FiSend className="w-4 h-4" />
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg mb-4">Get In Touch</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <FiMapPin className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                    <span className="text-secondary-500 text-sm">2349 S. Ohio St., Salina, KS 67401</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiPhone className="w-5 h-5 text-primary-500 shrink-0" />
                    <span className="text-secondary-500 text-sm">(785) 825-7455</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiMail className="w-5 h-5 text-primary-500 shrink-0" />
                    <span className="text-secondary-500 text-sm">stmarksalina@gmail.com</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg mb-4">Service Times</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FiClock className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-secondary-700 text-sm">Sunday Worship</p>
                      <p className="text-secondary-400 text-sm">9:00 AM</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiClock className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-secondary-700 text-sm">Bible Study & Sunday School</p>
                      <p className="text-secondary-400 text-sm">10:15 AM</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiClock className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-secondary-700 text-sm">Wednesday Classes</p>
                      <p className="text-secondary-400 text-sm">6:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-8">Find Us</h2>
          <div className="aspect-[16/7] rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=2349+S+Ohio+St,+Salina,+KS+67401&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St. Mark Lutheran Church location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
