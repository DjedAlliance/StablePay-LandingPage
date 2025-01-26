import MenuIcon from '@/assets/icon-menu.svg'
import Button from '@/components/Button'
import Logo from "@/assets/logo.png"
import Image from 'next/image'

export const Header = () => {
  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div className="">
            <div className="border border-white/15 h-10 w-10 rounded-lg inline-flex justify-center items-center">
              <Image 
                src={Logo}
                alt='StablePay Logo'
                width={34}
                height={34}
              />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition">
                Features
              </a>
              <a href="#" className="text-white/70 hover:text-white transition">
                Developers Guide
              </a>
              <a href="#" className="text-white/70 hover:text-white transition">
                Integration Docs
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <Button>Try Now!</Button>
            <MenuIcon className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}
