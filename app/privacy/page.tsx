'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza a főoldalra
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-teal-700" />
            <h1 className="text-4xl font-bold text-gray-900">
              Adatvédelmi Tájékoztató
            </h1>
          </div>
          
          <p className="text-gray-600">
            Hatályos: 2025. január 1-től | Utolsó frissítés: 2025. január 22.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-8"
        >
          {/* Bevezető */}
          <section className="pb-4 border-b border-gray-200">
            <p className="text-gray-700">
              Görgei Márk Egon egyéni vállalkozó (a továbbiakban: <strong>"Adatkezelő"</strong>) 
              magára nézve kötelezőnek ismeri el jelen Adatvédelmi Tájékoztató tartalmát, és 
              kötelezettséget vállal arra, hogy a https://elira.hu weboldal működésével kapcsolatos 
              minden adatkezelés megfelel a jelen tájékoztatóban, valamint a hatályos jogszabályokban 
              meghatározott elvárásoknak.
            </p>
            <p className="mt-3 text-gray-700">
              Az Adatkezelő fenntartja magának a jogot jelen Adatvédelmi Tájékoztató egyoldalú 
              módosítására. A módosításokról a felhasználókat a weboldalon keresztül tájékoztatja.
            </p>
          </section>

          {/* 1. Adatkezelő adatai */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-teal-700" />
              1. Az Adatkezelő adatai
            </h2>
            <div className="space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg">
              <p><strong>Név:</strong> Görgei Márk Egon egyéni vállalkozó</p>
              <p><strong>Székhely:</strong> 3525 Miskolc, Vologda utca 6. em.: 1 ajtó: 2.</p>
              <p><strong>Adószám:</strong> 90426221-1-25</p>
              <p><strong>E-mail:</strong> info@elira.hu</p>
              <p><strong>Weboldal:</strong> https://elira.hu</p>
            </div>
          </section>

          {/* 2. Adatkezelés jogszabályi háttere */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Az adatkezelés jogszabályi háttere
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>Az adatkezelésre az alábbi jogszabályok vonatkoznak:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Az Európai Parlament és a Tanács (EU) 2016/679 Rendelete (2016. április 27.) 
                  a természetes személyeknek a személyes adatok kezelése tekintetében történő 
                  védelméről és az ilyen adatok szabad áramlásáról (Általános Adatvédelmi Rendelet, GDPR)
                </li>
                <li>
                  2011. évi CXII. törvény az információs önrendelkezési jogról és az 
                  információszabadságról (Infotv.)
                </li>
                <li>
                  2013. évi V. törvény a Polgári Törvénykönyvről (Ptk.)
                </li>
                <li>
                  2001. évi CVIII. törvény az elektronikus kereskedelmi szolgáltatások, valamint 
                  az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről (Eker. tv.)
                </li>
                <li>
                  2008. évi XLVIII. törvény a gazdasági reklámtevékenység alapvető feltételeiről 
                  és egyes korlátairól (Grt.)
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Kezelt személyes adatok köre */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. A kezelt személyes adatok köre
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.1. Ingyenes tartalmak letöltésekor megadott adatok:
                </h3>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  <li><strong>Vezetéknév és keresztnév</strong> (kötelező)</li>
                  <li><strong>E-mail cím</strong> (kötelező)</li>
                  <li><strong>Foglalkozás</strong> (opcionális)</li>
                  <li><strong>Végzettség</strong> (opcionális)</li>
                  <li><strong>Kiválasztott tartalmak listája</strong></li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.2. Automatikusan gyűjtött adatok:
                </h3>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  <li><strong>IP cím</strong></li>
                  <li><strong>Böngésző típusa és verziója</strong></li>
                  <li><strong>Operációs rendszer</strong></li>
                  <li><strong>Látogatás időpontja</strong></li>
                  <li><strong>Megtekintett oldalak</strong></li>
                  <li><strong>Hivatkozó oldal (referrer)</strong></li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  3.3. Sütik (Cookie-k):
                </h3>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  <li><strong>Munkamenet sütik</strong> - a weboldal működéséhez szükségesek</li>
                  <li><strong>Analitikai sütik</strong> - Google Tag Manager (GTM-5TP36DBJ)</li>
                  <li><strong>Marketing sütik</strong> - csak hozzájárulás esetén</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Adatkezelés célja és jogalapja */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Az adatkezelés célja és jogalapja
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Adatkezelés célja
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Jogalap
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Kezelt adatok
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Ingyenes tartalmak küldése
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Hozzájárulás (GDPR 6. cikk (1) a))
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Név, e-mail
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Hírlevél küldése
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Hozzájárulás (GDPR 6. cikk (1) a))
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Név, e-mail
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Statisztika készítése
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Jogos érdek (GDPR 6. cikk (1) f))
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      Anonimizált adatok
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Adattovábbítás */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Adattovábbítás, adatfeldolgozók
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Az Adatkezelő az alábbi adatfeldolgozókat veszi igénybe:
              </p>
              
              <div className="space-y-3">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-semibold text-gray-900">SendGrid (Twilio Inc.)</h3>
                  <p className="text-sm text-gray-600">
                    Székhely: 1801 California Street, Suite 500, Denver, CO 80202, USA<br />
                    Tevékenység: E-mail küldési szolgáltatás<br />
                    Adattovábbítás jogalapja: EU-USA Data Privacy Framework
                  </p>
                </div>
                
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Google Firebase (Google LLC)</h3>
                  <p className="text-sm text-gray-600">
                    Székhely: 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA<br />
                    Tevékenység: Adattárolás, hosting<br />
                    Adattovábbítás jogalapja: Standard Contractual Clauses (SCC)
                  </p>
                </div>
                
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Google Analytics (Google LLC)</h3>
                  <p className="text-sm text-gray-600">
                    Székhely: 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA<br />
                    Tevékenység: Webanalitika<br />
                    Adattovábbítás jogalapja: Standard Contractual Clauses (SCC)
                  </p>
                </div>
                
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Discord Inc.</h3>
                  <p className="text-sm text-gray-600">
                    Székhely: 444 De Haro Street, Suite 200, San Francisco, CA 94107, USA<br />
                    Tevékenység: Közösségi platform<br />
                    Megjegyzés: Önkéntes csatlakozás, külön adatkezelés
                  </p>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Harmadik országba történő adattovábbítás:</strong> Az adatfeldolgozók 
                  USA-ban találhatók. Az adattovábbítás az EU-USA Data Privacy Framework, illetve 
                  az Európai Bizottság által jóváhagyott Standard Contractual Clauses alapján történik, 
                  amely megfelelő garanciákat nyújt a GDPR szerinti védelem biztosítására.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Adatok tárolási ideje */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Az adatok tárolásának időtartama
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Hírlevél feliratkozás esetén:</strong> Az Adatkezelő a személyes adatokat 
                  a hozzájárulás visszavonásáig, illetve a felhasználó törlési kérelméig kezeli.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Ingyenes tartalmak letöltése:</strong> Az adatokat a szolgáltatás 
                  teljesítését követően is kezeljük marketing célból, amíg a felhasználó 
                  le nem iratkozik vagy törlést nem kér.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Statisztikai célú adatok:</strong> Anonimizált formában korlátlan ideig.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Számviteli bizonylatok:</strong> A számvitelről szóló 2000. évi C. 
                  törvény 169. § (2) bekezdése alapján 8 évig.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Érintetti jogok */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Az érintettek jogai
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                A GDPR alapján Önt az alábbi jogok illetik meg:
              </p>
              
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    7.1. Hozzáférési jog (GDPR 15. cikk)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Ön jogosult arra, hogy tájékoztatást kapjon arról, hogy személyes adatainak 
                    kezelése folyamatban van-e, és ha igen, jogosult arra, hogy a személyes 
                    adatokhoz és a kapcsolódó információkhoz hozzáférést kapjon.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    7.2. Helyesbítéshez való jog (GDPR 16. cikk)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Ön jogosult arra, hogy kérésére az Adatkezelő indokolatlan késedelem nélkül 
                    helyesbítse a pontatlan személyes adatokat.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    7.3. Törléshez való jog ("elfeledtetéshez való jog") (GDPR 17. cikk)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Ön jogosult arra, hogy kérésére az Adatkezelő indokolatlan késedelem nélkül 
                    törölje a személyes adatokat, ha az adatkezelés jogalapja megszűnt.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    7.4. Adatkezelés korlátozásához való jog (GDPR 18. cikk)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Ön jogosult arra, hogy kérésére az Adatkezelő korlátozza az adatkezelést 
                    bizonyos esetekben.
                  </p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    7.5. Adathordozhatósághoz való jog (GDPR 20. cikk)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Ön jogosult arra, hogy a személyes adatait tagolt, széles körben használt, 
                    géppel olvasható formátumban megkapja.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    7.6. Tiltakozáshoz való jog (GDPR 21. cikk)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Ön jogosult arra, hogy tiltakozzon személyes adatainak jogos érdeken 
                    alapuló kezelése ellen.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    7.7. Hozzájárulás visszavonásának joga
                  </h3>
                  <p className="text-sm text-gray-700">
                    Ön jogosult arra, hogy hozzájárulását bármikor visszavonja. A hozzájárulás 
                    visszavonása nem érinti a visszavonás előtti adatkezelés jogszerűségét.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Jogérvényesítési lehetőségek */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Jogérvényesítési lehetőségek
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Amennyiben úgy véli, hogy személyes adatainak kezelése sérti a GDPR rendelkezéseit, 
                az alábbi lehetőségei vannak:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    8.1. Kapcsolatfelvétel az Adatkezelővel:
                  </h3>
                  <p>E-mail: info@elira.hu</p>
                  <p>Postacím: 3525 Miskolc, Vologda utca 6. em.: 1 ajtó: 2.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    8.2. Panasz benyújtása a felügyeleti hatóságnál:
                  </h3>
                  <p className="font-semibold">Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</p>
                  <p>Székhely: 1055 Budapest, Falk Miksa utca 9-11.</p>
                  <p>Postacím: 1363 Budapest, Pf. 9.</p>
                  <p>Telefon: +36 (1) 391-1400</p>
                  <p>E-mail: ugyfelszolgalat@naih.hu</p>
                  <p>Honlap: www.naih.hu</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    8.3. Bírósági jogorvoslat:
                  </h3>
                  <p>
                    Az érintett a jogainak megsértése esetén az Adatkezelő ellen bírósághoz 
                    fordulhat. A per elbírálása a törvényszék hatáskörébe tartozik. A per az 
                    érintett választása szerint az érintett lakóhelye vagy tartózkodási helye 
                    szerinti törvényszék előtt is megindítható.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Adatbiztonság */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Adatbiztonság
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Az Adatkezelő megfelelő technikai és szervezési intézkedéseket alkalmaz annak 
                érdekében, hogy a személyes adatok biztonságát garantálja:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>SSL/TLS titkosítás az adatátvitel során</li>
                <li>Jelszóval védett hozzáférés az adatokhoz</li>
                <li>Rendszeres biztonsági mentések</li>
                <li>Tűzfal és vírusvédelem</li>
                <li>Hozzáférés-korlátozás (csak az arra jogosultak férhetnek hozzá)</li>
                <li>Adatfeldolgozókkal kötött megfelelő szerződések</li>
              </ul>
            </div>
          </section>

          {/* 10. Sütik */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Sütik (Cookie-k) kezelése
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                A weboldal sütik segítségével biztosítja a megfelelő működést és felhasználói élményt:
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Süti típusa
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Cél
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Időtartam
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        Munkamenet sütik
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        Weboldal működése
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        Böngésző bezárásáig
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        cookie-consent
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        Süti hozzájárulás tárolása
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        1 év
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        _ga, _gid (Google Analytics)
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        Statisztika készítése
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        2 év / 24 óra
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm text-gray-600">
                A sütik letiltása esetén a weboldal bizonyos funkciói nem működnek megfelelően. 
                A böngészőjében bármikor módosíthatja a sütik beállításait.
              </p>
            </div>
          </section>

          {/* 11. Gyermekek adatai */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Gyermekek adatainak védelme
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                A weboldal nem gyermekeknek szól. 16 év alatti személyek nem adhatnak meg 
                személyes adatokat a weboldalon. Amennyiben tudomásunkra jut, hogy 16 év 
                alatti gyermek személyes adatait kezeljük, azokat haladéktalanul töröljük.
              </p>
            </div>
          </section>

          {/* 12. Módosítások */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Az Adatvédelmi Tájékoztató módosítása
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Az Adatkezelő fenntartja a jogot, hogy jelen Adatvédelmi Tájékoztatót 
                egyoldalúan módosítsa. A módosításról a felhasználókat a weboldalon 
                keresztül tájékoztatja. A módosítás a közzétételtől számított 15. napon 
                lép hatályba.
              </p>
              <p>
                Kérjük, rendszeresen ellenőrizze az Adatvédelmi Tájékoztatót a változások 
                nyomon követése érdekében.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Jelen Adatvédelmi Tájékoztató 2025. január 1. napján lép hatályba.<br />
              Utolsó módosítás: 2025. január 22.<br />
              © 2025 Görgei Márk Egon EV. - Minden jog fenntartva.
            </p>
          </div>
        </motion.div>

        {/* Kapcsolódó dokumentumok */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Kapcsolódó dokumentumok
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/terms"
              className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium"
            >
              <FileText className="w-4 h-4 mr-2" />
              Általános Szerződési Feltételek
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Vissza a főoldalra
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}