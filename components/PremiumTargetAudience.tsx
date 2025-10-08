import { motion } from "motion/react";

export function PremiumTargetAudience() {
  const audiences = [
    {
      title: "Startupok és kisvállalkozások",
      description: "Akik gyorsan szeretnének növekedni, de nem akarnak költséges hibákat elkövetni.",
      size: "1-50 alkalmazott",
      revenue: "€50K - €2M",
      challenges: ["Limitált erőforrások", "Gyors skálázás", "Hatékony marketing"],
      solutions: ["Gyors növekedési stratégiák", "Költséghatékony módszerek", "Kockázatcsökkentés"],
      stats: { users: "1,200+", success: "89%", growth: "340%" }
    },
    {
      title: "Középvállalatok",
      description: "Akik szeretnék optimalizálni folyamataikat és növelni hatékonyságukat.",
      size: "50-250 alkalmazott",
      revenue: "€2M - €15M",
      challenges: ["Folyamat optimalizáció", "Csapat koordináció", "Digitalizáció"],
      solutions: ["Operációs hatékonyság", "Csapatfejlesztés", "Folyamatoptimalizáció"],
      stats: { users: "850+", success: "92%", growth: "180%" }
    },
    {
      title: "Nagyvállalatok",
      description: "Akik új üzleti lehetőségeket keresnek és innovációt szeretnének bevezetni.",
      size: "250+ alkalmazott",
      revenue: "€15M+",
      challenges: ["Innováció lassúsága", "Bürokratikus folyamatok", "Változáskezelés"],
      solutions: ["Innovációs stratégiák", "Digitális transzformáció", "Változásmenedzsment"],
      stats: { users: "320+", success: "94%", growth: "120%" }
    }
  ];

  const industries = [
    { name: "Technológia", growth: "+45%" },
    { name: "Építőipar", growth: "+32%" },
    { name: "Szolgáltatások", growth: "+28%" },
    { name: "Kereskedelem", growth: "+38%" },
    { name: "Gyártás", growth: "+25%" },
    { name: "Egészségügy", growth: "+41%" }
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
            Kinek készült
          </span>
          <h2 className="text-4xl lg:text-5xl text-gray-900">
            Magyar vállalkozások és vállalatok
            <span className="block">
              minden méretben
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bármilyen méretű vállalkozás vagy vállalat vagy, az Elira platform 
            segít abban, hogy ne próbálgatással, hanem működő módszerekkel érjétek el céljaitokat.
          </p>
        </motion.div>

        {/* Audience Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {/* Title & Description */}
                <div className="space-y-3">
                  <div className="text-gray-500 text-sm">{audience.size}</div>
                  <h3 className="text-lg text-gray-900">{audience.title}</h3>
                  <p className="text-gray-600 text-sm">{audience.description}</p>
                  <div className="text-sm text-gray-500">
                    Átlagos bevétel: {audience.revenue}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <div className="text-lg text-gray-900">{audience.stats.users}</div>
                    <div className="text-xs text-gray-500">Ügyfelek</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg text-gray-900">{audience.stats.success}</div>
                    <div className="text-xs text-gray-500">Siker ráta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg text-gray-900">{audience.stats.growth}</div>
                    <div className="text-xs text-gray-500">Növekedés</div>
                  </div>
                </div>

                {/* Challenges */}
                <div className="space-y-3">
                  <h4 className="text-sm text-gray-900">Fő kihívások:</h4>
                  <div className="space-y-2">
                    {audience.challenges.map((challenge, challengeIndex) => (
                      <div
                        key={challengeIndex}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        <span className="text-gray-600 text-sm">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div className="space-y-3">
                  <h4 className="text-sm text-gray-900">Elira megoldások:</h4>
                  <div className="space-y-2">
                    {audience.solutions.map((solution, solutionIndex) => (
                      <div
                        key={solutionIndex}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                        <span className="text-gray-600 text-sm">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Coverage */}
        <motion.div 
          className="bg-gray-900 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl">Minden iparágban alkalmazható</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Az Elira platformon tanított stratégiák univerzálisak. A hatékony üzleti módszerek 
                mindenhol alkalmazhatók, függetlenül az iparágtól.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-white text-sm mb-2">{industry.name}</div>
                  <div className="text-gray-400 text-xs">{industry.growth}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                Iparág-specifikus megoldások megtekintése
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}