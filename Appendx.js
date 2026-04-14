import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  Wallet, 
  Menu, 
  X, 
  Star, 
  AlertCircle,
  TrendingUp,
  MapPin,
  ShieldCheck
} from 'lucide-react';

// --- UI Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-5 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", className = "", onClick }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Mock Data ---
const MOCK_JOBS = [
  { id: 1, course: "Electrical Network Analysis", time: "10:30 AM", topic: "Thevenin's Theorem", reward: 450, complexity: "High", location: "EE Dept - Room 4" },
  { id: 2, course: "Calculus III", time: "02:00 PM", topic: "Multiple Integrals", reward: 300, complexity: "Medium", location: "Main Hall" },
];

export default function App() {
  const [view, setView] = useState('landing'); // landing, requester, tutor
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Navigation handlers
  const navigateTo = (newView) => {
    setView(newView);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const LandingPage = () => (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-6 pt-24 pb-12 bg-gradient-to-b from-indigo-50 to-white text-center">
        <div className="inline-block px-4 py-1.5 mb-6 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide uppercase">
          NED University Startup
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          Never miss a <span className="text-indigo-600">class</span> again.
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
          The on-demand platform for university students to get verified notes, concepts, and attendance assistance from peers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => setView('requester')} className="text-lg px-8">I Need Help</Button>
          <Button variant="outline" onClick={() => setView('tutor')} className="text-lg px-8">Earn as Tutor</Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">Verified Peers</h3>
          <p className="text-slate-500">Only students with verified IDs from your campus can provide assistance.</p>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Wallet size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">Negotiable Rates</h3>
          <p className="text-slate-500">Demand-based marketplace. Pay what you think is fair for the notes/time.</p>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">Quality Notes</h3>
          <p className="text-slate-500">Get structured notes and voice recordings explaining key concepts.</p>
        </Card>
      </section>
    </div>
  );

  const RequesterDashboard = () => (
    <div className="px-6 pt-24 pb-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Request Assistance</h2>
          <p className="text-slate-500">2 requests remaining this month</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
          DA
        </div>
      </div>

      <Card className="mb-8 border-indigo-200 bg-indigo-50/30">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <AlertCircle className="text-indigo-600" size={20} />
          New Request
        </h3>
        <div className="space-y-4">
          <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="Course Name (e.g. Microprocessors)" />
          <div className="grid grid-cols-2 gap-4">
            <input className="p-3 rounded-xl border border-slate-200" type="time" />
            <select className="p-3 rounded-xl border border-slate-200">
              <option>Complexity: Low</option>
              <option>Complexity: Medium</option>
              <option>Complexity: High</option>
            </select>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center px-3 bg-white border border-slate-200 rounded-xl text-slate-500 font-mono">PKR</span>
            <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="Offer (e.g. 500)" type="number" />
          </div>
          <Button className="w-full">Broadcast to Tutors</Button>
        </div>
      </Card>

      <h3 className="font-bold mb-4">Active Requests</h3>
      <div className="space-y-4">
        {MOCK_JOBS.slice(0, 1).map(job => (
          <Card key={job.id} className="flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-900">{job.course}</p>
              <p className="text-sm text-slate-500 flex items-center gap-1"><Clock size={14}/> Today, {job.time}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold mb-2">Searching...</span>
              <p className="font-bold text-indigo-600">PKR {job.reward}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const TutorDashboard = () => (
    <div className="px-6 pt-24 pb-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tutor Portal</h2>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Star className="text-yellow-400 fill-yellow-400" size={16} />
            <span>4.9 (42 Jobs Done)</span>
          </div>
        </div>
        <Card className="p-2 px-4 flex items-center gap-3 bg-indigo-600 text-white">
          <Wallet size={20} />
          <span className="font-bold">PKR 3,250</span>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
          <p className="text-green-600 text-xs font-bold uppercase mb-1">Available Jobs</p>
          <p className="text-2xl font-bold text-green-800">12</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <p className="text-blue-600 text-xs font-bold uppercase mb-1">Today's Earnings</p>
          <p className="text-2xl font-bold text-blue-800">PKR 850</p>
        </div>
      </div>

      <h3 className="font-bold mb-4 flex items-center gap-2">
        <TrendingUp size={20} className="text-indigo-600" />
        Open Opportunities Near You
      </h3>
      
      <div className="space-y-4">          <Card key={job.id} className="hover:border-indigo-300 transition-colors cursor-pointer group">
            <div className="flex justify-between mb-3">
              <h4 className="font-bold text-lg group-hover:text-indigo-600 transition-colors">{job.course}</h4>
              <span className="font-bold text-green-600 text-lg">PKR {job.reward}</span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
              <p className="text-slate-500 flex items-center gap-2"><Clock size={16}/> {job.time}</p>
              <p className="text-slate-500 flex items-center gap-2"><MapPin size={16}/> {job.location}</p>
              <p className="text-slate-500 flex items-center gap-2"><BookOpen size={16}/> {job.topic}</p>
              <p className="text-slate-500 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${job.complexity === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                {job.complexity} Complexity
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Send Interest</Button>
              <Button variant="secondary"><MessageSquare size={20}/></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('landing')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <X className="text-white rotate-45" size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">AttendX</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setView('landing')} className="text-sm font-semibold hover:text-indigo-600">How it works</button>
            <button onClick={() => setView('requester')} className="text-sm font-semibold hover:text-indigo-600">Student Portal</button>
            <button onClick={() => setView('tutor')} className="text-sm font-semibold hover:text-indigo-600">Become a Tutor</button>
            <Button variant="primary" className="text-sm">Sign In</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl">
            <button onClick={() => navigateTo('landing')} className="text-left font-bold py-2">Home</button>
            <button onClick={() => navigateTo('requester')} className="text-left font-bold py-2">Student Dashboard</button>
            <button onClick={() => navigateTo('tutor')} className="text-left font-bold py-2">Tutor Marketplace</button>
            <hr />
            <Button variant="primary">Log In / Register</Button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main>
        {view === 'landing' && <LandingPage />}
        {view === 'requester' && <RequesterDashboard />}
        {view === 'tutor' && <TutorDashboard />}
      </main>

      {/* Shared Footer for Dashboards */}
      {view !== 'landing' && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 md:hidden px-6 py-3">
          <div className="flex justify-between items-center max-w-lg mx-auto">
             <button onClick={() => setView('requester')} className={`flex flex-col items-center gap-1 ${view === 'requester' ? 'text-indigo-600' : 'text-slate-400'}`}>
                <Users size={24} />
                <span className="text-[10px] font-bold">Request</span>
             </button>
             <button className="flex flex-col items-center gap-1 text-slate-400">
                <MessageSquare size={24} />
                <span className="text-[10px] font-bold">Chats</span>
             </button>
             <button onClick={() => setView('tutor')} className={`flex flex-col items-center gap-1 ${view === 'tutor' ? 'text-indigo-600' : 'text-slate-400'}`}>
                <TrendingUp size={24} />
                <span className="text-[10px] font-bold">Market</span>
             </button>
             <button className="flex flex-col items-center gap-1 text-slate-400">
                <Wallet size={24} />
                <span className="text-[10px] font-bold">Wallet</span>
             </button>
          </div>
        </footer>
      )}
    </div>
  );
}