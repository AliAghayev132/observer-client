// Components
import { getCategoryImageUrl } from "@/utils/imageHandler";
// API
import { useGetCategoriesQuery } from "@/redux/misc/miscApi";
// Images
import CategoryImage from "@/assets/images/Featured Categories 2.png";
// Styles
import styles from "./FeaturedCategories.module.css";

export const FeaturedCategories = () => {
    const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery(undefined);

    return (
        <section className={styles.categories} id="categories">
            <h2>Featured Categories</h2>
            <p className={styles.subtitle}>Explore Your Needs.</p>

            {categoriesLoading && (
                <div className={styles.loading}>Loading categories...</div>
            )}

            {categoriesError && (
                <div className={styles.error}>Failed to load categories</div>
            )}

            {categoriesData?.success && (
                <div className={styles.categoryGrid}>
                    {categoriesData.data.map((category) => (
                        <div key={category._id} className={styles.categoryCard}>
                            <img
                                src={getCategoryImageUrl(category.image)}
                                alt={category.name}
                            />
                            <h3>{category.name}</h3>
                            <p className={styles.categoryDesc}>
                                {category.description || "Explore this category to discover new insights and wisdom."}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Fallback - Static categories if API fails or no data */}
            {!categoriesLoading && !categoriesData?.success && (
                <div className={styles.categoryGrid}>
                    <div className={styles.categoryCard}>
                        <img src={CategoryImage} alt="Spiritual & Esoteric Practices" />
                        <h3>Spiritual & Esoteric Practices.</h3>
                        <p className={styles.categoryDesc}>
                            <strong>Astrology, Tarot Reading, Esotericism, and Spiritual Counseling</strong> invite you to
                            deepen your spiritual awareness and awaken intuition through ancient tools and sacred guidance.
                        </p>
                    </div>
                    <div className={styles.categoryCard}>
                        <img src={CategoryImage} alt="Mindfulness & Psychology" />
                        <h3>Mindfulness & Psychology.</h3>
                        <p className={styles.categoryDesc}>
                            <strong>Mindfulness, Psychology, Somatic Awareness, and Art Therapy</strong> offer space to
                            soften the mind, meet your emotions, and reconnect with embodied presence.
                        </p>
                    </div>
                    <div className={styles.categoryCard}>
                        <img src={CategoryImage} alt="Body & Movement Healing" />
                        <h3>Body & Movement Healing.</h3>
                        <p className={styles.categoryDesc}>
                            <strong>Yoga, Pilates, Personal Training, and Holistic Wellness</strong> guide you to ground in
                            your body and awaken your natural flow of vitality.
                        </p>
                    </div>
                    <div className={styles.categoryCard}>
                        <img src={CategoryImage} alt="Coaching & Personal Growth" />
                        <h3>Coaching & Personal Growth.</h3>
                        <p className={styles.categoryDesc}>
                            <strong>Life Coaching, Motivational Speaking, and Public Speaking</strong> help you align with
                            your inner compass and move forward with clarity and confidence.
                        </p>
                    </div>
                    <div className={styles.categoryCard}>
                        <img src={CategoryImage} alt="Creative Ritual Arts" />
                        <h3>Creative Ritual Arts.</h3>
                        <p className={styles.categoryDesc}>
                            <strong>Spiritual Art, Movement Arts, and Art Therapy</strong> invite you to express the soul
                            through ritual, creativity, and embodied storytelling.
                        </p>
                    </div>
                    <div className={styles.categoryCard}>
                        <img src={CategoryImage} alt="Earth Skills & Ancestral Wisdom" />
                        <h3>Earth Skills & Ancestral Wisdom.</h3>
                        <p className={styles.categoryDesc}>
                            <strong>Outdoor Skills, Survival Practices, and Ancient Beauty</strong> reconnect you with the
                            Earth's wisdom and ancestral ways of living in harmony.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};
