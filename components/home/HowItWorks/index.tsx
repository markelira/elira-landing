'use client';

export function HowItWorks() {
  return (
    <section className="cluely-section bg-gray-50">
      <div className="cluely-container text-center space-y-16">
        
        {/* Section badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3">
          <span className="text-sm font-medium text-gray-600">It's time to cheat</span>
        </div>
        
        {/* Main heading */}
        <h2 className="cluely-h2 max-w-4xl mx-auto">
          <span className="block">Interviews. Sales calls. Homework. Meetings.</span>
          <span className="block">Really everything.</span>
        </h2>
        
        {/* CTA Button */}
        <button className="cluely-btn cluely-btn-primary">
          Get for Mac
        </button>
        
        {/* Features section */}
        <div className="mt-32 space-y-16">
          
          {/* Undetectable section */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
            </div>
            <h2 className="cluely-h2 mb-8">Undetectable by Design</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="cluely-card text-left">
                <h3 className="cluely-h3 mb-4">Doesn't join meetings</h3>
                <p className="cluely-body">Cluely never joins your meetings, so there are no bots and no extra people on the guest list.</p>
              </div>
              <div className="cluely-card text-left">
                <h3 className="cluely-h3 mb-4">Invisible to screen share</h3>
                <p className="cluely-body">Cluely never shows up in shared screens, recordings, or external meeting tools.</p>
              </div>
              <div className="cluely-card text-left">
                <h3 className="cluely-h3 mb-4">Never in your way</h3>
                <p className="cluely-body">Cluely appears as a translucent and hideable window over all your other applications.</p>
              </div>
            </div>
          </div>
          
          {/* Feedback section */}
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 mb-8">
              <span className="text-sm font-medium text-gray-600">You mess up way more than you think</span>
            </div>
            <h2 className="cluely-h2 mb-8">Cluely tells you where you went wrong</h2>
            <p className="cluely-body">
              After every call, Cluely tells you how to improve, whether you're interviewing for a job, 
              selling a product, working on an assignment, or just chatting.
            </p>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}