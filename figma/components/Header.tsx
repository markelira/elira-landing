import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Elira</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#platform" className="hover:text-primary transition-colors">Platform</a>
          <a href="#experts" className="hover:text-primary transition-colors">Szakértők</a>
          <a href="#modules" className="hover:text-primary transition-colors">Modulok</a>
          <a href="#about" className="hover:text-primary transition-colors">Rólunk</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">Bejelentkezés</Button>
          <Button size="sm">Kezdés</Button>
        </div>
      </div>
    </header>
  );
}