import { motion } from "motion/react";

export function PremiumFooter() {
  const footerLinks = {
    platform: [
      { name: "Szakértők", href: "#" },
      { name: "Modulok", href: "#" },
      { name: "Eredmények", href: "#" },
      { name: "Árazás", href: "#" },
      { name: "API dokumentáció", href: "#" }
    ],
    company: [
      { name: "Rólunk", href: "#" },
      { name: "Karrierlehetőségek", href: "#" },
      { name: "Sajtó", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Befektetők", href: "#" }
    ],
    support: [
      { name: "Segítség", href: "#" },
      { name: "Kapcsolat", href: "#" },
      { name: "Közösség", href: "#" },
      { name: "GYIK", href: "#" },
      { name: "Állapot", href: "#" }
    ],
    legal: [
      { name: "Adatvédelmi szabályzat", href: "#" },
      { name: "Felhasználási feltételek", href: "#" },
      { name: "Sütik", href: "#" },
      { name: "GDPR", href: "#" }
    ]
  };

  const socialLinks = [
    { 
      name: "LinkedIn", 
      href: "#",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: "Twitter", 
      href: "#",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    { 
      name: "Facebook", 
      href: "#",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: "YouTube", 
      href: "#",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.23 7.102c.161-.735.161-2.27.161-2.27s0-1.534-.161-2.27a2.578 2.578 0 00-1.81-1.81C13.755.591 10 .591 10 .591s-3.755 0-4.42.161a2.578 2.578 0 00-1.81 1.81C3.609 3.098 3.609 4.632 3.609 4.632s0 1.535.161 2.27c.094.43.364.8.81 1.019.735.161 2.27.161 2.27.161s1.535 0 2.27-.161c.446-.219.716-.589.81-1.019zm-6.245-1.466l4.26 2.466-4.26 2.466V5.636z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl text-white">
                Elira
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Az egyetlen üzleti képzési platform Magyarországon, ahol bizonyított eredményekkel 
              rendelkező szakértők osztják meg gyakorlati stratégiáikat.
            </p>
            
            {/* Trust badges */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-400 text-xs">ISO 27001 tanúsítvánnyal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-400 text-xs">GDPR megfelelőség</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* Links Sections */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm text-white">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link, index) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm text-white">Vállalat</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm text-white">Támogatás</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm text-white">Jogi</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div 
          className="bg-gray-800 rounded-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-4">
            <h3 className="text-lg text-white">Iratkozz fel hírlevelünkre</h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Hetente kapsz exkluzív tartalmakat, esetpéldákat és üzleti tippeket a legjobb szakértőinktől.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="email@pelda.hu"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm">
                Feliratkozás
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom Section */}
        <motion.div 
          className="border-t border-gray-800 pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Elira Zrt. Minden jog fenntartva. | Adószám: 12345678-2-41
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-gray-400">Készült Budapesten</span>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                <span className="text-gray-400">Minden rendszer működik</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}