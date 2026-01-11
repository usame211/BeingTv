import { Category, Channel, Match, SocialLink } from './types';
import { supabase } from './supabase';

export const THEME_COLOR = '#4f1ac9';

/**
 * Cloud Data Fetchers
 */
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (error) return CATEGORIES;
    return data && data.length > 0 ? (data as Category[]) : CATEGORIES;
  } catch (e) {
    return CATEGORIES;
  }
};

export const getChannels = async () => {
  try {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .order('name');
    if (error) return CHANNELS;
    return data && data.length > 0 ? (data as Channel[]) : CHANNELS;
  } catch (e) {
    return CHANNELS;
  }
};

export const getMatches = async () => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select('*');
    if (error) return MATCHES;
    return data && data.length > 0 ? (data as Match[]) : MATCHES;
  } catch (e) {
    return MATCHES;
  }
};

/**
 * Hardcoded Data Fallbacks
 */
export const CATEGORIES: Category[] = [
  { id: 'bein-1080', name: 'beIN SPORTS (1080P)' },
  { id: 'bein-720', name: 'beIN SPORTS (720P)' },
  { id: 'bein-480', name: 'beIN SPORTS (480P)' },
  { id: 'bein-ent', name: 'beIN ENTERTAINMENT' },
  { id: 'arabic', name: 'ARABIC CHANNELS' },
  { id: 'kids', name: 'KIDS CHANNELS' },
];

export const CHANNELS: Channel[] = [
  { id: 'bn-news', name: 'beIN News', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-1', name: 'beIN Sport 1', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-2', name: 'beIN Sport 2', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-3', name: 'beIN Sport 3', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-4', name: 'beIN Sport 4', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-5', name: 'beIN Sport 5', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-6', name: 'beIN Sport 6', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-7', name: 'beIN Sport 7', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-8', name: 'beIN Sport 8', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
  { id: 'bn-9', name: 'beIN Sport 9', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BeIN_Sports_logo.svg/2560px-BeIN_Sports_logo.svg.png', category_id: 'bein-720', stream_url: '#' },
];

export const MATCHES: Match[] = [
  {
    id: 'm1',
    team1_name: 'Sunderland',
    team1_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Sunderland_AFC_logo.svg/1200px-Sunderland_AFC_logo.svg.png',
    team2_name: 'Man City',
    team2_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png',
    status: 'LIVE',
    tournament: 'Premier League',
    commentator: 'Hassan Al-Eidaroos',
    channel_name: 'beIN Sport 1',
    stream_url: '#'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Contact us', icon: 'Mail', url: '#' },
  { name: 'Telegram', icon: 'Send', url: '#' },
  { name: 'Share app', icon: 'Share2', url: '#' },
  { name: 'Privacy policy', icon: 'ShieldCheck', url: '#' },
];