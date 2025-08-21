import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adatvédelmi Tájékoztató | Elira',
  description: 'Az Elira adatvédelmi szabályzata és adatkezelési tájékoztatója.',
  robots: 'noindex, nofollow'
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Adatvédelmi Tájékoztató</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Hatályos: 2025. január 1-től
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Adatkezelő</h2>
              <p className="mb-4">
                <strong>Név:</strong> Elira Kft.<br />
                <strong>Email:</strong> info@elira.hu<br />
                <strong>Weboldal:</strong> https://elira.hu
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Gyűjtött Adatok</h2>
              <p className="mb-4">A szolgáltatásunk használata során az alábbi adatokat gyűjtjük:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Email cím (kötelező)</li>
                <li>Teljes név (kötelező)</li>
                <li>Munkakör (opcionális)</li>
                <li>Végzettség (opcionális)</li>
                <li>Kiválasztott ingyenes anyagok</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Adatkezelés Célja</h2>
              <p className="mb-4">Az adatokat az alábbi célokból kezeljük:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Ingyenes anyagok küldése email-ben</li>
                <li>Közösségi értesítések küldése</li>
                <li>Szolgáltatásaink javítása</li>
                <li>Statisztikák készítése (névtelenített formában)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Adatkezelés Jogalapja</h2>
              <p className="mb-4">
                Az adatkezelés jogalapja a GDPR 6. cikk (1) bekezdés a) pontja szerinti hozzájárulás.
                A regisztráció során önkéntesen adja meg adatait a kért szolgáltatások igénybevételéhez.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Adattovábbítás</h2>
              <p className="mb-4">Adatait az alábbi szolgáltatóknak továbbítjuk:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>SendGrid:</strong> Email küldéshez</li>
                <li><strong>Firebase:</strong> Adattároláshoz</li>
                <li><strong>Google Analytics:</strong> Névtelen statisztikákhoz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Adatmegőrzés</h2>
              <p className="mb-4">
                Adatait a hozzájárulás visszavonásáig vagy törlés kérésig őrizzük meg.
                Statisztikai célokra névtelenített formában hosszabb ideig tárolhatjuk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Jogai</h2>
              <p className="mb-4">Önnek joga van:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Hozzáférést kérni adataihoz</li>
                <li>Kijavítást kérni</li>
                <li>Törlést kérni</li>
                <li>Hordozhatóságot kérni</li>
                <li>Korlátozást kérni</li>
                <li>Tiltakozni az adatkezelés ellen</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Kapcsolat</h2>
              <p className="mb-4">
                Adatvédelemmel kapcsolatos kérdésekkel forduljon hozzánk az 
                <strong> info@elira.hu</strong> email címen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Módosítások</h2>
              <p className="mb-4">
                Ez az adatvédelmi tájékoztató bármikor módosulhat. A módosításokról 
                weboldalunkon tájékoztatjuk.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a 
              href="/" 
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Vissza a főoldalra
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}