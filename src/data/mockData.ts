export type Sermon = {
  id: number;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  category: 'Recent' | 'Series' | 'Prayer' | 'Teaching';
  image: string;
  description: string;
};

export type MediaItem = {
  id: number;
  title: string;
  type: 'Sermons' | 'Worship' | 'Teachings' | 'Podcasts';
  subtitle: string;
  duration: string;
  image: string;
};

export type EventItem = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  category: 'Sunday Service' | 'Prayer Meeting' | 'Conference' | 'Special Programme';
};

export type GroupItem = {
  id: number;
  name: string;
  description: string;
  members: string;
  image: string;
};

export const quickActions = [
  { id: 'sermons', label: 'Sermons', description: 'Messages of hope' },
  { id: 'events', label: 'Events', description: 'Gatherings & services' },
  { id: 'give', label: 'Give', description: 'Support the mission' },
  { id: 'groups', label: 'Groups', description: 'Connect in community' },
  { id: 'bible', label: 'Bible', description: 'Daily scripture' },
];

export const sermons: Sermon[] = [
  {
    id: 1,
    title: 'The Power of God’s Presence',
    preacher: 'Pastor John Doe',
    date: 'Oct 26, 2025',
    duration: '42:18',
    category: 'Recent',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    description: 'A powerful message about holiness, intimacy with God, and living in the awareness of His presence.',
  },
  {
    id: 2,
    title: 'Walking in Faith',
    preacher: 'Pastor John Doe',
    date: 'Oct 19, 2025',
    duration: '38:45',
    category: 'Series',
    image:
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80',
    description: 'A series on trusting God in the middle of uncertain seasons and stepping forward with courage.',
  },
  {
    id: 3,
    title: 'Kingdom Mindset',
    preacher: 'Pastor Jane Smith',
    date: 'Oct 12, 2025',
    duration: '36:12',
    category: 'Teaching',
    image:
      'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80',
    description: 'Discover what it means to think, live, and respond from the perspective of God’s kingdom.',
  },
  {
    id: 4,
    title: 'Life in the Spirit',
    preacher: 'Pastor Peter Ojo',
    date: 'Oct 05, 2025',
    duration: '34:56',
    category: 'Prayer',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    description: 'A practical teaching on living a Spirit-filled life marked by peace, power, and obedience.',
  },
];

export const sermonCategories = ['All', 'Recent', 'Series', 'Prayer', 'Teaching'];

export const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: 'The Manifestation of Sons of God',
    type: 'Sermons',
    subtitle: 'Romans 8:19',
    duration: '42:18',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Living by the Spirit',
    type: 'Teachings',
    subtitle: 'Grace & transformation',
    duration: '28:04',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Faith in Action',
    type: 'Worship',
    subtitle: 'Praise & worship',
    duration: '19:58',
    image:
      'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'The Family of God',
    type: 'Podcasts',
    subtitle: 'Community & belonging',
    duration: '11:42',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
];

export const events: EventItem[] = [
  {
    id: 1,
    title: 'Sunday Service',
    date: 'Nov 02, 2025',
    time: '10:00 AM - 12:30 PM',
    venue: 'Main Auditorium',
    description: 'Join us for worship, prayer, the Word, and a joyful family gathering in His presence.',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    category: 'Sunday Service',
  },
  {
    id: 2,
    title: 'Leadership Workshop',
    date: 'Nov 08, 2025',
    time: '9:00 AM - 12:00 PM',
    venue: 'Youth Hall',
    description: 'A practical session for church leaders and volunteers on discernment, service and spiritual growth.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    category: 'Special Programme',
  },
  {
    id: 3,
    title: 'Prayer & Fasting',
    date: 'Nov 14, 2025',
    time: '4:00 PM - 9:00 PM',
    venue: 'Main Auditorium',
    description: 'A season of focused prayer, intercession and spiritual renewal for the church and community.',
    image:
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80',
    category: 'Prayer Meeting',
  },
  {
    id: 4,
    title: 'Youth Takeover',
    date: 'Nov 21, 2025',
    time: '1:00 PM - 5:00 PM',
    venue: 'Youth Hall',
    description: 'An inspiring afternoon of worship, creativity, and collective worship led by the youth team.',
    image:
      'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80',
    category: 'Conference',
  },
];

export const groups: GroupItem[] = [
  {
    id: 1,
    name: 'Prayer Group',
    description: 'Gathering in prayer and intercession for families, leaders and the city.',
    members: '124 members',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Youth Group',
    description: 'A vibrant place for worship, discipleship and relevant teaching for young people.',
    members: '87 members',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Men’s Fellowship',
    description: 'Support, accountability, and spiritual growth for men in every season.',
    members: '63 members',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Women’s Fellowship',
    description: 'A nurturing community of faith, encouragement, and practical discipleship.',
    members: '71 members',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Small Groups',
    description: 'Close community circles for Bible study, prayer and connected living.',
    members: '45 members',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
  },
];

export const biblePlans = [
  { label: 'Romans 8', progress: 'Day 1 of 7', description: 'The revealing of the sons of God' },
  { label: 'Prayer & Purpose', progress: 'Day 3 of 7', description: 'Praying with confidence and clarity' },
  { label: 'Faith Journey', progress: 'Day 5 of 7', description: 'Walking in grace and obedience' },
];

export const profileItems = [
  'My Groups',
  'Saved Sermons',
  'Giving History',
  'Notifications',
  'Settings',
  'Help & Support',
];
