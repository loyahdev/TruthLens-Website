import React, { useEffect, useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, BarChart3Icon, PieChartIcon, RefreshCw } from 'lucide-react';
import RadarChartComponent from './RadarChart';
import BarChartComponent from './BarChart';
const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('radar');
  const [animateCharts, setAnimateCharts] = useState(false);
  const handleAnalyze = () => {
    if (text.trim() === '') return;
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      setAnimateCharts(true);
    }, 1500);
  };
  const handleReset = () => {
    setText('');
    setShowResults(false);
    setAnimateCharts(false);
  };
  // Generate random data for the charts
  const generateRandomData = () => {
    const categories = ['Purchase Intent', 'Information Seeking', 'Problem Solving', 'Comparison', 'Feature Request', 'Sentiment'];
    return categories.map(category => ({
      category,
      value: Math.floor(Math.random() * 100),
      fullMark: 100
    }));
  };
  const [data, setData] = useState(generateRandomData());
  useEffect(() => {
    if (animateCharts) {
      const interval = setInterval(() => {
        setData(generateRandomData());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [animateCharts]);
  return (
    <section id="analyzer" className="py-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
        {/* left: profile image */}
        <img
          src="/jaxonpic.png"
          alt="Jaxon Hensch"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl flex-shrink-0"
        />

        {/* right: intro and details */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
            👋 Sup, I&rsquo;m Jaxon
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I’m a full‑stack developer learning AI, aswell as a tech‑house DJ based in Calgary.
            I built &nbsp;
            <span className="font-semibold">Intent‑AI</span>. Read more about me and the project below.
          </p>

          {/* quick facts */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-base">
            <li className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>24-25 Innovator @ TKS</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />
              <span>DJ alias: Velwood</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-pink-500" />
              <span>Swift • Node • Web • AI</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
              <span>Building the Future</span>
            </li>
          </ul>

          {/* CTA */}
          <a
            href="/about"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Learn more about me &amp; Intent‑AI
          </a>
        </div>
      </div>
    </section>
  );
};
export default TextAnalyzer;