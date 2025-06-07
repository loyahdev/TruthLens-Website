import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md">
        <p className="text-sm font-medium">{`${label}: ${payload[0].value}%`}</p>
      </div>;
  }
  return null;
};
const BarChartComponent = ({
  data
}: {
  data: {
    category: string;
    value: number;
  }[];
}) => {
  const colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];
  return <motion.div className="w-full h-full" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.6
  }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 60
      }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} tick={{
          fill: '#64748b',
          fontSize: 12
        }} />
          <YAxis tick={{
          fill: '#64748b',
          fontSize: 12
        }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>;
};
export default BarChartComponent;