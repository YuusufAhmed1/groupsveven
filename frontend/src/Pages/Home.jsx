import { useEffect, useState } from 'react'
import { FiCheckCircle, FiCreditCard, FiSearch, FiTag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import EventGrid from '../components/events/EventGrid.jsx'
import PageState from '../components/common/PageState.jsx'
import { getEvents } from '../services/events.js'

const steps = [
<<<<<<< HEAD
  { title: 'Find an Event', description: 'Soo hel munaasabadda ama xafladda aad xiisaynayso.', icon: FiSearch },
  { title: 'Choose a Ticket', description: 'Dooro nooca iyo tirada tigidhada kugu habboon.', icon: FiTag },
  { title: 'Make Payment', description: 'Si fudud ugu dhammee demo payment-ka nidaamka.', icon: FiCreditCard },
  { title: 'Get Your QR Ticket', description: 'Hel tigidhkaaga iyo QR code-ka gaarka kuu ah.', icon: FiCheckCircle },
=======
  {
    title: 'Find an Event',
    description: 'Soo hel munaasabadda ama xafladda aad xiisaynayso.',
    icon: FiSearch,
  },
  {
    title: 'Choose a Ticket',
    description: 'Dooro nooca iyo tirada tigidhada kugu habboon.',
    icon: FiTag,
  },
  {
    title: 'Make Payment',
    description: 'Si fudud ugu dhammee demo payment-ka nidaamka.',
    icon: FiCreditCard,
  },
  {
    title: 'Get Your QR Ticket',
    description: 'Hel tigidhkaaga iyo QR code-ka gaarka kuu ahn Adiga.',
    icon: FiCheckCircle,
  },
>>>>>>> e47f495d67abe5c72ff5bb63354482cf077253b7
]

const destinations = [
  {
    name: 'Maldive',
    country: 'Indian Ocean',
    image:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    description:
      'Overwater villas, coral reefs, and water so clear it mirrors the sky.',
    price: 'From $1,890',
    rating: '4.9',
  },
]

function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getEvents()
<<<<<<< HEAD
      .then((data) => setEvents(Array.isArray(data.events) ? data.events.slice(0, 3) : []))
      .catch(() => setError('Munaasabadaha lama soo qaadi karin hadda.'))
=======
      .then((data) => setEvents(data.events.slice(0, 3)))
      .catch(() =>
        setError('Munaasabadaha lama soo qaadi karin hadda.')
      )
>>>>>>> e47f495d67abe5c72ff5bb63354482cf077253b7
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="bg-white">
<<<<<<< HEAD
      <section className="bg-blue-600"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Events made simple</p><h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">Soo hel xafladaha iyo munaasabadaha kuu xiisaha badan.</h1><p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">Ka raadi munaasabadaha kuu dhow, dooro tigidhka kugu habboon, kuna hel tigidhkaaga si fudud oo ammaan ah.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/events" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-blue-600 hover:bg-gray-100">Explore Events</Link><a href="#how-it-works" className="inline-flex items-center justify-center rounded-lg border border-white px-5 py-3 font-semibold text-white hover:bg-blue-700">Learn More</a></div></div></div></section>

      <section className="py-14 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Featured Events</h2><p className="mt-2 text-gray-600">Halkan waxaad ka heli doontaa munaasabadaha la soo bandhigay.</p></div><Link to="/events" className="font-semibold text-blue-600 hover:text-blue-700">View All Events</Link></div><div className="mt-8">{loading ? <PageState message="Loading events..." /> : error ? <PageState tone="error" message={error} /> : events.length ? <EventGrid events={events} /> : 
      <PageState title="No featured events" message="Dhacdooyin la heli karo ma jiraan hadda." />}</div></div></section>

      <section id="how-it-works" className="bg-gray-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">How It Works</h2>
          <p className="mt-2 text-gray-600">Afar tallaabo oo fudud ayaa kuu dhexeeya munaasabadda iyo tigidhkaaga.</p></div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, index) => { const Icon = step.icon; return <article key={step.title} className="border-t-2 border-blue-600 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><Icon className="text-2xl text-blue-600" aria-hidden="true" /><span className="text-sm font-semibold text-gray-400">0{index + 1}</span></div><h3 className="mt-5 font-semibold text-gray-900">{step.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p></article> })}</div></div></section>

      <section className="py-14 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8"><div className="max-w-2xl"><h2 className="text-2xl font-bold text-gray-900">Ma qabanqaabisaa munaasabad?</h2><p className="mt-2 leading-7 text-gray-600">EventHub wuxuu qabanqaabiyeyaasha ka caawiyaa abuurista iyo maareynta munaasabadaha iyo tigidhadooda hal meel.</p></div><Link to="/organizer/events/create" className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 sm:mt-0 sm:w-auto sm:shrink-0">Become an Organizer</Link></div></div></section>
=======
      <section className="bg-blue-700">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-50">
              Events made simple
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Soo hel xafladaha iyo munaasabadaha kuu xiisaha badan.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
              Ka raadi munaasabadaha kuu dhow, dooro tigidhka kugu habboon,
              kuna hel tigidhkaaga si fudud oo ammaan ah.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/events"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-gray-100"
              >
                Explore Events
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-white px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Featured Events
              </h2>

              <p className="mt-2 text-gray-700">
                Halkan waxaad ka heli doontaa munaasabadaha la soo bandhigay.
              </p>
            </div>

            <a
              href="/events"
              className="font-semibold text-blue-700 transition hover:text-blue-800"
            >
              View All Events
            </a>
          </div>

          <div className="mt-8">
            {loading ? (
              <PageState message="Loading events..." />
            ) : error ? (
              <PageState tone="error" message={error} />
            ) : events.length ? (
              <EventGrid events={events} />
            ) : (
              <PageState
                title="No featured events"
                message="Dhacdooyin la heli karo ma jiraan hadda."
              />
            )}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              How It Works
            </h2>

            <p className="mt-2 text-gray-600">
              Afar tallaabo oo fudud ayaa kuu dhexeeya munaasabadda iyo
              tigidhkaaga.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <article
                  key={step.title}
                  className="border-t-2 border-blue-700 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      className="text-2xl text-blue-700"
                      aria-hidden="true"
                    />

                    <span className="text-sm font-semibold text-gray-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                Ma qabanqaabisaa munaasabad?
              </h2>

              <p className="mt-2 leading-7 text-gray-600">
                EventHub wuxuu qabanqaabiyeyaasha ka caawiyaa abuurista iyo
                maareynta munaasabadaha iyo tigidhadooda hal meel.
              </p>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 sm:mt-0 sm:w-auto sm:shrink-0"
            >
              Become an Organizer
            </button>
          </div>
        </div>
      </section>
>>>>>>> e47f495d67abe5c72ff5bb63354482cf077253b7
    </main>
  )
}

export default Home