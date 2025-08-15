// Styles
import styles from "./HomePage.module.css";
// Images
import HeroImage from "@/assets/images/image.png";
// API
import { FeaturedCategories } from "./FeaturedCategories/FeaturedCategories";

export const HomePage = () => {
    return (
        <>
            <section className={styles.hero} id="hero">
                <h1 className={styles.heroTitleBlc}>AI-Powered Leader Wisdom</h1>
                <h1 className={styles.heroTitle}>Inner Clarity with You Wherever You Are.</h1>
                <div className={styles.heroImage}>
                    <img src={HeroImage} alt="Hero Image" />
                    <div className={styles.overlayText}>OBSERVER AI</div>
                </div>
                <div className={styles.stats}>
                    <div className={styles.statBox}>
                        <h3>20+</h3>
                        <p>AI Leaders.</p>
                    </div>
                    <div className={styles.statBox}>
                        <h3>3M+</h3>
                        <p>Cumulative Reach.</p>
                    </div>
                    <div className={styles.statBox}>
                        <h3>1000+</h3>
                        <p>Upcoming Leaders.</p>
                    </div>
                </div>
                <blockquote className={styles.testimonial}>
                    "OBSERVER became the missing link between my content and my audience. Simple, powerful, and truly
                    supportive."
                    <span className={styles.testimonialAuthor}>Meli, Wellbeing Mentor</span>
                </blockquote>
            </section>

            <FeaturedCategories />

            <section className={styles.pricing} id="pricing">
                <h2>Pricing</h2>
                <p className={styles.subtitle}>Choose Your Path.</p>
                <div className={styles.pricingCards}>
                    <div className={`${styles.pricingCard} ${styles.basic}`}>
                        <h3>Basic</h3>
                        <div className={styles.price}>$3/mo</div>
                        <ul>
                            <li>Access to monthly AI guides</li>
                            <li>Ask 5 questions per day</li>
                            <li>Access limited to 1 leader at a time</li>
                        </ul>
                        <button>Subscribe</button>
                    </div>
                    <div className={`${styles.pricingCard} ${styles.pro}`}>
                        <h3>Pro</h3>
                        <div className={styles.price}>$9/mo</div>
                        <ul>
                            <li>Access to monthly AI guides</li>
                            <li>Ask 50 questions per day</li>
                            <li>Can switch between leaders <br /> </li>
                        </ul>
                        <button>Subscribe</button>
                    </div>
                </div>
            </section>

            <section className={styles.newsletter}>
                <h2>Monthly ritual inspiration.</h2>
                <p>Join our newsletter for insights.</p>
                <form>
                    <input type="email" placeholder="name@fromer.com" required />
                    <button type="submit">Enter your email</button>
                </form>
            </section>

            <section className={styles.faqSection}>
                <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                <p className={styles.sectionSubtitle}>Find answers to common questions about ObserverAI.</p>

                <div className={styles.faqContainer}>
                    <div className={styles.faqItem}>
                        <button className={styles.faqQuestion} aria-expanded="false">
                            <span className={styles.faqQuestionText}>How does the Observer AI work?</span>
                            <span className={styles.faqIcon}>+</span>
                        </button>
                        <div className={styles.faqAnswer}>
                            <p>Each AI Leader is a digital replica inspired by the wisdom and style of real spiritual
                                guides. They offer daily support, emotional insight, and personalized rituals — available
                                24/7. You can explore their depth of knowledge through themed conversations, reflections,
                                and responses tailored to your journey.</p>
                        </div>
                    </div>

                    <div className={styles.faqItem}>
                        <button className={styles.faqQuestion} aria-expanded="false">
                            <span className={styles.faqQuestionText}>Can I cancel my subscription anytime?</span>
                            <span className={styles.faqIcon}>+</span>
                        </button>
                        <div className={styles.faqAnswer}>
                            <p>Yes. You can cancel your subscription at any time. There are no long-term commitments, and
                                you'll retain access until the end of your billing cycle.</p>
                        </div>
                    </div>

                    <div className={styles.faqItem}>
                        <button className={styles.faqQuestion} aria-expanded="false">
                            <span className={styles.faqQuestionText}>What's included in each AI Leader package?</span>
                            <span className={styles.faqIcon}>+</span>
                        </button>
                        <div className={styles.faqAnswer}>
                            <p>Each AI Leader provides:</p>
                            <ul>
                                <li>Instant access to their wisdom archive and unique voice</li>
                                <li>Personalized answers to emotional, spiritual, and life questions</li>
                                <li>Monthly rituals, themed practices, or reflections</li>
                                <li>Evolving interactions shaped by your ongoing input</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.faqItem}>
                        <button className={styles.faqQuestion} aria-expanded="false">
                            <span className={styles.faqQuestionText}>How do I choose the right AI Leader for me?</span>
                            <span className={styles.faqIcon}>+</span>
                        </button>
                        <div className={styles.faqAnswer}>
                            <p>We recommend exploring our categories to find leaders that resonate with your interests and
                                needs. Each leader has a unique perspective and area of expertise. Pro subscribers can
                                switch between leaders to find their perfect match.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
