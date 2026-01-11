import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { 
  Menu, 
  Search, 
  Tv, 
  Calendar, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Send, 
  Share2, 
  ShieldCheck,
  ChevronLeft,
  Heart,
  ArrowLeft,
  Trophy,
  Mic,
  TvMinimalPlay,
  Moon,
  Sun,
  Loader2,
  Cloud,
  X
} from 'lucide-react';
import { ViewType, Category, Channel, Match } from './types';
import { SOCIAL_LINKS, getCategories, getChannels, getMatches, THEME_COLOR } from './constants';
import { supabase } from './supabase';

const Sidebar: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  isDarkMode: boolean;
}> = ({ isOpen, onClose, isDarkMode }) => {
  const IconMap: Record<string, any> = {
    Mail, MessageCircle, Facebook, Instagram, Youtube, Twitter, Send, Share2, ShieldCheck
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed left-0 top-0 h-full w-[280px] bg-[#4f1ac9] z-[60] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}
      >
        <div className="p-8 flex flex-col h-full text-white">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-bold tracking-tight italic">BEING <span className="border-2 border-white px-2 py-0.5 rounded ml-1">TV</span></h1>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
            {SOCIAL_LINKS.map((link) => {
              const Icon = IconMap[link.icon];
              return (
                <a 
                  key={link.name} 
                  href={link.url}
                  className="flex items-center space-x-4 hover:bg-black/10 p-3 rounded-xl transition-all active:scale-95"
                >
                  <Icon className="w-5 h-5 opacity-80" />
                  <span className="font-semibold text-base tracking-wide">{link.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-center space-x-3 bg-white/5 py-3 rounded-2xl">
              <Cloud className="w-4 h-4 text-purple-100" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Supabase Cloud</span>
            </div>
            <p className="text-[10px] text-white/30 text-center uppercase font-black">Build v3.7.3-Clean</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Header: React.FC<{ 
  title: string; 
  onMenuClick: () => void; 
  onBackClick?: () => void; 
  onSearchToggle: () => void;
  isSearching: boolean;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}> = ({ title, onMenuClick, onBackClick, onSearchToggle, isSearching, searchTerm, onSearchChange, isDarkMode, toggleTheme }) => (
  <header className="bg-[#4f1ac9] text-white h-16 flex items-center justify-between px-4 sticky top-0 z-40 shadow-xl border-b border-white/10">
    {isSearching ? (
      <div className="flex items-center w-full space-x-3">
        <button onClick={onSearchToggle} className="p-2 active:scale-90 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 relative">
          <input 
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search channels..."
            className="w-full bg-[#3e14a1] text-white placeholder-purple-200 text-sm font-bold italic py-2.5 px-5 rounded-2xl border border-purple-400/30 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-inner"
          />
        </div>
      </div>
    ) : (
      <>
        <div className="flex items-center space-x-3">
          {onBackClick ? (
            <button onClick={onBackClick} className="p-2 active:scale-90 transition-transform">
              <ArrowLeft className="w-6 h-6" />
            </button>
          ) : (
            <button onClick={onMenuClick} className="p-2 active:scale-90 transition-transform">
              <Menu className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-lg font-black uppercase italic tracking-tighter truncate max-w-[180px] drop-shadow-md">{title}</h1>
        </div>
        <div className="flex items-center space-x-1">
          <button onClick={toggleTheme} className="p-2.5 hover:bg-white/10 rounded-full transition-all active:scale-90">
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={onSearchToggle} className="p-2.5 hover:bg-white/10 rounded-full transition-all active:scale-90">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </>
    )}
  </header>
);

const VideoEngine: React.FC<{ 
  url?: string; 
  isPlaying: boolean; 
  muted: boolean;
  onTogglePlay: () => void;
  channel: Channel;
}> = ({ url, isPlaying, muted, onTogglePlay, channel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {url && url !== '#' ? (
        <video
          ref={videoRef}
          src={url}
          className="w-full h-full object-contain"
          muted={muted}
          playsInline
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onCanPlay={() => setIsBuffering(false)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-6 text-white/30 p-10 text-center">
          <TvMinimalPlay className="w-24 h-24 opacity-10" />
          <p className="font-black italic uppercase tracking-[0.2em] text-xs">No Signal Detected</p>
        </div>
      )}
      
      {isBuffering && url && url !== '#' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-14 h-14 border-4 border-[#4f1ac9]/10 border-t-[#4f1ac9] rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase italic tracking-widest text-[#4f1ac9]">Buffering</span>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 z-10">
        <div className="bg-black/40 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 flex items-center space-x-2.5 shadow-2xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4f1ac9]"></span>
          </span>
          <span className="text-[11px] font-black text-white uppercase italic tracking-widest">Live</span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>(ViewType.LIVE_TV);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [activeStreamUrl, setActiveStreamUrl] = useState<string | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(true);
  const [muted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('beingtv_theme');
    return savedTheme === 'dark';
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('beingtv_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [catData, chanData, matchData] = await Promise.all([
        getCategories(),
        getChannels(),
        getMatches()
      ]);

      setCategories(catData || []);
      setChannels(chanData || []);
      setMatches(matchData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const channelSubscription = supabase
      .channel('public:all_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'channels' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channelSubscription);
    };
  }, [fetchData]);

  useEffect(() => {
    localStorage.setItem('beingtv_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.body.style.setProperty('--app-bg', '#121212');
    } else {
      document.body.style.setProperty('--app-bg', '#ffffff');
    }
  }, [isDarkMode]);

  const handleChannelClick = useCallback((channel: Channel) => {
    setSelectedChannel(channel);
    setActiveStreamUrl(channel.stream_url || null);
    setView(ViewType.CHANNEL_PLAYER);
    setIsPlaying(true);
    setIsSearching(false);
  }, []);

  const handleMatchClick = useCallback((match: Match) => {
    const channel = channels.find(c => c.name.toLowerCase() === (match.channel_name || '').toLowerCase());
    handleChannelClick({
      id: `match-${match.id}`,
      name: `${match.team1_name} vs ${match.team2_name}`,
      logo: channel?.logo || match.team1_logo || '',
      category_id: 'live-events',
      stream_url: match.stream_url || channel?.stream_url || '#'
    });
  }, [channels, handleChannelClick]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('beingtv_favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  const filteredChannels = useMemo(() => {
    if (!searchTerm) return channels;
    return channels.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [channels, searchTerm]);

  const currentChannels = useMemo(() => {
    if (searchTerm) return filteredChannels;
    if (!selectedCategory) return [];
    return channels.filter(c => c.category_id === selectedCategory.id);
  }, [channels, filteredChannels, searchTerm, selectedCategory]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  if (loading && categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#4f1ac9]">
        <Loader2 className="w-12 h-12 text-white animate-spin mb-6" />
        <p className="font-black italic uppercase tracking-[0.3em] text-[10px] text-white/80 animate-pulse">
          Connecting to Cloud
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full w-full max-w-md mx-auto shadow-2xl relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-[#4f1ac9]'}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isDarkMode={isDarkMode} />
      
      {view !== ViewType.CHANNEL_PLAYER && (
        <Header 
          title={view === ViewType.LIVE_TV ? 'BeingTv' : view === ViewType.LIVE_EVENT ? 'LIVE EVENT' : selectedCategory?.name || 'Category'} 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onBackClick={view === ViewType.CATEGORY_DETAIL ? () => setView(ViewType.LIVE_TV) : undefined}
          onSearchToggle={() => setIsSearching(!isSearching)}
          isSearching={isSearching}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}

      <main className={`flex-1 overflow-y-auto scrollbar-hide pb-20 ${view === ViewType.CHANNEL_PLAYER ? 'p-0 bg-black' : 'p-3'}`}>
        {view === ViewType.LIVE_TV && !isSearching && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat); setView(ViewType.CATEGORY_DETAIL); }}
                className={`w-full border-2 rounded-2xl py-6 px-6 text-center font-black text-xl shadow-sm transition-all active:scale-[0.97] uppercase italic flex items-center justify-between ${isDarkMode ? 'bg-[#1e1e1e] border-white/20 text-white' : 'bg-[#4f1ac9]/5 border-[#4f1ac9]/20 text-[#4f1ac9]'}`}
              >
                <span className="tracking-tighter">{cat.name}</span>
                <ChevronLeft className="w-5 h-5 opacity-40 rotate-180" />
              </button>
            ))}
          </div>
        )}

        {(view === ViewType.CATEGORY_DETAIL || isSearching) && view !== ViewType.CHANNEL_PLAYER && view !== ViewType.LIVE_EVENT && (
          <div className="grid grid-cols-3 gap-2.5 animate-in fade-in zoom-in-95 duration-500">
            {currentChannels.map((channel) => (
              <div key={channel.id} className="relative group">
                <button
                  onClick={() => handleChannelClick(channel)}
                  className={`rounded-xl p-2.5 shadow-lg flex flex-col items-center space-y-3 transition-all w-full active:scale-90 border ${isDarkMode ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-[#4f1ac9]/10'}`}
                >
                  <div className="w-full aspect-square flex items-center justify-center p-2">
                    <img src={channel.logo} alt={channel.name} className="w-full h-full object-contain" />
                  </div>
                  <span className={`text-[9px] font-bold text-center leading-tight truncate w-full px-0.5 ${isDarkMode ? 'text-gray-300' : 'text-[#4f1ac9]'}`}>{channel.name}</span>
                </button>
                <button onClick={() => toggleFavorite(channel.id)} className="absolute top-1.5 right-1.5 p-1 z-10">
                  <Heart className={`w-3 h-3 ${favorites.includes(channel.id) ? 'fill-[#4f1ac9] text-[#4f1ac9]' : 'text-gray-400 opacity-40'}`} />
                </button>
              </div>
            ))}
          </div>
        )}

        {view === ViewType.LIVE_EVENT && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {matches.map((match) => (
              <div key={match.id} className={`rounded-[2rem] border-2 p-6 shadow-xl text-right relative overflow-hidden ${isDarkMode ? 'bg-[#1e1e1e] border-white/20' : 'bg-white border-[#4f1ac9]/10'}`} dir="rtl">
                {match.status === 'LIVE' && (
                  <div className="absolute top-0 left-0 bg-[#4f1ac9] text-white px-4 py-1 text-[10px] font-black uppercase italic tracking-widest rounded-br-2xl shadow-lg">Live</div>
                )}
                <div className="flex items-start justify-between mb-8 mt-2">
                  <div className="flex flex-col items-center w-1/3 text-center space-y-3">
                    <img src={match.team1_logo || ''} alt="" className="w-16 h-16 p-2 bg-white rounded-2xl shadow-md" />
                    <span className={`text-[11px] font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-[#4f1ac9]'}`}>{match.team1_name_ar || match.team1_name}</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center pt-4 px-2">
                    <div className={`rounded-2xl px-5 py-2 shadow-inner mb-3 border ${isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-[#4f1ac9]/5 border-[#4f1ac9]/10'}`}>
                      <span className={`text-[10px] font-black uppercase italic ${isDarkMode ? 'text-purple-400' : 'text-[#4f1ac9]'}`}>{match.status_ar || match.status}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/3 text-center space-y-3">
                    <img src={match.team2_logo || ''} alt="" className="w-16 h-16 p-2 bg-white rounded-2xl shadow-md" />
                    <span className={`text-[11px] font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-[#4f1ac9]'}`}>{match.team2_name_ar || match.team2_name}</span>
                  </div>
                </div>
                <div className={`flex items-center justify-between pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-[#4f1ac9]/5'}`}>
                  <div className="flex items-center space-x-2 space-x-reverse opacity-60">
                    <Mic className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-[#4f1ac9]'}`} />
                    <span className={`text-[10px] font-bold ${isDarkMode ? 'text-white' : 'text-[#4f1ac9]'}`}>{match.commentator_ar || match.commentator}</span>
                  </div>
                  <button onClick={() => handleMatchClick(match)} className="bg-[#4f1ac9] text-white px-5 py-2 rounded-xl text-[11px] font-black italic shadow-lg shadow-[#4f1ac9]/20">
                    {match.channel_name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === ViewType.CHANNEL_PLAYER && selectedChannel && (
          <div className="fixed inset-0 bg-black z-[100] flex flex-col max-w-md mx-auto h-full">
            <div className="bg-black/50 backdrop-blur-md flex items-center justify-between p-6">
               <button onClick={() => setView(ViewType.LIVE_TV)} className="p-2.5 bg-white/10 text-white rounded-2xl border border-white/20">
                  <ChevronLeft className="w-6 h-6" />
               </button>
               <h2 className="text-white font-black italic uppercase tracking-tighter text-sm">{selectedChannel.name}</h2>
               <div className="w-11"></div>
            </div>
            <VideoEngine url={activeStreamUrl || ''} isPlaying={isPlaying} muted={muted} onTogglePlay={() => setIsPlaying(!isPlaying)} channel={selectedChannel} />
          </div>
        )}
      </main>

      {view !== ViewType.CHANNEL_PLAYER && (
        <nav className={`h-[72px] flex items-center justify-around fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 border-t backdrop-blur-2xl px-6 ${isDarkMode ? 'bg-[#1e1e1e]/90 border-white/5' : 'bg-white/95 border-[#4f1ac9]/10'}`}>
          <button onClick={() => { setView(ViewType.LIVE_TV); setIsSearching(false); setSearchTerm(''); }} className={`flex flex-col items-center space-y-1.5 transition-colors ${view === ViewType.LIVE_TV || view === ViewType.CATEGORY_DETAIL ? 'text-[#4f1ac9]' : isDarkMode ? 'text-gray-500' : 'text-[#4f1ac9]/40'}`}>
            <Tv className="w-6 h-6" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Home</span>
          </button>
          <button onClick={() => { setView(ViewType.LIVE_EVENT); setIsSearching(false); setSearchTerm(''); }} className={`flex flex-col items-center space-y-1.5 transition-colors ${view === ViewType.LIVE_EVENT ? 'text-[#4f1ac9]' : isDarkMode ? 'text-gray-500' : 'text-[#4f1ac9]/40'}`}>
            <Calendar className="w-6 h-6" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Events</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;