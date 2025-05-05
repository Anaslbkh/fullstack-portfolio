"use-client"
import { useState, ChangeEvent, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// Temporary site key for development - Replace this with your actual site key from Google reCAPTCHA
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export default function ContactForm() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (!recaptchaValue) {
      newErrors.recaptcha = 'Please verify that you are not a robot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
    if (errors.recaptcha) {
      setErrors(prev => ({ ...prev, recaptcha: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatus('Sending...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: recaptchaValue
        }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setRecaptchaValue(null);
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 relative z-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Let&apos;s Chat<span className="text-blue-500">.</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Feel free to reach out if you&apos;re interested in working together
        </p>
      </div>

      {/* Hidden form for API submission */}
      <form onSubmit={handleSubmit} className="space-y-8 hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200
                ${errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'
                }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200
                ${errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200 resize-none
              ${errors.message 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'
              }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
            theme="dark"
          />
        </div>
        {errors.recaptcha && (
          <p className="text-sm text-red-500 dark:text-red-400 text-center">{errors.recaptcha}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 
            ${isSubmitting 
              ? 'opacity-75 cursor-not-allowed' 
              : 'hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>

        {status && (
          <p className={`text-sm text-center transition-all duration-300 ${
            status.includes('successfully') 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {status}
          </p>
        )}
      </form>

      {/* Mailto form */}
      <form onSubmit={handleMailtoSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200 hover:border-blue-400"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200 hover:border-blue-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200 resize-none hover:border-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send Message via Email
        </button>
      </form>
    </div>
  );
}
 