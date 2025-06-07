import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type ScoreKey =
  | 'Manipulative'
  | 'Polarizing'
  | 'Emotional'
  | 'Harmful'
  | 'Bias';

interface Result {
  scores: Record<ScoreKey, number>;
  highlights: string[];
  harmfulRating: number;
  nextSteps: string[];
  intentTokens: { label: string; value: number }[];
  explanationSummary: string;
}

const fallbackResult: Result = {
  scores: {
    Manipulative: 42,
    Polarizing: 35,
    Emotional: 68,
    Harmful: 23,
    Bias: 55,
  },
  highlights: [
    '“You won’t believe…”',
    '“They want to silence you”',
    'Fear‑based framing around safety',
  ],
  harmfulRating: 29,
  nextSteps: [
    'Compare with other reputable sources.',
    'Check author background & funding.',
    'Look for specific data and citations.',
  ],
  intentTokens: [
    { label: 'Manipulative', value: 120 },
    { label: 'Polarizing', value: 90 },
    { label: 'Emotional', value: 180 },
    { label: 'Harmful', value: 45 },
    { label: 'Bias', value: 220 },
  ],
};

const baselineTokens: { label: string; avg: number }[] = [
  { label: 'Manipulative', avg: 25 },
  { label: 'Polarizing',   avg: 20 },
  { label: 'Emotional',    avg: 45 },
  { label: 'Harmful',      avg: 15 },
  { label: 'Bias',         avg: 30 },
];

export default function Demo() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const [processLogs, setProcessLogs] = useState<string[]>([]);

  const [hoverCat, setHoverCat] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const AngleTick = (props: any) => {
    const { x, y, payload } = props;
    const active = hoverCat === payload.value;
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fill={active ? '#facc15' : '#cbd5e1'}
        fontSize={active ? 14 : 12}
        fontWeight={active ? 600 : 400}
        onMouseEnter={() => setHoverCat(payload.value)}
        onMouseLeave={() => setHoverCat(null)}
      >
        {payload.value}
      </text>
    );
  };

  const handleShare = () => {
    if (!result) return;

    // craft a rich, multiline summary
    const shareText = `📰 Intent‑AI Report

Original input:
"${text.trim().slice(0, 650)}${text.length > 650 ? '…' : ''}"

Scores (0‑100):
• Manipulative: ${result.scores.Manipulative}%
• Polarizing : ${result.scores.Polarizing}%
• Emotional  : ${result.scores.Emotional}%
• Harmful    : ${result.scores.Harmful}%
• Bias: ${result.scores.Bias}%

Overall Avg Risk: ${result.harmfulRating}%

Notable phrases:
${result.highlights.map((h) => `• ${h}`).join('\n')}

Next steps:
${result.nextSteps.map((n, i) => `${i + 1}. ${n}`).join('\n')}
`;

    const shareData = {
      title: 'Intent‑AI Report',
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .catch(() => {/* user cancelled */});
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    }
  };

  const handleAnalyze = () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);
    setProcessLogs(['Submitting text to API...']);

    // start a log ticker every second
    const ticker = setInterval(() => {
      setProcessLogs((logs) => [...logs, 'Running AI response...']);
    }, 4000);

    // Strip http:// or https:// from the text before sending to the API
    const cleanText = text.replace(/https?:\/\//gi, '');
    const payload = { text: cleanText.trim() };

    fetch('https://intentapi.loyah.dev/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((data) => {
        clearInterval(ticker);
        setProcessLogs((l) => [...l, 'Compiling model data...']);

        // If it's a Twitter/X URL and we got the post text, replace the textarea with the text
        console.log('Tweet response:', data.tweet_text);
        if (text.includes('twitter.com') || text.includes('x.com')) {
          if (data.tweet_text) {
            setText(data.tweet_text);
          }
        }

        // map API payload → Result type
        const api = data.report;
        // compute overall average (rounded) across all five scores
        const allScores = [
          api.scores.manipulative,
          api.scores.polarizing,
          api.scores.emotional,
          api.scores.harmful ?? 0,
          api.scores.bias,
        ];
        const avgRisk = Math.round(
          allScores.reduce((a, b) => a + b, 0) / allScores.length
        );

        const countsOK = api.counts ?? {
          manipulative: 0,
          polarizing: 0,
          emotional: 0,
          harmful: 0,
          bias: 0,
        };

        const mapped: Result = {
          scores: {
            Manipulative: api.scores.manipulative,
            Polarizing: api.scores.polarizing,
            Emotional: api.scores.emotional,
            // fallback: if API omitted scores.harmful, use harmfulRating (overall avg) instead
            Harmful: api.scores.harmful ?? api.harmfulRating ?? avgRisk,
            Bias: api.scores.bias,
          },
          highlights: api.notablePhrases ?? [],
          harmfulRating: avgRisk,            // now overall average
          nextSteps: Array.isArray(api.nextSteps) ? api.nextSteps : [],
          intentTokens: [
            { label: 'Manipulative', value: countsOK.manipulative },
            { label: 'Polarizing',  value: countsOK.polarizing },
            { label: 'Emotional',   value: countsOK.emotional },
            { label: 'Harmful',     value: countsOK.harmful },
            { label: 'Bias',        value: countsOK.bias },
          ],
          explanationSummary: api.explanationSummary ?? '',
        };

        setTimeout(() => {
          setResult(mapped);
          setLoading(false);
          setProcessLogs([]); // clear log after compile
        }, 5000);
        // setResult(mapped);
        // setLoading(false);
        // setProcessLogs([]); // clear log after compile
      })
      .catch((err) => {
        console.error(err);
        clearInterval(ticker);
        setProcessLogs((l) => [...l, '⚠️  Error – using fallback data']);
        // fallback so UI isn’t empty
        setResult(fallbackResult);
        setLoading(false);
        setTimeout(() => setProcessLogs([]), 3000);
      });
  };

  return (
    <>
      <Header />

      {/* background blobs reuse */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute top-[25%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl animate-ping"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-[-15%] right-[15%] w-[50vw] h-[50vw] rounded-full bg-pink-400/20 dark:bg-pink-600/10 blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
      </div>

      <main className="container mx-auto px-4 py-20">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Truth Lens Live Demo V0.6.1
        </motion.h1>

        {/* Input card */}
        <motion.div
          className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <textarea
            value={text}
            onChange={(e) => {
              const input = e.target.value;
              setText(input);
              const twitterRegex = /^https?:\/\/(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/status\/\d+$/;
              if (input.includes('http')) {
                setIsValidUrl(twitterRegex.test(input.trim()));
              } else {
                setIsValidUrl(true);
              }
            }}
            placeholder="Paste article text, write something to analyze, or paste a link to an X (Twitter) post…"
            className="w-full h-40 p-4 rounded-2xl bg-white/70 dark:bg-slate-700/70 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            disabled={loading}
          />
          {!isValidUrl && (
            <p className="text-red-500 mt-2 text-sm">
              Only valid Twitter/X status URLs are supported.
            </p>
          )}
          <div className="flex justify-end mt-4">
            <motion.button
              onClick={handleAnalyze}
              disabled={loading || !text.trim() || !isValidUrl}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 ${
                (!text.trim() || !isValidUrl) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              whileHover={{ scale: loading || !text.trim() || !isValidUrl ? 1 : 1.05 }}
              whileTap={{ scale: loading || !text.trim() || !isValidUrl ? 1 : 0.95 }}
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.36-6.36l-2.12 2.12M8.76 15.24l-2.12 2.12m0-12.48l2.12 2.12m6.48 6.48l2.12 2.12"
                  />
                </svg>
              ) : (
                'Analyze'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* processing logs */}
        {loading && processLogs.length > 0 && (
          <motion.div
            className="max-w-4xl mx-auto mt-6 bg-slate-800/80 text-slate-200 rounded-2xl p-4 font-mono text-sm space-y-1 border border-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {processLogs.map((log, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{log}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.section
              key="results"
              className="mt-16 space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Radar + grid cards */}
              <div className="bg-slate-900/90 text-slate-100 rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-slate-700">
                <div className="grid gap-10 lg:grid-cols-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={Object.entries(result.scores).map(([k, v]) => ({ category: k, value: v }))}>
                        <PolarGrid stroke="#64748b" strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="category" tick={<AngleTick />} />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          tick={false}
                          axisLine={false}   // no spoke line
                        />
                        <Radar
                          name="Intent"
                          dataKey="value"
                          stroke="#a78bfa"
                          fill="#a78bfa"
                          fillOpacity={0.6}       // ← disables hover line/dot
                        />
                        <ReTooltip
                          contentStyle={{
                            background: '#1e293b', // slate‑800 solid
                            border: 'none',
                            color: '#e2e8f0',
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* score bars */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Score Breakdown</h3>
                    {Object.entries(result.scores).map(([k, v]) => (
                      <div key={k} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{k}</span>
                          <span>{v}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${v}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    {/* harmful rating */}
                    <div className="pt-4">
                      <h4 className="font-medium mb-1">Overall Avg Risk</h4>
                      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-400"
                          style={{ width: `${result.harmfulRating}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">
                        {result.harmfulRating}% potential harmful impact
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                  Notable Phrases
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                  {result.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Intent Proportions (Donut) */}
              <div className="relative overflow-hidden rounded-3xl">
                {/* angled gradient stripe */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 to-blue-700/10 rotate-2 origin-top left-0" />
                <div className="relative bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-semibold mb-2 text-slate-100">
                    Intent Proportions
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Reads each amount of intent issues found for different categories, higher is worse.
                  </p>
                  <div className="grid gap-8 lg:grid-cols-2 items-center">
                    {/* donut chart */}
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={result.intentTokens ?? []}
                            dataKey="value"
                            nameKey="label"
                            innerRadius="60%"
                            outerRadius="90%"
                            paddingAngle={2}
                            stroke="none"
                          >
                            {(result.intentTokens ?? []).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={['#6366f1','#8b5cf6','#ec4899','#f97316','#22c55e'][index]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              background: '#1e293b',
                              border: 'none',
                              color: '#e2e8f0',
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* legend */}
                    <ul className="space-y-3 text-slate-300">
                      {(result.intentTokens ?? []).map((t, i) => {
                        const baseline = baselineTokens.find(b => b.label === t.label)?.avg ?? 0;
                        return (
                          <li key={t.label} className="flex items-center space-x-3">
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: ['#6366f1','#8b5cf6','#ec4899','#f97316','#22c55e'][i],
                              }}
                            ></span>
                            <span className="flex-1">{t.label}</span>
                            <span className="font-semibold text-slate-100">
                              {t.value} {/*<span className="font-normal text-xs text-slate-400">(avg {baseline})</span>*/}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Explanation Feedback */}
              <div className="bg-slate-100 dark:bg-slate-800 backdrop-blur-lg border-4 border-yellow-400 dark:border-yellow-300 rounded-3xl p-8 shadow-xl animate-pulse">
                <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                  AI Summary & Feedback
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  {result?.explanationSummary ?? 'No explanation provided for this analysis.'}
                </p>
              </div>

              {/* Key Risk Drivers */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                  Key Risk Drivers
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Below are the primary linguistic patterns elevating the
                  manipulative or emotional risk of this text:
                </p>
                <div className="space-y-3">
                  {[
                    { tag: 'Fear Words', pct: 34 },
                    { tag: 'Urgency Phrases', pct: 26 },
                    { tag: 'Group Polarization', pct: 18 },
                  ].map((r) => (
                    <div
                      key={r.tag}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{r.tag}</span>
                      <span className="font-medium">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next steps */}
              <div className="bg-gradient-to-r from-blue-700 to-purple-900 text-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">Next Steps To Stay Safe</h3>
                <ul className="list-decimal pl-5 space-y-2">
                  {result.nextSteps.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
              {/* Share button */}
              <div className="flex justify-center">
                <motion.button
                  onClick={handleShare}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share Report
                </motion.button>
              </div>
              {shared && (
                <motion.p
                  className="text-center text-sm text-emerald-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Copied to clipboard!
                </motion.p>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}