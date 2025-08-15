// Components
import { getCategoryImageUrl } from "@/utils/imageHandler";
// API
import { useGetCategoriesQuery } from "@/redux/misc/miscApi";
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
        </section>
    );
};
