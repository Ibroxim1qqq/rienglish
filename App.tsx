
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ImageUploader from './components/ImageUploader';
import VocabularyList from './components/VocabularyList';
import Flashcards from './components/Flashcards';
import Auth from './components/Auth';
import { extractVocabularyFromImage } from './services/geminiService';
import { Storage } from './services/storage';
import { VocabularyItem, ViewMode, Lesson, MockTest, User } from './types';

// Separate Admin Panel component
const AdminPanel: React.FC<{ 
  lessons: Lesson[], 
  mockTests: MockTest[], 
  onAddLesson: (lesson: Lesson) => void,
  onAddMock: (mock: MockTest) => void
}> = ({ lessons, mockTests, onAddLesson, onAddMock }) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'mocks'>('lessons');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonThumb, setLessonThumb] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonLevel, setLessonLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [mockTitle, setMockTitle] = useState('');
  const [mockType, setMockType] = useState<'Full' | 'Listening' | 'Reading' | 'Writing' | 'Speaking'>('Full');
  const [mockDuration, setMockDuration] = useState('');
  const [mockQuestions, setMockQuestions] = useState(40);
  const [isPremium, setIsPremium] = useState(false);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLesson({
      id: Date.now().toString(),
      title: lessonTitle,
      thumbnail: lessonThumb || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500',
      duration: '15:00',
      level: lessonLevel,
      description: lessonDesc
    });
    setLessonTitle(''); setLessonThumb(''); setLessonDesc('');
    alert("Dars muvaffaqiyatli qo'shildi!");
  };

  const handleAddMock = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMock({
      id: 'm' + Date.now().toString(),
      title: mockTitle,
      type: mockType,
      duration: mockDuration || '60m',
      questionsCount: mockQuestions,
      isPremium: isPremium
    });
    setMockTitle(''); setMockDuration(''); setMockQuestions(40); setIsPremium(false);
    alert("Mock test muvaffaqiyatli qo'shildi!");
  };

  return (
    <div className="p-6 flex flex-col gap-10 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl">
          <p className="opacity-50 text-[10px] font-bold uppercase tracking-widest">Foydalanuvchilar</p>
          <h4 className="text-3xl font-black mt-1">1,482</h4>
        </div>
        <div className="bg-indigo-600 rounded-[2rem] p-6 text-white shadow-xl">
          <p className="opacity-50 text-[10px] font-bold uppercase tracking-widest">Darslar</p>
          <h4 className="text-3xl font-black mt-1">{lessons.length}</h4>
        </div>
        <div className="bg-emerald-500 rounded-[2rem] p-6 text-white shadow-xl">
          <p className="opacity-50 text-[10px] font-bold uppercase tracking-widest">Mocklar</p>
          <h4 className="text-3xl font-black mt-1">{mockTests.length}</h4>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">O'rtacha Ball</p>
          <h4 className="text-3xl font-black mt-1 text-slate-800">6.5</h4>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
            <div className="flex gap-4 mb-10 p-1.5 bg-slate-50 rounded-2xl">
              <button onClick={() => setActiveTab('lessons')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'lessons' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>Dars Qo'shish</button>
              <button onClick={() => setActiveTab('mocks')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'mocks' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>Mock Qo'shish</button>
            </div>
            {activeTab === 'lessons' ? (
              <form onSubmit={handleAddLesson} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5"><div className="space-y-1"><label className="text-xs font-bold text-slate-400 ml-2">Dars nomi</label><input value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} required placeholder="IELTS Reading Secrets" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm" /></div><div className="space-y-1"><label className="text-xs font-bold text-slate-400 ml-2">Daraja</label><select value={lessonLevel} onChange={e => setLessonLevel(e.target.value as any)} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select></div></div>
                <div className="space-y-1"><label className="text-xs font-bold text-slate-400 ml-2">Thumbnail URL</label><input value={lessonThumb} onChange={e => setLessonThumb(e.target.value)} placeholder="https://unsplash.com/..." className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm" /></div>
                <div className="space-y-1"><label className="text-xs font-bold text-slate-400 ml-2">Tavsif</label><textarea value={lessonDesc} onChange={e => setLessonDesc(e.target.value)} required rows={4} placeholder="Ushbu dars nima haqida?" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm" /></div>
                <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Darsni Platformaga Yuklash</button>
              </form>
            ) : (
              <form onSubmit={handleAddMock} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5"><div className="space-y-1"><label className="text-xs font-bold text-slate-400 ml-2">Mock nomi</label><input value={mockTitle} onChange={e => setMockTitle(e.target.value)} required placeholder="Full Mock Exam #42" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm" /></div><div className="space-y-1"><label className="text-xs font-bold text-slate-400 ml-2">Turi</label><select value={mockType} onChange={e => setMockType(e.target.value as any)} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm"><option value="Full">Full Mock</option><option value="Listening">Listening</option><option value="Reading">Reading</option><option value="Writing">Writing</option><option value="Speaking">Speaking</option></select></div></div>
                <div className="grid md:grid-cols-2 gap-5"><div className="space-y-1"><label className="text-xs font-bold text-slate-400 ml-2">Davomiyligi</label><input value={mockDuration} onChange={e => setMockDuration(e.target.value)} placeholder="60m" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm" /></div><div className="space-y-1"><label className="text-xs font-bold text-slate-400 ml-2">Savollar soni</label><input type="number" value={mockQuestions} onChange={e => setMockQuestions(Number(e.target.value))} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm" /></div></div>
                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer"><input type="checkbox" checked={isPremium} onChange={e => setIsPremium(e.target.checked)} className="w-5 h-5 rounded text-emerald-600" /><span className="text-sm font-bold text-slate-700">Premium Content</span></label>
                <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all">Mockni Bazaga Qo'shish</button>
              </form>
            )}
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-24">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3"><span className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 text-sm">👁️</span> Kontent</h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
              <div className="space-y-2"><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Darslar</p>{lessons.map(l => (<div key={l.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"><div className="flex items-center gap-3"><img src={l.thumbnail} className="w-10 h-10 object-cover rounded-lg" /><span className="font-bold text-slate-700 text-xs truncate max-w-[120px]">{l.title}</span></div></div>))}</div>
              <div className="space-y-2 pt-4"><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Mocklar</p>{mockTests.map(m => (<div key={m.id} className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl border border-emerald-100"><div className="flex items-center gap-3 text-emerald-700"><span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">{m.type[0]}</span><span className="font-bold text-xs truncate max-w-[120px]">{m.title}</span></div></div>))}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(Storage.getCurrentUser());
  const [mode, setMode] = useState<ViewMode>('home');
  const [items, setItems] = useState<VocabularyItem[]>([]);
  const [loadingMsg, setLoadingMsg] = useState('');

  // Initial Data
  const [lessons, setLessons] = useState<Lesson[]>(Storage.getLessons([
    { id: '1', title: 'IELTS Listening: Key Strategies', duration: '15:20', level: 'Intermediate', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500', description: "Ovozli testlarda 8.0+ ball olish sirlari." },
    { id: '2', title: 'Academic Writing Task 1', duration: '22:10', level: 'Advanced', thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500', description: "Diagrammalarni professional tasvirlash." }
  ]));

  const [mockTests, setMockTests] = useState<MockTest[]>(Storage.getMocks([
    { id: 'm1', title: 'Full IELTS Mock #1', type: 'Full', duration: '165m', questionsCount: 80, isPremium: true },
    { id: 'm2', title: 'Reading Mastery Pack', type: 'Reading', duration: '60m', questionsCount: 40, isPremium: false }
  ]));

  // Load user vocabulary when user changes
  useEffect(() => {
    if (user) {
      const vocab = Storage.getUserVocabulary(user.id);
      setItems(vocab);
    }
  }, [user]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    Storage.setCurrentUser(newUser);
    setMode('home');
  };

  const handleLogout = () => {
    setUser(null);
    Storage.setCurrentUser(null);
    setMode('auth');
  };

  const handleImageSelected = async (base64: string) => {
    setMode('processing');
    setLoadingMsg("Sun'iy intellekt tahlil qilmoqda...");
    try {
      const extractedItems = await extractVocabularyFromImage(base64);
      const updatedItems = [...extractedItems, ...items];
      setItems(updatedItems);
      if (user) Storage.saveUserVocabulary(user.id, updatedItems);
      setMode('list');
    } catch (error) {
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
      setMode('scan');
    }
  };

  const addLesson = (lesson: Lesson) => {
    const updated = [lesson, ...lessons];
    setLessons(updated);
    Storage.saveLessons(updated);
  };

  const addMock = (mock: MockTest) => {
    const updated = [mock, ...mockTests];
    setMockTests(updated);
    Storage.saveMocks(updated);
  };

  const getTitle = () => {
    switch(mode) {
      case 'home': return "Asosiy Dashboard";
      case 'lessons': return "Academy (Darslar)";
      case 'scan': return "AI Scan";
      case 'mocks': return "IELTS Mocks";
      case 'admin': return "Boshqaruv Paneli";
      case 'list': return "So'zlar Ro'yxati";
      default: return "LingoMaster";
    }
  };

  if (!user) return <Auth onLogin={handleLogin} />;

  return (
    <Layout activeTab={mode} onTabChange={setMode} title={getTitle()} user={user} onLogout={handleLogout}>
      {mode === 'home' && (
        <div className="p-6 flex flex-col gap-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
          <div className="bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-2">Salom, {user.name}! 👋</h2>
              <p className="opacity-80 text-lg mb-8">Bugun bilimingizni boyitish uchun ajoyib kun.</p>
              <div className="flex gap-4">
                 <button onClick={() => setMode('mocks')} className="bg-white text-indigo-600 px-8 py-4 rounded-[1.5rem] font-bold shadow-xl active:scale-95 transition-all">Mock Boshlash</button>
                 <button onClick={() => setMode('scan')} className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-[1.5rem] font-bold active:scale-95 transition-all">AI Scan Tool</button>
              </div>
            </div>
            <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
                 <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 text-2xl font-bold">{items.length > 0 ? 'AI' : '0'}</div>
                 <div><h4 className="font-bold text-slate-800">Sizning so'zlaringiz</h4><p className="text-sm text-slate-400">Jami {items.length} ta so'z saqlangan</p></div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
                 <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 text-2xl font-bold">12</div>
                 <div><h4 className="font-bold text-slate-800">Kunlik Streak</h4><p className="text-sm text-slate-400">Shunday davom eting!</p></div>
              </div>
          </div>
        </div>
      )}
      {mode === 'lessons' && (
        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {lessons.map(l => (
                <div key={l.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group">
                    <div className="relative aspect-video"><img src={l.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" /></div>
                    <div className="p-8">
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-black uppercase">{l.level}</span>
                        <h4 className="text-xl font-black text-slate-800 mt-4 mb-2">{l.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-6">{l.description}</p>
                        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">Boshlash</button>
                    </div>
                </div>
            ))}
        </div>
      )}
      {mode === 'scan' && <div className="max-w-2xl mx-auto p-6"><ImageUploader onImageSelected={handleImageSelected} /></div>}
      {mode === 'mocks' && (
        <div className="p-6 flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="flex gap-3 mb-4 overflow-x-auto no-scrollbar pb-2">
                {['All', 'Listening', 'Reading', 'Writing', 'Speaking'].map(f => (<button key={f} className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap ${f === 'All' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border border-slate-100 text-slate-500'}`}>{f}</button>))}
            </div>
            {mockTests.map(m => (
                <div key={m.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between group">
                    <div className="flex gap-6 items-center"><div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-2xl font-black text-white ${m.type === 'Full' ? 'bg-indigo-600' : 'bg-indigo-400'}`}>{m.type[0]}</div><div><h4 className="text-xl font-black text-slate-800">{m.title}</h4><p className="text-sm text-slate-400 mt-1">{m.duration} • {m.questionsCount} Savollar</p></div></div>
                    <button className="bg-indigo-50 text-indigo-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-indigo-600 hover:text-white transition-all">START</button>
                </div>
            ))}
        </div>
      )}
      {mode === 'admin' && <AdminPanel lessons={lessons} mockTests={mockTests} onAddLesson={addLesson} onAddMock={addMock} />}
      {mode === 'processing' && (
        <div className="flex flex-col items-center justify-center py-40 gap-8">
           <div className="relative"><div className="w-32 h-32 border-[12px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div><div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-indigo-600">AI</div></div>
           <p className="text-2xl font-black text-slate-800">{loadingMsg}</p>
        </div>
      )}
      {mode === 'list' && (
        <div className="p-6 max-w-2xl mx-auto pb-32">
            <div className="flex gap-4 mb-8 sticky top-24 z-10">
                <button onClick={() => setMode('flashcards')} className="flex-1 bg-indigo-600 text-white py-5 rounded-[1.8rem] font-bold shadow-2xl">Mashq qilish</button>
                <button onClick={() => setMode('home')} className="w-16 h-16 bg-white rounded-[1.8rem] border border-slate-100 flex items-center justify-center text-slate-300"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <VocabularyList items={items} />
            {items.length === 0 && <p className="text-center text-slate-400 mt-20">Hali so'zlar yuklanmagan. ✨ Scan bo'limiga o'ting!</p>}
        </div>
      )}
      {mode === 'flashcards' && (
        <div className="p-6 max-w-2xl mx-auto">
            <button onClick={() => setMode('list')} className="mb-8 flex items-center gap-2 px-5 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-bold">← Ro'yxatga qaytish</button>
            <Flashcards items={items} />
        </div>
      )}
    </Layout>
  );
};

export default App;
