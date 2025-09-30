// Components
import { getCategoryImageUrl } from "@/utils/imageHandler";
// API
import { useGetCategoriesQuery } from "@/redux/misc/miscApi";

export const FeaturedCategories = () => {
    const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery(undefined);

    return (
        <section id="categories" className="mx-auto mt-16 max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold">Featured Categories</h2>
            <p className="mt-2 text-[#b3a77a]">Explore Your Needs.</p>

            {categoriesLoading && (
                <div className="py-10 text-[#9CA982]">Loading categories...</div>
            )}

            {categoriesError && (
                <div className="py-10 text-red-500">Failed to load categories</div>
            )}

            {categoriesData?.success && (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoriesData.data.map((category) => (
                        <div key={category._id} className="group rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                            <img src={getCategoryImageUrl(category.image)} alt={category.name} className="h-44 w-full rounded-lg object-cover transition group-hover:scale-[1.02]" />
                            <h3 className="mt-4 text-lg font-bold text-neutral-900 transition group-hover:text-[#9CA982]">{category.name}</h3>
                            <p className="mt-1 text-sm text-neutral-600">
                                {category.description || "Explore this category to discover new insights and wisdom."}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
