import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TextAnalyzer from './components/TextAnalyzer';
import Features from './components/Features';
import Footer from './components/Footer';
import About from './pages/about';
import Demo from './pages/demo';

function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-purple-300/20 dark:bg-purple-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: '6s' }}
        ></div>
        <div
          className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-300/20 dark:bg-blue-500/10 blur-3xl animate-ping"
          style={{ animationDuration: '6s' }}
        ></div>
        <div
          className="absolute bottom-[-15%] right-[20%] w-[45vw] h-[45vw] rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: '6s' }}
        ></div>
      </div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <TextAnalyzer />
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
  );
}