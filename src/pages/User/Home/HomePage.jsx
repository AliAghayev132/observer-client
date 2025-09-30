// React
import { useState } from "react";
// Images
import HeroImage from "@/assets/images/image.png";
// API
import { motion, cubicBezier } from "framer-motion";
import { FeaturedCategories } from "./FeaturedCategories/FeaturedCategories";

export const HomePage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  // Framer Motion config
  const ease = cubicBezier(0.16, 1, 0.3, 1);
  const hero = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
  };

  const faq = [
    {
      q: "How does the Observer AI work?",
      a: (
        <p>
          Each AI Leader is a digital replica inspired by the wisdom and style
          of real spiritual guides. They offer daily support, emotional insight,
          and personalized rituals — available 24/7. You can explore their depth
          of knowledge through themed conversations, reflections, and responses
          tailored to your journey.
        </p>
      ),
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: (
        <p>
          Yes. You can cancel your subscription at any time. There are no
          long-term commitments, and you'll retain access until the end of your
          billing cycle.
        </p>
      ),
    },
    {
      q: "What's included in each AI Leader package?",
      a: (
        <div>
          <p className="mb-2">Each AI Leader provides:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Instant access to their wisdom archive and unique voice</li>
            <li>
              Personalized answers to emotional, spiritual, and life questions
            </li>
            <li>Monthly rituals, themed practices, or reflections</li>
            <li>Evolving interactions shaped by your ongoing input</li>
          </ul>
        </div>
      ),
    },
    {
      q: "How do I choose the right AI Leader for me?",
      a: (
        <p>
          Explore our categories to find leaders that resonate with your
          interests and needs. Pro subscribers can switch between leaders to
          find their perfect match.
        </p>
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <motion.section
        id="hero"
        className="relative overflow-hidden isolate py-16 sm:py-20 px-4"
        variants={hero}
        initial="hidden"
        animate="show"
      >
        {/* soft gradient blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <motion.span
            className="absolute -top-10 -left-14 h-80 w-80 rounded-full blur-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(156,169,130,.35),rgba(156,169,130,.1)_60%,transparent_70%)]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          />
          <motion.span
            className="absolute -top-6 -right-20 h-80 w-80 rounded-full blur-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(26,26,26,.10),transparent_70%)]"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            style={{ willChange: "transform" }}
          />
          <motion.span
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(243,233,210,.35),transparent_70%)]"
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            style={{ willChange: "transform" }}
          />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            variants={fadeUp}
            style={{
              willChange: "transform",
            }}
            className="text-3xl sm:text-5xl font-medium text-neutral-900 tracking-tight"
          >
            AI-Powered Leader Wisdom
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            className="mt-2 text-2xl sm:text-4xl text-[#9CA982] font-extralight"
            style={{
              willChange: "transform",
            }}
          >
            Inner Clarity with You Wherever You Are.
          </motion.h2>

          <motion.div variants={fadeUp} style={{ willChange: "transform" }} className="mt-6 inline-flex gap-2">
            <a
              href="/explore"
              className="inline-flex items-center rounded-full px-4 py-2 text-white bg-gradient-to-r from-[#9CA982] to-[#7d8a65] shadow-lg shadow-[#9CA982]/30 transition-transform hover:-translate-y-0.5"
            >
              Explore Leaders
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full px-4 py-2 text-neutral-900 bg-white/70 border border-black/10 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#9CA982]/50 hover:text-[#7d8a65]"
            >
              Contact
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative mx-auto mt-8 max-w-xl"
          >
            <motion.img
              src={HeroImage}
              alt="Hero Image"
              className="h-[340px] w-full rounded-xl object-cover object-[50%_20%] shadow-lg"
              initial={{
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                scale: 1.02,
                opacity: 0.9,
              }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                scale: 1,
                opacity: 1,
              }}
              transition={{ duration: 1.5, ease, delay: 0.8 }}
              style={{
                willChange: "clip-path, scale, opacity",
              }}
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-28 text-center text-[44px] sm:text-[56px] font-semibold tracking-widest text-[#f3e9d2] drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              variants={fadeUp}
            >
              OBSERVER AI
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease }}
            style={{ willChange: "transform" }}
            className="mt-10 flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-8"
          >
            {[
              { n: "20+", t: "AI Leaders." },
              { n: "3M+", t: "Cumulative Reach." },
              { n: "1000+", t: "Upcoming Leaders." },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-xl bg-white px-6 py-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-3xl font-bold text-neutral-900">{s.n}</h3>
                <p className="text-[#b3a77a] font-medium">{s.t}</p>
              </div>
            ))}
          </motion.div>

          {/* Testimonial */}
          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease }}
            style={{ willChange: "transform" }}
            className="mx-auto mt-10 max-w-xl text-center text-neutral-800 italic"
          >
            “OBSERVER became the missing link between my content and my
            audience. Simple, powerful, and truly supportive.”
            <span className="mt-2 block not-italic text-sm text-neutral-500">
              Meli, Wellbeing Mentor
            </span>
          </motion.blockquote>
        </div>
      </motion.section>

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Pricing */}
      <section
        id="pricing"
        className="mx-auto mt-16 max-w-5xl px-4 text-center"
      >
        <h2 className="text-3xl font-bold">Pricing</h2>
        <p className="mt-2 text-[#9CA982]">Choose Your Path.</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-[#dbe3c2] p-7 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-lg font-bold">Basic</h3>
            <div className="mt-1 text-3xl font-bold text-neutral-900">
              $3/mo
            </div>
            <ul className="mt-3 list-disc pl-6 text-neutral-700 space-y-1">
              <li>Access to monthly AI guides</li>
              <li>Ask 5 questions per day</li>
              <li>Access limited to 1 leader at a time</li>
            </ul>
            <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#9CA982] to-[#1a1a1a] py-2 text-white shadow transition hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>
          <div className="rounded-xl bg-[#e6e9d8] p-7 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-lg font-bold">Pro</h3>
            <div className="mt-1 text-3xl font-bold text-neutral-900">
              $9/mo
            </div>
            <ul className="mt-3 list-disc pl-6 text-neutral-700 space-y-1">
              <li>Access to monthly AI guides</li>
              <li>Ask 50 questions per day</li>
              <li>Can switch between leaders</li>
            </ul>
            <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#9CA982] to-[#1a1a1a] py-2 text-white shadow transition hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto mt-16 max-w-xl px-4 text-center">
        <h2 className="text-2xl font-bold">Monthly ritual inspiration.</h2>
        <p className="mt-2 text-[#9CA982] text-lg">
          Join our newsletter for insights.
        </p>
        <form className="mt-4 flex flex-col items-center gap-3">
          <input
            type="email"
            required
            placeholder="name@observer.ai"
            className="w-full max-w-md rounded-lg border border-[#eae4c8] bg-white px-3 py-2 outline-none transition focus:-translate-y-0.5 focus:border-[#9CA982] focus:ring-4 focus:ring-[#9CA982]/20"
          />
          <button
            type="submit"
            className="w-full max-w-[180px] rounded-lg bg-gradient-to-r from-[#9CA982] to-[#1a1a1a] py-2 text-white shadow transition hover:-translate-y-0.5"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* FAQ */}
      <section className="mx-auto my-16 max-w-2xl px-4">
        <h2 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-center text-[#b3a77a]">
          Find answers to common questions about ObserverAI.
        </p>
        <div className="mt-6 divide-y divide-neutral-200">
          {faq.map((item, i) => {
            const expanded = openFaq === i;
            return (
              <div key={i} className="py-3">
                <button
                  className="flex w-full items-center justify-between py-3 text-left font-medium transition hover:text-[#9CA982]"
                  aria-expanded={expanded}
                  onClick={() => setOpenFaq(expanded ? null : i)}
                >
                  <span className="pr-4">{item.q}</span>
                  <span
                    className={`text-xl transition-transform ${
                      expanded ? "rotate-45 text-[#9CA982]" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all ${
                    expanded ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden text-neutral-700">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
