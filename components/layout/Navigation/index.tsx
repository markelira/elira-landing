'use client';

export function Navigation() {
  return (
    <nav className="cluely-nav">
      <div className="cluely-nav-container">
        {/* Logo */}
        <a href="/" className="cluely-logo">
          Cluely
        </a>
        
        {/* Navigation Links */}
        <div className="cluely-nav-links">
          <a href="/pricing" className="cluely-nav-link">
            Pricing
          </a>
          <a href="/enterprise" className="cluely-nav-link">
            Enterprise
          </a>
          <button className="cluely-nav-link">
            Learn
          </button>
        </div>
        
        {/* CTA Button */}
        <a href="#" className="cluely-btn cluely-btn-primary">
          Get Started for Free
        </a>
      </div>
    </nav>
  );
}