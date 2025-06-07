import React, { Component } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
const CustomTooltip = ({
  active,
  payload
}: any) => {
  if (active && payload && payload.length) {
    return <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md">
        <p className="text-sm font-medium">{`${payload[0].payload.category}: ${payload[0].value}%`}</p>
      </div>;
  }
  return null;
};
const RadarChartComponent = ({
  data
}: {
  data: {
    category: string;
    value: number;
    fullMark: number;
  }[];
}) => {
  return <motion.div className="w-full h-full" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.6
  }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="category" tick={{
          fill: '#64748b',
          fontSize: 12
        }} />
          <Tooltip content={<CustomTooltip />} />
          <Radar name="Intent Score" dataKey="value" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>;
};
export default RadarChartComponent;