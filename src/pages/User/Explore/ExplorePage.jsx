// React
import React from 'react';
// Utils
import { getLeaderImage } from '@/utils/imageHandler';
// Components
import { FeaturedCategories } from '../Home/FeaturedCategories/FeaturedCategories';
// RTK
import { useGetLeadersQuery } from '@/redux/misc/miscApi';
// Motion
import { motion, cubicBezier } from 'framer-motion';

export const ExplorePage = () => {
    const { data: leadersData, isLoading: leadersLoading } = useGetLeadersQuery(undefined);

    const ease = cubicBezier(0.16, 1, 0.3, 1);
    const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
    const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

    // Safe console.log - sadece data varsa ve success ise log et
    if (leadersData?.success && leadersData?.data?.length > 0) {
        console.log(leadersData.data[0]);
    }

    return (
        <div className="px-4 pt-10">
            <motion.h1
                className="mx-auto mt-2 max-w-5xl text-center text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
            >
                Explore
            </motion.h1>

            {/* Categories Section */}
            <FeaturedCategories />

            {/* Leaders Section */}
            <section className="mx-auto mt-16 max-w-6xl">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center"
                >
                    <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold">Featured Leaders</motion.h2>
                    <motion.p variants={fadeUp} className="mt-2 text-[#b3a77a]">Connect with AI wisdom guides across various disciplines.</motion.p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {leadersLoading ? (
                        <div className="col-span-full py-10 text-[#9CA982]">Loading leaders...</div>
                    ) : leadersData?.success && leadersData?.data?.length > 0 ? (
                        leadersData.data.map((leader) => (
                            <motion.div
                                key={leader._id}
                                variants={fadeUp}
                                className="group rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <motion.img
                                    src={getLeaderImage(leader.image)}
                                    alt={leader.name || leader.fullName}
                                    className="h-56 w-full rounded-lg object-cover"
                                    initial={{ scale: 1.03, opacity: 0.9 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, ease }}
                                />
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold text-neutral-900 transition group-hover:text-[#9CA982]">
                                        {leader.fullName || `${leader.firstName} ${leader.lastName}`}
                                    </h3>
                                    <p className="mt-0.5 text-sm text-[#9CA982]">
                                        {leader.category?.name || 'General'}
                                    </p>
                                    <p className="mt-1 text-sm text-neutral-600">
                                        {leader.description || 'AI wisdom guide ready to help you on your journey.'}
                                    </p>
                                </div>
                                <a href={`/leader/${leader._id}`} className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#9CA982] to-[#1a1a1a] px-4 py-2 text-white shadow transition hover:-translate-y-0.5">
                                    Connect
                                </a>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-neutral-500">No leaders available at the moment.</div>
                    )}
                </motion.div>
            </section>
        </div>
    );
}
