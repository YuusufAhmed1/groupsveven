// function Home(){
//     return<>
//     <h1>welcome to home</h1>
//     </>
// }
// export default Home



import { Link } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard.jsx'
import PackageCard from '../components/PackageCard.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'

const destinations = [
  {
    name: 'Maldives',
    country: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    description: 'Overwater villas, coral reefs, and water so clear it mirrors the sky.',
    price: 'From $1,890',
    rating: '4.9',
  },
  {
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    description: 'Where soaring skylines meet golden dunes and old souks.',
    price: 'From $1,240',
    rating: '4.8',
  },
  {
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: 'Cobblestone lanes, candlelit bistros, and the Seine at dusk.',
    price: 'From $980',
    rating: '4.9',
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
    description: 'Two continents, one city — spice markets and skyline minarets.',
    price: 'From $760',
    rating: '4.7',
  },
  {
    name: 'Zanzibar',
    country: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Spice-scented air, powder-white sand, and turquoise shallows.',
    price: 'From $1,120',
    rating: '4.8',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Terraced rice fields, temple bells, and surf at sunrise.',
    price: 'From $890',
    rating: '4.9',
  },
]

const features = [
  {
    title: 'Best Destinations',
    description: 'Hand-picked locations vetted by our own travel curators, not algorithms.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Affordable Prices',
    description: 'Transparent pricing with no hidden fees — quality trips within reach.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12h6M12 9v6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Experienced Guides',
    description: 'Local experts who know the stories behind every street and shoreline.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V6a2 2 0 0 1 2-2h11l3 3v12" strokeLinejoin="round" />
        <path d="M4 19h16M8 19V9h6v10" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    description: 'A real human on call, wherever you are, whenever you need us.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 12a8 8 0 1 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 17v-5h3v6H5a1 1 0 0 1-1-1Z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const packages = [
  {
    name: 'Maldives Escape',
    destination: 'Maldives',
    duration: '5 Days',
    price: '$2,150',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Arabian Nights',
    destination: 'Dubai',
    duration: '4 Days',
    price: '$1,480',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Parisian Romance',
    destination: 'Paris',
    duration: '6 Days',
    price: '$1,690',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bali Wellness',
    destination: 'Bali',
    duration: '7 Days',
    price: '$1,320',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
  },
]

const testimonials = [
  {
    name: 'Amara Osei',
    location: 'Accra, Ghana',
    rating: 5,
    review: 'Wanderlust planned our Bali trip down to the last detail. Every recommendation felt personal, not generic.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Daniel Cho',
    location: 'Seoul, South Korea',
    rating: 5,
    review: 'The Istanbul guide knew every hidden rooftop. Genuinely the best-organized trip I have taken.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Sofia Marchetti',
    location: 'Milan, Italy',
    rating: 4,
    review: 'Smooth booking, honest pricing, and support that actually answered at midnight when our flight changed.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
          alt="Aircraft wing above clouds at golden hour"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/40" />

        <div className="container-px relative mx-auto max-w-7xl">
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-sunset-300">
            <span className="h-px w-8 bg-sunset-300" /> Boutique Travel Studio
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-5xl font-semibold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            Explore The World With Us
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy-100">
            Discover breathtaking destinations, unforgettable experiences, and journeys designed
            just for you.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#destinations"
              className="rounded-full bg-sunset-400 px-8 py-3.5 text-sm font-semibold text-navy-900 shadow-soft transition-all hover:bg-sunset-500"
            >
              Explore Destinations
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white hover:text-navy-900"
            >
              Book Your Trip
            </Link>
          </div>

          {/* Search box */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-14 grid grid-cols-1 gap-4 rounded-2xl bg-white/95 p-5 shadow-soft backdrop-blur sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-3"
          >
            <div className="lg:col-span-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-navy-400">Destination</label>
              <input
                type="text"
                placeholder="Where to?"
                className="mt-1.5 w-full rounded-lg border border-navy-100 bg-sand-50 px-3 py-2.5 text-sm text-navy-800 placeholder-navy-300 focus:border-ocean-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-navy-400">Check-in</label>
              <input
                type="date"
                className="mt-1.5 w-full rounded-lg border border-navy-100 bg-sand-50 px-3 py-2.5 text-sm text-navy-800 focus:border-ocean-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-navy-400">Check-out</label>
              <input
                type="date"
                className="mt-1.5 w-full rounded-lg border border-navy-100 bg-sand-50 px-3 py-2.5 text-sm text-navy-800 focus:border-ocean-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-navy-400">Travelers</label>
              <select className="mt-1.5 w-full rounded-lg border border-navy-100 bg-sand-50 px-3 py-2.5 text-sm text-navy-800 focus:border-ocean-400 focus:outline-none">
                <option>1 Traveler</option>
                <option>2 Travelers</option>
                <option>3 Travelers</option>
                <option>4+ Travelers</option>
              </select>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sunset-500 hover:text-navy-900"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="container-px mx-auto max-w-7xl py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunset-500">Where next</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-navy-800">Popular Destinations</h2>
          <p className="mt-4 text-navy-500">Six places our travelers return to again and again.</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.name} {...d} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-navy-50/60 py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunset-500">Why Wanderlust</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-navy-800">Why Choose Us</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-7 text-center shadow-card">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-sunset-400">
                  {f.icon}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy-800">{f.title}</h3>
                <p className="mt-2 text-sm text-navy-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunset-500">Curated for you</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-navy-800">Featured Travel Packages</h2>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <PackageCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-50/60 py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunset-500">Traveler stories</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-navy-800">What Our Travelers Say</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80"
          alt="Mountain valley at sunrise"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/75" />
        <div className="container-px relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">
            Ready To Start Your Next Adventure?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-navy-100">
            Pack your bags and let us create an unforgettable journey for you.
          </p>
          <Link
            to="/contact"
            className="mt-9 inline-block rounded-full bg-sunset-400 px-9 py-4 text-sm font-semibold text-navy-900 shadow-soft transition-all hover:bg-sunset-500"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>
    </div>
  )
}
