import React from 'react';
import { Search } from 'lucide-react';

interface ContactSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContactSearch({ value, onChange }: ContactSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search contacts..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}