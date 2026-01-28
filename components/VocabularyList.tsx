
import React from 'react';
import { VocabularyItem } from '../types';

interface VocabularyListProps {
  items: VocabularyItem[];
}

const VocabularyList: React.FC<VocabularyListProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-5 animate-in slide-in-from-bottom-5 duration-500">
      {items.map((item) => (
        <div key={item.id} className="bg-white p-6 rounded-[2.5rem] ios-shadow border border-slate-50 flex flex-col gap-3 hover:border-indigo-200 transition-all border-l-[6px] border-l-indigo-600">
          <div className="flex justify-between items-start">
            <h4 className="text-2xl font-black text-slate-800 tracking-tight">{item.word}</h4>
            <span className="text-[9px] bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-black uppercase tracking-wider">AI Scanned</span>
          </div>
          <div className="bg-indigo-50/50 p-4 rounded-2xl">
              <p className="text-indigo-600 font-extrabold text-xl">{item.translation}</p>
          </div>
          <p className="text-sm text-slate-500 italic leading-relaxed px-1">"{item.definition}"</p>
          <div className="mt-2 py-4 px-5 bg-slate-50 rounded-[1.5rem] text-[12px] text-slate-600 italic border border-slate-100 relative overflow-hidden">
            <span className="font-bold text-indigo-400 not-italic block mb-1 uppercase text-[10px] tracking-widest">Example sentence</span>
            <p className="relative z-10 leading-snug">"{item.example}"</p>
            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 text-indigo-600">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21M14.017 21H21.017M14.017 21V21C12.9124 21 12.017 20.1046 12.017 19V16.8954M3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21M3 21H10M3 21V21C1.89543 21 1 20.1046 1 19V16.8954" /></svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VocabularyList;
