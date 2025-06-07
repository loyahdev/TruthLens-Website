import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
const Hero = () => {
  return <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="space-y-8">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 backdrop-blur-md bg-white/30 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400">
              <Sparkles size={14} className="mr-1.5" />
              Introducing Intent AI
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="block text-slate-900 dark:text-white">
              Unlock the power of
            </span>
            <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              solving misinformation
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
            Paste any article, tweet, or press release and let&nbsp;
            <span className="font-semibold">Intent AI</span> shadow hidden
            manipulation, polarization, emotional framing, or harmful
            information. Get instant outputs and bar‑chart scores plus a concise
            explanation so you can read critically and make the correct decisions
            in seconds.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.a href="#analyzer" className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-medium text-white shadow-md hover:shadow-lg transition-all duration-200" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              Try the demo now
              <ArrowRight size={18} className="ml-2" />
            </motion.a>
            {/*<motion.a href="#" className="flex items-center justify-center rounded-full backdrop-blur-md bg-white/30 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 px-6 py-3 text-base font-medium text-slate-900 dark:text-white shadow-sm hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              Watch demo
            </motion.a>*/}
          </div>
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="relative">
          <div className="relative mx-auto max-w-[500px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl"></div>
            <div className="relative backdrop-blur-lg bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/20 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Intent Analysis
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-24 rounded-xl bg-white/40 dark:bg-slate-700/40 backdrop-blur-md border border-white/20 dark:border-slate-600/20 p-3 animate-pulse">
                  <div className="w-3/4 h-3 bg-slate-200 dark:bg-slate-600 rounded-full mb-2"></div>
                  <div className="w-1/2 h-3 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-xl bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/20 dark:border-slate-600/20 p-3 animate-pulse">
                    <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg"></div>
                  </div>
                  <div className="h-32 rounded-xl bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/20 dark:border-slate-600/20 p-3 animate-pulse">
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-800/30 dark:to-blue-800/30 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Hero;