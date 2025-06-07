import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { LineChart, BrainCircuit, Timer, BarChart3Icon, Fingerprint, ShieldCheck } from 'lucide-react';
const features = [
  {
    icon: <Timer size={24} />,
    title: 'Instant Local Scan',
    description:
      'Local AI model flags simple manipulative, polarizing, or emotional content in just milliseconds.'
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'GPT‑4o Deep Context',
    description:
      'API layers xeeper explanations so you understand the intent behind the words.'
  },
  {
    icon: <BarChart3Icon size={24} />,
    title: 'Clear Visuals',
    description:
      'Radar and bar charts translate basic scores into intuitive visuals you can act on.'
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Privacy by Design',
    description:
      'Text is processed as needed to make no content ever stored on our servers.'
  }
];
const Features = () => {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  return <section className="py-16">
      <div className="text-center mb-12">
        <motion.h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }}>
          Why Intent AI
        </motion.h2>
        <motion.p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }}>
          A Hybrid AI tool working together to surface hidden information.
        </motion.p>
      </div>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
      once: true,
      amount: 0.1
    }}>
        {features.map((feature, index) => <motion.div key={index} variants={itemVariants} className="backdrop-blur-lg bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 rounded-3xl p-6 hover:shadow-xl transition-all duration-300" whileHover={{
        y: -5,
        scale: 1.02
      }}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
              <div className="text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {feature.description}
            </p>
          </motion.div>)}
      </motion.div>
    </section>;
};
export default Features;