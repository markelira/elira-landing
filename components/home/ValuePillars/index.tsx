'use client';

export function ValuePillars() {
  const features = [
    {
      title: "People search",
      description: "Before every meeting, Cluely gives you background on attendees and your past conversations."
    },
    {
      title: "Follow-up email", 
      description: "After every meeting, Cluely generates a follow-up email and notes based on the conversation."
    }
  ];

  return (
    <section className="cluely-section">
      <div className="cluely-container">
        <div className="cluely-grid cluely-grid-2">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4">
              <h2 className="cluely-h2">{feature.title}</h2>
              <p className="cluely-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}