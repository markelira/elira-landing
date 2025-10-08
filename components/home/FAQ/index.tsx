'use client';

import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why real-time vs. a regular AI notetaker?",
      answer: "Real-time AI helps you during the meeting when you need it most, not after when it's too late."
    },
    {
      question: "Who is Cluely for?",
      answer: "Cluely is perfect for professionals, students, consultants, and anyone who attends meetings regularly."
    },
    {
      question: "Is Cluely free?",
      answer: "Cluely offers both free and premium plans to suit different needs and usage levels."
    },
    {
      question: "How is it undetectable in meetings?",
      answer: "Cluely runs locally on your device and never joins meetings as a participant or bot."
    },
    {
      question: "What languages and apps are supported?",
      answer: "Cluely supports major languages and works with popular meeting platforms like Zoom, Teams, and Google Meet."
    },
    {
      question: "Can I talk to customer support?",
      answer: "Yes, our support team is available to help with any questions or issues you may have."
    }
  ];

  return (
    <section className="cluely-section">
      <div className="cluely-container">
        <div className="max-w-3xl mx-auto">
          
          <h2 className="cluely-h2 text-center mb-16">
            Frequently asked questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="cluely-card">
                <button
                  className="w-full flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="cluely-h3">{faq.question}</h3>
                  <span className="text-2xl text-gray-400">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="cluely-body">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}