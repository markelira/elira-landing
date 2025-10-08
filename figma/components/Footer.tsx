export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-2xl">Elira</div>
            <p className="text-gray-400">
              Az egyetlen üzleti képzési platform Magyarországon, ahol bizonyított eredményekkel 
              rendelkező szakértők osztják meg gyakorlati stratégiáikat.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Szakértők</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Modulok</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eredmények</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Árazás</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg">Vállalat</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Rólunk</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karrierlehetőségek</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sajtó</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg">Támogatás</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Segítség</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kapcsolat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Közösség</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GYIK</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400">
              © 2024 Elira. Minden jog fenntartva.
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Adatvédelmi szabályzat</a>
              <a href="#" className="hover:text-white transition-colors">Felhasználási feltételek</a>
              <a href="#" className="hover:text-white transition-colors">Sütik</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}