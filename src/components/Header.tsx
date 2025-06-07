import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon, Moon, Sun } from 'lucide-react';
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div className="flex items-center" initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <a href="/" className="flex items-center space-x-2">
              <img
                src="intentai.jpg"
                alt="Intent‑AI logo"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Truth Lens
              </span>
            </a>
          </motion.div>
          <nav className="hidden md:flex space-x-8">
              <motion.a
                href="/about"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 font-medium transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About
              </motion.a>
              <motion.a
                href="/view-datasets"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 font-medium transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                View Datasets
              </motion.a>
              {/*<motion.a
                href="#docs"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 font-medium transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Docs
              </motion.a>
              <motion.a
                href="#blog"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 font-medium transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Blog
              </motion.a>*/}
            </nav>
          <div className="flex items-center space-x-4">
            {/*<motion.button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" whileTap={{
            scale: 0.95
          }} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.4
          }}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>*/}
            <motion.a href="/demo" className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.5
          }}>
              Try The Demo
            </motion.a>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && <motion.div className="md:hidden backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-700" initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} transition={{
      duration: 0.3
    }}>
          <div className="container mx-auto px-4 py-4 space-y-2">
            {['Features', 'Documentation', 'Blog'].map(item => <a key={item} href="#" className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                {item}
              </a>)}
            <div className="pt-2">
              <a href="/demo" className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-purple-700">
                Get Started
              </a>
            </div>
          </div>
        </motion.div>}
    </header>;
};
export default Header;