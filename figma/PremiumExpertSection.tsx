import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function PremiumExpertSection() {
  const experts = [
    {
      name: "Nagy Péter",
      title: "Vezérigazgató, TechStart Kft.",
      achievement: "2 év alatt 10x bevétel növekedés",
      description: "Adatvezérelt növekedési stratégiák specialistája",
      image: "https://images.unsplash.com/photo-1589568482418-998c3cb2430a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwZGF0YSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTk2MTAwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      metrics: ["€15M bevétel", "250+ alkalmazott", "12 ország"],
      expertise: ["Növekedési stratégia", "Adatelemzés", "Csapatfejlesztés"]
    },
    {
      name: "Kovács Anna",
      title: "Ügyvezető, InnovaCorp",
      achievement: "500+ sikeres projektkikövetes",
      description: "Operációs hatékonyság és csapatvezetés",
      image: "https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NTk2MTAwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      metrics: ["95% projektérték", "€8M megtakarítás", "3x hatékonyság"],
      expertise: ["Projektmenedzsment", "Lean működés", "Változásvezetés"]
    },
    {
      name: "Szabó János",
      title: "Pénzügyi igazgató, SuccessLtd",
      achievement: "€15M költségmegtakarítás évente",
      description: "Pénzügyi optimalizáció és befektetési stratégiák",
      image: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBncm93dGglMjBjaGFydHxlbnwxfHx8fDE3NTk2MTAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      metrics: ["€15M megtakarítás", "40% ROI növekmény", "5 befektetési kör"],
      expertise: ["Pénzügyi tervezés", "Befektetési stratégia", "Kockázatmenedzsment"]
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm">
            Világszínvonalú szakértők
          </span>
          <h2 className="text-4xl lg:text-5xl text-gray-900">
            Bizonyított eredményekkel rendelkező
            <span className="block">
              üzleti vezetők
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Minden szakértőnk saját bőrén tapasztalta meg, hogy működnek azok a stratégiák, amiket megosztanak. 
            Nem elméleti tudást, hanem valós, tesztelt és skálázható módszereket tanulsz.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {experts.map((expert, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-6">
                {/* Profile Image */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <ImageWithFallback
                    src={expert.image}
                    alt={expert.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
                
                {/* Expert Info */}
                <div className="text-center space-y-3 mb-6">
                  <h3 className="text-lg text-gray-900">{expert.name}</h3>
                  <p className="text-gray-600 text-sm">{expert.title}</p>
                  <p className="text-gray-700 text-sm">{expert.description}</p>
                </div>
                
                {/* Achievement */}
                <div className="bg-gray-50 rounded-xl p-4 text-center mb-6">
                  <div className="text-gray-900 text-sm">{expert.achievement}</div>
                </div>
                
                {/* Metrics */}
                <div className="space-y-2 mb-6">
                  {expert.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                      <span className="text-gray-700 text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
                
                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900 rounded-2xl p-12 text-white">
            <h3 className="text-2xl mb-4">50+ további szakértő vár rád</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Az Elira platformon találkozhatsz Magyarország legjobb üzleti vezetőivel, 
              akik megosztják veled a sikerük titkait.
            </p>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              Összes szakértő megtekintése
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}