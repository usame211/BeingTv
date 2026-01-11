export enum ViewType {
  LIVE_TV = 'LIVE_TV',
  LIVE_EVENT = 'LIVE_EVENT',
  CATEGORY_DETAIL = 'CATEGORY_DETAIL',
  CHANNEL_PLAYER = 'CHANNEL_PLAYER'
}

export interface Match {
  id: string;
  team1_name: string;
  team1_logo: string;
  team2_name: string;
  team2_logo: string;
  status: string;
  status_ar?: string;
  tournament: string;
  tournament_ar?: string;
  commentator: string;
  commentator_ar?: string;
  channel_name: string;
  stream_url?: string;
  // Fallbacks for compatibility
  team1_name_ar?: string;
  team2_name_ar?: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  category_id: string;
  stream_url?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}