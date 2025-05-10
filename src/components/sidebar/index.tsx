import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Home, MenuIcon, User, ClipboardList, LogOut } from 'lucide-react';
import { SiInstagram, SiWhatsapp } from 'react-icons/si';
import { auth } from '../../../auth';
import logoutAction from '@/actions/signout';

export async function Sidebar() {

  const session = await auth();
  const isAdmin = session?.user?.role === 1;

  return (
    <div className="w-full bg-muted/40">
      {/* MOBILE: Sheet menu */}
      <div className="sm:hidden w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-end px-4 border-b bg-primary">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className='bg-dark-gray border-none'>
                <MenuIcon className="w-5 h-5 text-white" />
                <span className="sr-only">Abrir/Fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-primary border-0 text-black">
              <nav className="p-4 grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-4 px-2.5 text-black">
                  <Home className="h-5 w-5" />
                  Início
                </Link>
                {isAdmin &&
                  <Link href="/sales" className="flex items-center gap-4 px-2.5 text-black">
                    <ClipboardList className="h-5 w-5" />
                    Vendas
                  </Link>
                }
             
                {session ? (
                  <Button onClick={logoutAction} className='max-w-24 flex gap-4 text-black text-lg hover:bg-primary hover:text-black shadow-none'>
                    <LogOut className='h5 w-5' />
                    Sair
                  </Button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-4 px-2.5 hover:text-black transition"
                  >
                    <User className="h-5 w-5" />
                    Entrar
                  </Link>
                )}

                <Link
                  href="https://www.instagram.com/medfamelt3/"
                  target="_blank"
                  className="flex items-center gap-4 px-2.5 text-black"
                >
                  <SiInstagram className="h-5 w-5" />
                  Instagram
                </Link>
                <Link
                  href="https://wa.me/5561999525238?text=Ol%C3%A1%2C%20tudo%20bem%20%3F%0AGostaria%20de%20informa%C3%A7%C3%B5e%20sobre%20o%20Arraia%20da%20T3!%F0%9F%8C%BE%F0%9F%92%9B%F0%9F%96%A4"
                  target="_blank"
                  className="flex items-center gap-4 px-2.5 text-black"
                >
                  <SiWhatsapp className="h-5 w-5" />
                  Whatsapp
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>

      {/* DESKTOP: Navbar */}
      <nav className="hidden sm:flex items-center justify-between px-6 py-4 bg-primary text-black w-full h-15">
        {/* Esquerda: links principais */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="flex items-center gap-2 hover:text-black transition">
            <Home className="h-4 w-4" />
            Início
          </Link>
          {isAdmin &&
            <Link href="/sales" className="flex items-center gap-2 px-2.5 text-black">
              <ClipboardList className="h-5 w-5" />
              Vendas
            </Link>
          }
          <Link
            href="https://www.instagram.com/medfamelt3/"
            target="_blank"
            className="flex items-center gap-2 hover:text-black transition"
          >
            <SiInstagram className="h-4 w-4" />
            Instagram
          </Link>
          <Link
            href="https://wa.me/5561999525238?text=Ol%C3%A1%2C%20tudo%20bem%20%3F%0AGostaria%20de%20informa%C3%A7%C3%B5e%20sobre%20o%20Arraia%20da%20T3!%F0%9F%8C%BE%F0%9F%92%9B%F0%9F%96%A4"
            target="_blank"
            className="flex items-center gap-2 hover:text-black transition"
          >
            <SiWhatsapp className="h-4 w-4" />
            Whatsapp
          </Link>
        </div>

        <div className='flex gap-6'>
          {session ? (
            <Button onClick={logoutAction} className='flex items-center gap-2 text-sm font-medium transition hover:bg-primary hover:text-black shadow-none'>
              <LogOut className='h4 w-4' />
              Sair
            </Button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium hover:text-black transition"
            >
              <User className="h-4 w-4" />
              Entrar
            </Link>
          )}
      
        </div>
      </nav>
    </div>
  );
}
