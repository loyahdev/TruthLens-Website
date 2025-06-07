import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Cpu, BrainCog, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Header />
      {/* zero‑width joiner to discourage Safari Reader mode */}
      <span className="hidden" aria-hidden="true">&#8203;</span>
      
      {/* --- ANIMATED BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 opacity-20 blur-3xl animate-pulse"
          style={{ animationDuration: '6s' }}
        />
        <div
          className="absolute bottom-[-15%] right-1/3 w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 opacity-20 blur-3xl animate-ping"
          style={{ animationDuration: '6s' }}
        />
        <div
          className="absolute top-[30%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-tl from-emerald-400 to-teal-500 opacity-20 blur-3xl animate-pulse"
          style={{ animationDuration: '6s' }}
        />
      </div>
      {/* --- HERO / PROFILE --- */}
      <main className="container mx-auto px-4 py-16">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Profile image */}
          <img
            src="/jaxonpic.png"
            alt="Jaxon Hensch"
            className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-xl"
          />

          {/* About‑me card */}
          <div className="max-w-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
              👋 Yo I’m Jaxon! 
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Learning AI and full-stack developer, DJ, and grade‑9 TKS 2025 innovator in Calgary.
              I thrive on challenging builds, whether that’s problem solving bugs&nbsp;
              ,making websites, training AI models, or mixing
              house tracks.
            </p>
          </div>
        </motion.div>

        {/* --- FANCY DIVIDER --- */}
        <div className="my-16 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

        {/* --- PROJECT OVERVIEW SECTIONS --- */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Card 1 */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg border border-black border-t-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-2">📰 What is Intent AI?</h3>
            <p className="leading-relaxed">
              A hybrid AI tool that understands hidden manipulation, polarization, and
              emotional framing in any text. Local model for speed, GPT‑4o for
              extra visualization in radar and bar charts so anyone can{" "}
              <strong>read critically in seconds</strong>. Both models combined reach over 90% accurate
              results on almost 3000 tests and numerous real-world articles.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-black border-t-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Why I built it
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              In today&rsquo;s media landscape, most content you find is usually not fully truthful and can contain bias in its opinions.
              Sometimes this can be exteremely harmful, especially when it comes to news articles and other media.
              To combat this people use tools like ChatGPT to understand what these articles mean. With its online trained data most of the 
              time you wont be getting anything other than public opinions.
              <br /><br />
              Thats why I decided to build Intent AI, a tool that solves these problems and is trained on data that matters - not opinions
              from random polititions on the internet.
            </p>
          </motion.div>
        </section>

        {/* --- FANCY DIVIDER --- */}
        <div className="my-10 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

        {/* --- TECH SPECS SECTION --- */}
        <motion.section
          className="mt-15 bg-slate-900/90 text-slate-100 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg border border-slate-700"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="px-8 py-10 md:px-16">
            <h3 className="text-3xl font-bold mb-6">Under the Hood Technicals</h3>
            <div className="grid gap-10 md:grid-cols-3">
              {/* Local model */}
              <div className="flex flex-col items-start">
                <Cpu size={32} className="text-emerald-400 mb-3" />
                <h4 className="text-xl font-semibold mb-2">
                  Lightning‑fast local scanning
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  A TF‑IDF + logistic regression model (~50&nbsp;KB) flags
                  different cues in&nbsp;&lt; 5 seconds.
                </p>
              </div>

              {/* GPT layer */}
              <div className="flex flex-col items-start">
                <BrainCog size={32} className="text-indigo-400 mb-3" />
                <h4 className="text-xl font-semibold mb-2">GPT‑4o reasoning</h4>
                <p className="text-slate-300 leading-relaxed">
                  Local flags feed into the GPT‑4o API for nuanced context, reducing
                  cost usage by&nbsp;35 % while boosting explanation quality from the local model.
                </p>
              </div>

              {/* Visualization */}
              <div className="flex flex-col items-start">
                <BarChart2 size={32} className="text-pink-400 mb-3" />
                <h4 className="text-xl font-semibold mb-2">Visual insight</h4>
                <p className="text-slate-300 leading-relaxed">
                  Recharts renders radar + bar graphs in&nbsp;real&nbsp;time, so
                  users grasp risk at a glance and find the next steps.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        <br />
        <h3 className="text-slate-600 dark:text-slate-300 leading-relaxed">
              In total Intent AI took about 2 months to build, and I am very proud of getting to a demo to show at TKS.
              I plan on expanding it in the future to include more features and make the model more accurate in
              extremely difficult situations. Lots of work went in, from training my model based on differeent case studies about datasets,
              to even testing my knowledge in coding with AI. It now gets mostly accurate outputs to more than 90% of tests I tried. Making this
              an extremely powerful and useful tool for people to use. Heres an example below:
            </h3>

            <img
            src="/modeltest.png"
            alt="Intent AI example output"
            className="w-full max-w-2xl mx-auto mt-6 rounded-lg shadow-lg"
            />
      </main>
      <Footer />
    </>
  );
}
