import React from 'react';
import { motion } from 'framer-motion';
const Footer = () => {
  return <footer className="mt-16 backdrop-blur-xl bg-white/30 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
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
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4 max-w-md">
              Truth Lens provides powerful text analysis tools to help you
              understand user intent and make valuable data-driven decisions.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:jaxonhensch@gmail.com"
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/jaxon-hensch-9287952a9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/loyahdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            {/*<h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'API', 'Integrations', 'Documentation'].map(item => <li key={item}>
                  <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>)}
            </ul>*/}
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            {/*<h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Blog', 'Careers', 'Contact', 'Privacy Policy'].map(item => <li key={item}>
                    <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>)}
            </ul>*/}
          </motion.div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Jaxon Hensch. All rights reserved.
          </p>
          {/*<div className="mt-4 md:mt-0 flex space-x-6">
            {['Terms', 'Privacy', 'Cookies', 'FAQ'].map(item => <a key={item} href="#" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                {item}
              </a>)}
          </div>*/}
        </div>
      </div>
    </footer>;
};
export default Footer;