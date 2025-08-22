'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
            <FileText className="w-8 h-8 text-teal-700" />
            <h1 className="text-4xl font-bold text-gray-900">
              Általános Szerződési Feltételek
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
          {/* 1. Szolgáltató adatai */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Szolgáltató adatai
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Név:</strong> Görgei Márk Egon egyéni vállalkozó</p>
              <p><strong>Székhely:</strong> 3525 Miskolc, Vologda utca 6. em.: 1 ajtó: 2.</p>
              <p><strong>Adószám:</strong> 90426221-1-25</p>
              <p><strong>E-mail:</strong> info@elira.hu</p>
              <p><strong>Weboldal:</strong> https://elira.hu</p>
              <p className="mt-4 italic">
                (a továbbiakban: <strong>"Szolgáltató"</strong>)
              </p>
            </div>
          </section>

          {/* 2. Általános rendelkezések */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Általános rendelkezések
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                2.1. Jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) tartalmazzák a 
                https://elira.hu weboldalon (továbbiakban: Weboldal) elérhető szolgáltatások 
                igénybevételének feltételeit.
              </p>
              <p>
                2.2. A Weboldal használatával, valamint az ingyenes tartalmak letöltésével a 
                Felhasználó elfogadja a jelen ÁSZF-ben foglaltakat.
              </p>
              <p>
                2.3. A Szolgáltató fenntartja a jogot, hogy a jelen ÁSZF-et egyoldalúan módosítsa. 
                A módosítások a Weboldalon történő közzététellel lépnek hatályba.
              </p>
              <p>
                2.4. A Weboldal használatához nem szükséges regisztráció, azonban egyes szolgáltatások 
                (például ingyenes tartalmak letöltése) igénybevételéhez személyes adatok megadása szükséges.
              </p>
            </div>
          </section>

          {/* 3. A szolgáltatás tartalma */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. A szolgáltatás tartalma
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                3.1. A Szolgáltató a Weboldalon keresztül jelenleg ingyenes digitális tartalmakat 
                (PDF dokumentumok) biztosít karrierfejlesztési és marketing témákban.
              </p>
              <p>
                3.2. A tartalmak letöltéséhez szükséges a Felhasználó neve és e-mail címe, 
                valamint opcionálisan foglalkozása és végzettsége megadása.
              </p>
              <p>
                3.3. A Szolgáltató a jövőben fizetős online kurzusokat is elérhetővé tehet, 
                amelyekre külön szerződési feltételek vonatkoznak majd.
              </p>
              <p>
                3.4. A Szolgáltató Discord közösségi szervert működtet, amelyhez való csatlakozás 
                önkéntes és ingyenes. A Discord használatára a Discord saját felhasználási feltételei vonatkoznak.
              </p>
            </div>
          </section>

          {/* 4. Regisztráció és letöltés */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Regisztráció és letöltés folyamata
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                4.1. A digitális tartalmak letöltéséhez a Felhasználónak meg kell adnia:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Vezetéknevét és keresztnevét</li>
                <li>E-mail címét</li>
                <li>Opcionálisan: foglalkozását és végzettségét</li>
              </ul>
              <p>
                4.2. A Felhasználó az adatok megadásával hozzájárul ahhoz, hogy a Szolgáltató 
                a megadott e-mail címre elküldje a kiválasztott tartalmakat, valamint a SendGrid 
                szolgáltatáson keresztül marketing célú megkereséseket küldjön.
              </p>
              <p>
                4.3. A Felhasználó az adatok megadásával feliratkozik a Szolgáltató hírlevelére, 
                amelyről bármikor leiratkozhat az e-mailben található leiratkozási link segítségével, 
                vagy az info@elira.hu címre küldött kéréssel.
              </p>
            </div>
          </section>

          {/* 5. Szellemi tulajdon */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Szellemi tulajdon
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                5.1. A Weboldalon elérhető valamennyi tartalom (szöveg, kép, grafika, PDF dokumentumok, 
                logó, védjegy) Görgei Márk Egon EV. kizárólagos szellemi tulajdonát képezi.
              </p>
              <p>
                5.2. A tartalmak kizárólag személyes, nem kereskedelmi célú felhasználásra tölthetők le. 
                Tilos azok kereskedelmi célú felhasználása, továbbértékesítése, módosítása, másolása 
                vagy terjesztése a Szolgáltató előzetes írásbeli engedélye nélkül.
              </p>
              <p>
                5.3. A jogosulatlan felhasználás szerzői jogi és polgári jogi következményeket von maga után.
              </p>
              <p>
                5.4. A Felhasználó a tartalmakat saját felelősségére használja fel. A tartalmak oktatási 
                és tájékoztató jellegűek, nem helyettesítik a szakmai tanácsadást.
              </p>
            </div>
          </section>

          {/* 6. Felelősségkorlátozás */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Felelősségkorlátozás
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                6.1. A Szolgáltató az ingyenes tartalmakat "ahogy van" alapon biztosítja. 
                A Szolgáltató nem garantálja, hogy a tartalmak megfelelnek a Felhasználó 
                elvárásainak vagy céljainak.
              </p>
              <p>
                6.2. A Szolgáltató nem felel a Weboldal használatából, a tartalmak letöltéséből 
                vagy alkalmazásából eredő közvetlen vagy közvetett károkért, beleértve, de nem 
                kizárólagosan az elmaradt hasznot, adatvesztést vagy üzleti tevékenység megszakadását.
              </p>
              <p>
                6.3. A Szolgáltató nem garantálja, hogy a Weboldal folyamatosan, hibamentesen 
                és megszakítás nélkül működik. A Szolgáltató jogosult a Weboldal működését 
                előzetes értesítés nélkül megszakítani karbantartás vagy fejlesztés céljából.
              </p>
              <p>
                6.4. A Szolgáltató nem felel a harmadik felek által üzemeltetett szolgáltatások 
                (Discord, SendGrid, Firebase) működéséért vagy biztonságáért.
              </p>
            </div>
          </section>

          {/* 7. Adatkezelés */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Adatkezelés
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                7.1. A Szolgáltató a személyes adatokat az Európai Parlament és a Tanács 
                (EU) 2016/679 Rendelete (GDPR) és az információs önrendelkezési jogról és 
                az információszabadságról szóló 2011. évi CXII. törvény szerint kezeli.
              </p>
              <p>
                7.2. Az adatkezelés részletes szabályait az Adatvédelmi Tájékoztató tartalmazza, 
                amely elérhető a{' '}
                <Link href="/privacy" className="text-teal-700 hover:underline">
                  https://elira.hu/privacy
                </Link>{' '}
                címen.
              </p>
              <p>
                7.3. A Felhasználó a személyes adatai kezeléséhez való hozzájárulását bármikor 
                visszavonhatja az info@elira.hu e-mail címre küldött kéréssel.
              </p>
            </div>
          </section>

          {/* 8. Panaszkezelés */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Panaszkezelés
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                8.1. A Felhasználó a szolgáltatással kapcsolatos panaszát az alábbi elérhetőségeken 
                teheti meg:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>E-mail: info@elira.hu</li>
                <li>Postacím: 3525 Miskolc, Vologda utca 6. em.: 1 ajtó: 2.</li>
              </ul>
              <p>
                8.2. A Szolgáltató a panaszt annak beérkezésétől számított 30 napon belül 
                kivizsgálja és érdemben, írásban megválaszolja.
              </p>
              <p>
                8.3. A panasz elutasítása esetén a Szolgáltató köteles írásban megindokolni döntését.
              </p>
              <p>
                8.4. Amennyiben a Felhasználó a panasz kezelésével nem elégedett, az alábbi 
                szervezetekhez fordulhat:
              </p>
              <div className="ml-6 space-y-3">
                <div>
                  <p className="font-semibold">Borsod-Abaúj-Zemplén Vármegyei Békéltető Testület</p>
                  <p>Cím: 3525 Miskolc, Szentpáli u. 1.</p>
                  <p>Telefon: (46) 501-091</p>
                  <p>E-mail: bekeltetes@bokik.hu</p>
                </div>
                <div>
                  <p className="font-semibold">Borsod-Abaúj-Zemplén Vármegyei Kormányhivatal</p>
                  <p>Fogyasztóvédelmi Főosztály</p>
                  <p>Cím: 3530 Miskolc, Meggyesalja u. 12.</p>
                  <p>Telefon: (46) 506-071</p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Vis maior */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Vis maior
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                9.1. Nem minősül szerződésszegésnek, ha a Szolgáltató kötelezettségeinek 
                teljesítését vis maior esemény akadályozza meg, amely a jelen ÁSZF 
                aláírásának időpontja után következett be.
              </p>
              <p>
                9.2. Vis maior eseménynek minősül különösen: természeti katasztrófa, tűz, 
                árvíz, hatóság rendelkezése, sztrájk, háború, terrorcselekmény, internetszolgáltatás 
                kimaradása, áramszünet.
              </p>
            </div>
          </section>

          {/* 10. Egyéb rendelkezések */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Egyéb rendelkezések
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                10.1. A jelen ÁSZF-re a magyar jog az irányadó, különös tekintettel a Polgári 
                Törvénykönyvről szóló 2013. évi V. törvény és az elektronikus kereskedelmi 
                szolgáltatások szabályairól szóló 2001. évi CVIII. törvény rendelkezéseire.
              </p>
              <p>
                10.2. A felek a jelen ÁSZF-ből eredő jogvitáikat elsősorban békés úton, 
                tárgyalások útján rendezik. Ennek sikertelensége esetén a jogvita elbírálására 
                a hatáskörrel és illetékességgel rendelkező magyar bíróság jogosult.
              </p>
              <p>
                10.3. Ha a jelen ÁSZF bármely rendelkezése érvénytelennek, jogszerűtlennek 
                vagy érvényesíthetetlennek bizonyul, az a többi rendelkezés érvényességét, 
                jogszerűségét és érvényesíthetőségét nem érinti.
              </p>
              <p>
                10.4. A Szolgáltató jogosult a jelen ÁSZF egyoldalú módosítására. A módosításról 
                a Felhasználókat a Weboldalon keresztül tájékoztatja. A módosítás a közzétételtől 
                számított 15. napon lép hatályba.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Jelen ÁSZF 2025. január 1. napján lép hatályba.<br />
              Utolsó módosítás: 2025. január 22.<br />
              © 2025 Görgei Márk Egon EV. - Minden jog fenntartva.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}