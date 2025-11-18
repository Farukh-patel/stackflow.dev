import { useState } from 'react';
import { SEO } from '../components/SEO.jsx';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link
    const mailtoLink = `mailto:stackflowdotdev@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact from stackflow.dev')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="space-y-8 text-slate-700 dark:text-gray-200">
      <SEO title="Contact Us – stackflow.dev" description="Get in touch with stackflow.dev team" />
      <h1 className="text-2xl sm:text-3xl font-semibold">Contact Us</h1>
      <p className="text-sm sm:text-base text-slate-500 dark:text-gray-400">
        We'd love to hear from you! Whether you have questions about our products, need support, or want to provide feedback, we're here to help.
      </p>

      <div className="space-y-10 text-sm sm:text-base">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 bg-white dark:bg-gray-900/60 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
            
            {submitted ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300">
                <p className="mb-2 font-medium">✓ Message prepared! Your email client should open shortly.</p>
                <p className="text-sm text-slate-600 dark:text-gray-300">If it doesn't open, please email us directly at <a href="mailto:stackflowdotdev@gmail.com" className="text-primary underline">stackflowdotdev@gmail.com</a></p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-slate-500 dark:text-gray-400 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Rahul Sharma"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-slate-500 dark:text-gray-400 mb-1">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="rahul@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-slate-500 dark:text-gray-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-slate-500 dark:text-gray-400 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-xl bg-primary text-gray-900 font-semibold hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 bg-white dark:bg-gray-900/60 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-1">Email</h3>
                  <a 
                    href="mailto:stackflowdotdev@gmail.com" 
                    className="text-primary hover:underline break-all"
                  >
                    stackflowdotdev@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-1">Response Time</h3>
                  <p className="text-slate-600 dark:text-gray-300">
                    We typically respond within 24-48 hours during business days.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">What we can help with:</h3>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-slate-600 dark:text-gray-300">
                    <li>Product questions and support</li>
                    <li>Technical issues or download problems</li>
                    <li>Refund and cancellation requests</li>
                    <li>Partnership and collaboration inquiries</li>
                    <li>Feedback and suggestions</li>
                    <li>General inquiries</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 bg-slate-50 dark:bg-gray-900/70">
              <h3 className="text-lg font-semibold mb-3">Before Contacting Us</h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-gray-300">
                <p>
                  <strong>Order Issues:</strong> Please include your order ID and email address used for purchase.
                </p>
                <p>
                  <strong>Technical Problems:</strong> Please describe the issue in detail and include any error messages or screenshots.
                </p>
                <p>
                  <strong>Refund Requests:</strong> Please refer to our <a href="/refund-policy" className="text-primary underline">Refund Policy</a> and include your order details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <h2 className="text-xl font-semibold mb-3">Other Ways to Connect</h2>
          <p className="text-slate-600 dark:text-gray-300">
            You can also find us on social media or check out our <a href="/about" className="text-primary underline">About</a> page to learn more about stackflow.dev.
          </p>
        </div>
      </div>
    </section>
  );
}

