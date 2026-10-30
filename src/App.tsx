import { BookOpenText, CalendarDays, CircleDollarSign, Compass, House, LibraryBig, MoreHorizontal, Play, Search, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { events, groups, mediaItems, profileItems, quickActions, sermonCategories, sermons, biblePlans } from './data/mockData';

type Screen =
  | 'welcome'
  | 'home'
  | 'sermons'
  | 'media'
  | 'events'
  | 'groups'
  | 'give'
  | 'bible'
  | 'profile';

const bottomNav = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'media', label: 'Media', icon: LibraryBig },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'give', label: 'Give', icon: CircleDollarSign },
  { id: 'profile', label: 'More', icon: MoreHorizontal },
] as const;

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [activeMediaFilter, setActiveMediaFilter] = useState('All');
  const [sermonSearch, setSermonSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSermon, setSelectedSermon] = useState<typeof sermons[number] | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[number] | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<typeof groups[number] | null>(null);

  const filteredSermons = useMemo(() => {
    return sermons.filter((sermon) => {
      const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory;
      const matchesSearch = sermon.title.toLowerCase().includes(sermonSearch.toLowerCase())
        || sermon.preacher.toLowerCase().includes(sermonSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, sermonSearch]);

  const filteredMedia = useMemo(() => {
    return activeMediaFilter === 'All'
      ? mediaItems
      : mediaItems.filter((item) => item.type === activeMediaFilter);
  }, [activeMediaFilter]);

  const navigate = (target: Screen) => setScreen(target);

  return (
    <div className="min-h-screen bg-[#040d22] p-4 text-white antialiased sm:p-8">
      <div className="mx-auto max-w-[430px] overflow-hidden rounded-[36px] border border-[#d6b86f]/20 bg-[#0b1636] shadow-app">
        <div className="relative h-[900px] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(26,41,77,0.95),_rgba(11,22,54,1)_52%)]">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

          {screen === 'welcome' && (
            <WelcomeScreen onStart={() => setScreen('home')} />
          )}

          {screen !== 'welcome' && (
            <>
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
                  {screen === 'home' && (
                    <HomeScreen onNavigate={navigate} />
                  )}

                  {screen === 'sermons' && (
                    <SermonsScreen
                      search={sermonSearch}
                      setSearch={setSermonSearch}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      sermons={filteredSermons}
                      onSelectSermon={setSelectedSermon}
                    />
                  )}

                  {screen === 'media' && (
                    <MediaScreen
                      activeFilter={activeMediaFilter}
                      setActiveFilter={setActiveMediaFilter}
                      items={filteredMedia}
                    />
                  )}

                  {screen === 'events' && (
                    <EventsScreen onSelectEvent={setSelectedEvent} />
                  )}

                  {screen === 'groups' && (
                    <GroupsScreen onSelectGroup={setSelectedGroup} />
                  )}

                  {screen === 'give' && <GiveScreen />}

                  {screen === 'bible' && <BibleScreen />}

                  {screen === 'profile' && <ProfileScreen onNavigate={navigate} />}
                </div>

                <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0d1837]/95 px-3 pb-3 pt-2 backdrop-blur-xl">
                  <BottomNav active={screen} onChange={navigate} />
                </div>
              </div>
            </>
          )}

          {selectedSermon && (
            <DetailModal
              title={selectedSermon.title}
              subtitle={`${selectedSermon.preacher} • ${selectedSermon.date}`}
              image={selectedSermon.image}
              description={selectedSermon.description}
              onClose={() => setSelectedSermon(null)}
            />
          )}

          {selectedEvent && (
            <DetailModal
              title={selectedEvent.title}
              subtitle={`${selectedEvent.date} • ${selectedEvent.time}`}
              image={selectedEvent.image}
              description={`${selectedEvent.venue}\n\n${selectedEvent.description}`}
              onClose={() => setSelectedEvent(null)}
            />
          )}

          {selectedGroup && (
            <DetailModal
              title={selectedGroup.name}
              subtitle={`${selectedGroup.members} • Community Group`}
              image={selectedGroup.image}
              description={selectedGroup.description}
              onClose={() => setSelectedGroup(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative z-10 flex h-full flex-col justify-center px-6 pb-10 pt-8 text-center">
      <div className="mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#d8b76d]/50 bg-[#d8b76d] shadow-[inset_0_0_0_8px_#0b1636]">
        <div className="font-serif text-[72px] leading-none text-[#0b1636]">✦</div>
      </div>

      <div className="mb-8 space-y-2 font-serif text-[#f7f3ee]">
        <h1 className="text-5xl leading-[0.9] tracking-[-0.06em]">Scepter Christian</h1>
        <h2 className="text-5xl leading-[0.9] tracking-[-0.06em]">Centre</h2>
      </div>

      <div className="mb-8 inline-block rounded-full border border-[#d8b76d]/60 bg-[#d8b76d]/10 px-4 py-2 font-serif text-2xl text-[#d8b76d]">
        A family that loves
      </div>

      <p className="mb-12 text-xl leading-relaxed text-[#dfe7f6]">
        Sermons, live services, prayer and giving, all in one place.
      </p>

      <button
        onClick={onStart}
        className="w-full rounded-full bg-[#d8b76d] px-5 py-5 text-3xl font-bold text-[#0b1636] transition hover:brightness-105"
      >
        Get started
      </button>

      <button className="mt-6 w-full rounded-full border border-[#f4efe7]/70 bg-transparent px-5 py-5 text-2xl font-medium text-[#f4efe7]">
        I already have an account
      </button>
    </div>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between pt-1">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#d8b76d]">Good morning</p>
          <h2 className="mt-2 text-3xl font-bold text-[#f6f1ea]">Welcome home</h2>
        </div>
        <button className="h-11 w-11 rounded-full border border-white/15 bg-white/5 text-[#f6f1ea]">✦</button>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,25,52,1),rgba(11,18,35,0.9))] p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-[#f7f3ee]">SCEPTER</p>
            <p className="text-xs uppercase tracking-[0.35em] text-[#d8b76d]">Christian Centre</p>
          </div>
          <div className="rounded-full border border-[#d8b76d]/50 bg-[#d8b76d]/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#d8b76d]">
            A family that loves
          </div>
        </div>

        <div className="rounded-[22px] bg-[#d7b46c] p-3 text-[#15151d] shadow-inner">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#14151d]/70">Featured scripture</p>
            <button className="text-xs font-semibold text-[#14151d]">Romans 8:19</button>
          </div>
          <p className="font-serif text-2xl leading-tight">
            “For the earnest expectation of the creation eagerly waits for the revealing of the sons of God.”
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.id === 'sermons' ? BookOpenText : action.id === 'events' ? CalendarDays : action.id === 'give' ? CircleDollarSign : action.id === 'groups' ? Users : Compass;
          return (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id as Screen)}
              className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-left transition hover:border-[#d8b76d]/40 hover:bg-white/10"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5eac8] text-[#0b1636]">
                <Icon size={18} />
              </div>
              <p className="text-xl font-semibold text-[#f7f3ee]">{action.label}</p>
              <p className="mt-1 text-xs text-[#bac9e9]">{action.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[26px] border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#f7f3ee]">Latest sermon</h3>
          <button onClick={() => onNavigate('sermons')} className="text-sm text-[#d8b76d]">View all</button>
        </div>
        <div className="overflow-hidden rounded-[20px]">
          <img
            className="h-44 w-full object-cover"
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80"
            alt="Latest sermon"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-[#f7f3ee]">The Power of God’s Presence</p>
            <p className="text-xs uppercase tracking-[0.15em] text-[#c4cfea]">Pastor John Doe • 42:18</p>
          </div>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8b76d] text-[#0b1636]">
            <Play size={18} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[26px] border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#f7f3ee]">Upcoming events</h3>
          <button onClick={() => onNavigate('events')} className="text-sm text-[#d8b76d]">See all</button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-[#0c1835] p-3">
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-[#d8b76d] text-center text-[#0b1636]">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Nov</span>
              <span className="text-xl font-bold">02</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#f7f3ee]">Sunday Service</p>
              <p className="text-xs text-[#c4cfea]">10:00 AM • Main Auditorium</p>
            </div>
            <ChevronRight />
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-[#0c1835] p-3">
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-[#d8b76d] text-center text-[#0b1636]">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Nov</span>
              <span className="text-xl font-bold">14</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#f7f3ee]">Prayer &amp; Fasting</p>
              <p className="text-xs text-[#c4cfea]">4:00 PM • Main Auditorium</p>
            </div>
            <ChevronRight />
          </div>
        </div>
      </div>
    </>
  );
}

function SermonsScreen({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sermons: sermonList,
  onSelectSermon,
}: {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sermons: typeof sermons;
  onSelectSermon: (sermon: typeof sermons[number]) => void;
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between pt-1">
        <button onClick={() => window.history.back()} className="rounded-full border border-white/10 bg-white/5 p-3 text-[#f7f3ee]">
          ←
        </button>
        <h2 className="text-3xl font-bold text-[#f7f3ee]">Sermons</h2>
        <div className="h-9 w-9" />
      </div>

      <div className="mb-4 flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[#c7d5ef]">
        <Search size={18} className="mr-3 text-[#d8b76d]" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search sermons..."
          className="w-full bg-transparent text-sm text-[#f7f3ee] placeholder:text-[#9aaecf] outline-none"
        />
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {sermonCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? 'bg-[#d8b76d] text-[#111827]'
                : 'bg-white/5 text-[#dfe7f6]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sermonList.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-white/15 bg-white/5 p-8 text-center text-[#c7d5ef]">
            No sermons matched your search.
          </div>
        ) : (
          sermonList.map((sermon) => (
            <button
              key={sermon.id}
              onClick={() => onSelectSermon(sermon)}
              className="block w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/5 text-left"
            >
              <div className="relative">
                <img src={sermon.image} alt={sermon.title} className="h-48 w-full object-cover" />
                <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0b1636]/80 text-[#f7f3ee]">
                  <Play size={16} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-[#f7f3ee]">{sermon.title}</p>
                  <span className="text-xs text-[#d8b76d]">{sermon.duration}</span>
                </div>
                <p className="text-sm text-[#dfe7f6]">{sermon.preacher}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#c4cfea]">{sermon.date}</p>
                  <span className="rounded-full border border-[#d8b76d]/50 bg-[#d8b76d]/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#d8b76d]">
                    {sermon.category}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </>
  );
}

function MediaScreen({
  activeFilter,
  setActiveFilter,
  items,
}: {
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  items: typeof mediaItems;
}) {
  const filters = ['All', 'Sermons', 'Worship', 'Teachings', 'Podcasts'];

  return (
    <>
      <div className="mb-4 flex items-center justify-between pt-1">
        <h2 className="text-3xl font-bold text-[#f7f3ee]">Media</h2>
        <button className="rounded-full border border-white/10 bg-white/5 p-3 text-[#f7f3ee]">⌕</button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
              activeFilter === filter ? 'bg-[#d8b76d] text-[#111827]' : 'bg-white/5 text-[#dfe7f6]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-[22px] border border-white/10 bg-white/5">
            <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-[#d8b76d]/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#d8b76d]">
                  {item.type}
                </span>
                <span className="text-xs text-[#dfe7f6]">{item.duration}</span>
              </div>
              <p className="text-lg font-semibold text-[#f7f3ee]">{item.title}</p>
              <p className="mt-1 text-sm text-[#c6d1ef]">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EventsScreen({ onSelectEvent }: { onSelectEvent: (event: typeof events[number]) => void }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between pt-1">
        <button className="rounded-full border border-white/10 bg-white/5 p-3 text-[#f7f3ee]">←</button>
        <h2 className="text-3xl font-bold text-[#f7f3ee]">Events</h2>
        <div className="h-9 w-9" />
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => onSelectEvent(event)}
            className="flex w-full gap-3 rounded-[22px] border border-white/10 bg-white/5 p-3 text-left"
          >
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-[#d8b76d] text-center text-[#0b1636]">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Nov</span>
              <span className="text-2xl font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#f7f3ee]">{event.title}</p>
                <ChevronRight size={18} className="text-[#d8b76d]" />
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#d8b76d]">{event.category}</p>
              <p className="mt-1 text-sm text-[#dfe7f6]">{event.date} • {event.time}</p>
              <p className="text-xs text-[#c4cfea]">{event.venue}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function GroupsScreen({ onSelectGroup }: { onSelectGroup: (group: typeof groups[number]) => void }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between pt-1">
        <button className="rounded-full border border-white/10 bg-white/5 p-3 text-[#f7f3ee]">←</button>
        <h2 className="text-3xl font-bold text-[#f7f3ee]">Groups</h2>
        <div className="h-9 w-9" />
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelectGroup(group)}
            className="flex w-full items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 p-3 text-left"
          >
            <img src={group.image} alt={group.name} className="h-20 w-20 rounded-2xl object-cover" />
            <div className="flex-1">
              <p className="text-lg font-semibold text-[#f7f3ee]">{group.name}</p>
              <p className="mt-1 text-sm text-[#cfe1ff]">{group.members}</p>
              <p className="mt-1 line-clamp-2 text-xs text-[#b9c7e6]">{group.description}</p>
            </div>
            <ChevronRight className="text-[#d8b76d]" />
          </button>
        ))}
      </div>
    </>
  );
}

function GiveScreen() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between pt-1">
        <button className="rounded-full border border-white/10 bg-white/5 p-3 text-[#f7f3ee]">←</button>
        <h2 className="text-3xl font-bold text-[#f7f3ee]">Give</h2>
        <div className="h-9 w-9" />
      </div>

      <div className="rounded-[26px] border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8b76d] text-[#0b1636]">
            <CircleDollarSign size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold text-[#f7f3ee]">Give Now</p>
            <p className="text-sm text-[#dfe7f6]">Support the mission &amp; community</p>
          </div>
        </div>

        <button className="w-full rounded-full bg-[#d8b76d] px-5 py-4 text-lg font-bold text-[#0b1636]">
          Secure, fast and simple
        </button>
      </div>

      <div className="mt-5 rounded-[26px] border border-white/10 bg-white/5 p-4">
        <p className="mb-4 text-xl font-semibold text-[#f7f3ee]">Other ways to give</p>
        <div className="space-y-3 text-left">
          <button className="flex w-full items-center justify-between rounded-2xl bg-[#0d1837] px-4 py-4 text-[#f7f3ee]">
            <span>Bank Transfer</span>
            <ChevronRight size={18} className="text-[#d8b76d]" />
          </button>
          <button className="flex w-full items-center justify-between rounded-2xl bg-[#0d1837] px-4 py-4 text-[#f7f3ee]">
            <span>USSD / Mobile Money</span>
            <ChevronRight size={18} className="text-[#d8b76d]" />
          </button>
          <button className="flex w-full items-center justify-between rounded-2xl bg-[#0d1837] px-4 py-4 text-[#f7f3ee]">
            <span>Pay with Card</span>
            <ChevronRight size={18} className="text-[#d8b76d]" />
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[26px] border border-white/10 bg-[#0d1837] p-4">
        <p className="text-lg font-semibold text-[#f7f3ee]">Giving information</p>
        <p className="mt-2 text-sm leading-6 text-[#dfe7f6]">
          All giving is presented as a frontend demonstration only. Financial transactions and payment details are not connected to a live backend yet.
        </p>
      </div>
    </>
  );
}

function BibleScreen() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between pt-1">
        <button className="rounded-full border border-white/10 bg-white/5 p-3 text-[#f7f3ee]">←</button>
        <h2 className="text-3xl font-bold text-[#f7f3ee]">Bible</h2>
        <div className="h-9 w-9" />
      </div>

      <div className="mb-4 flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[#c7d5ef]">
        <Search size={18} className="mr-3 text-[#d8b76d]" />
        <input
          placeholder="Search scripture..."
          className="w-full bg-transparent text-sm text-[#f7f3ee] placeholder:text-[#9aaecf] outline-none"
        />
      </div>

      <div className="rounded-[24px] border border-white/10 bg-[#101b38] p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.22em] text-[#d8b76d]">Daily scripture</p>
          <button className="text-[#f7f3ee]">Share</button>
        </div>
        <p className="font-serif text-4xl leading-tight text-[#f7f3ee]">Romans 8:19</p>
        <p className="mt-3 text-base leading-7 text-[#dfe7f6]">
          “For the creation waits with eager longing for the revealing of the sons of God.”
        </p>
      </div>

      <div className="mt-5 rounded-[26px] border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xl font-semibold text-[#f7f3ee]">Reading plans</p>
          <button className="text-sm text-[#d8b76d]">View all</button>
        </div>

        <div className="space-y-3">
          {biblePlans.map((plan) => (
            <div key={plan.label} className="rounded-2xl bg-[#0d1837] p-3">
              <div className="mb-1 flex items-center justify-between">
                <p className="font-semibold text-[#f7f3ee]">{plan.label}</p>
                <span className="text-xs text-[#d8b76d]">{plan.progress}</span>
              </div>
              <p className="text-sm text-[#dfe7f6]">{plan.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-[26px] border border-white/10 bg-white/5 p-4">
        <p className="text-xl font-semibold text-[#f7f3ee]">Bookmarks</p>
        <div className="mt-3 rounded-2xl bg-[#0d1837] p-3 text-sm text-[#dfe7f6]">
          Romans 8:19 • For the creation waits with eager longing...
        </div>
      </div>
    </>
  );
}

function ProfileScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between pt-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8b76d] text-xl font-semibold text-[#0b1636]">
          E
        </div>
        <h2 className="text-3xl font-bold text-[#f7f3ee]">Exoh</h2>
        <button className="rounded-full border border-white/10 bg-white/5 p-3 text-[#f7f3ee]">⚙</button>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-[#f7f3ee]">My profile</p>
            <p className="text-sm text-[#c7d5ef]">Member • Scepter Christian Centre</p>
          </div>
          <ChevronRight size={18} className="text-[#d8b76d]" />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {profileItems.map((item) => (
          <button
            key={item}
            onClick={() => {
              if (item === 'My Groups') onNavigate('groups');
              else if (item === 'Saved Sermons') onNavigate('sermons');
              else if (item === 'Help & Support') onNavigate('home');
            }}
            className="flex w-full items-center justify-between rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-left text-[#f7f3ee]"
          >
            <span>{item}</span>
            <ChevronRight size={18} className="text-[#d8b76d]" />
          </button>
        ))}
      </div>
    </>
  );
}

function BottomNav({ active, onChange }: { active: Screen; onChange: (screen: Screen) => void }) {
  return (
    <nav className="grid grid-cols-5 gap-2">
      {bottomNav.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id as Screen)}
          className={`flex flex-col items-center justify-center gap-2 rounded-2xl px-2 py-2 text-[11px] transition ${
            active === id ? 'bg-[#d8b76d] text-[#0b1636]' : 'text-[#dfe7f6]'
          }`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function DetailModal({
  title,
  subtitle,
  image,
  description,
  onClose,
}: {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 bg-[#040d22]/85 p-4 backdrop-blur-sm">
      <div className="mx-auto mt-10 w-full max-w-[380px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1837] shadow-2xl">
        <div className="relative">
          <button onClick={onClose} className="absolute right-3 top-3 z-10 rounded-full bg-[#0b1636]/80 px-3 py-1 text-sm text-[#f7f3ee]">
            Close
          </button>
          <img src={image} alt={title} className="h-56 w-full object-cover" />
        </div>
        <div className="space-y-3 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#d8b76d]">Featured</p>
          <h3 className="text-2xl font-bold text-[#f7f3ee]">{title}</h3>
          <p className="text-sm text-[#dfe7f6]">{subtitle}</p>
          <p className="text-sm leading-7 text-[#dfe7f6] whitespace-pre-line">{description}</p>
          <button className="mt-2 w-full rounded-full bg-[#d8b76d] px-5 py-3 font-semibold text-[#0b1636]">
            Watch now
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size = 18, className = '' }: { size?: number; className?: string }) {
  return <span className={className}>›</span>;
}

export default App;
