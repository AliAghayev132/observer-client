// React
import React from 'react';
// Styles
import styles from './ExplorePage.module.css';
// Utils
import { getLeaderImage } from '@/utils/imageHandler';
// Components
import { FeaturedCategories } from '../Home/FeaturedCategories/FeaturedCategories';
// RTK
import { useGetLeadersQuery } from '@/redux/misc/miscApi';

export const ExplorePage = () => {
    const { data: leadersData, isLoading: leadersLoading } = useGetLeadersQuery(undefined);

    // Safe console.log - sadece data varsa ve success ise log et
    if (leadersData?.success && leadersData?.data?.length > 0) {
        console.log(leadersData.data[0]);
    }

    return (
        <div className={styles.explorePage}>
            <h1 className={styles.exploreTitle}>Explore</h1>

            {/* Categories Section */}
            <FeaturedCategories />

            {/* Leaders Section */}
            <section className={styles.leadersSection}>
                <h2 className={styles.sectionTitle}>Featured Leaders</h2>
                <p className={styles.sectionSubtitle}>Connect with AI wisdom guides across various disciplines.</p>

                <div className={styles.leadersGrid}>
                    {leadersLoading ? (
                        <div className={styles.loading}>Loading leaders...</div>
                    ) : leadersData?.success && leadersData?.data?.length > 0 ? (
                        leadersData.data.map((leader) => (
                            <div key={leader._id} className={styles.leaderCard}>
                                <img
                                    src={getLeaderImage(leader.image)}
                                    alt={leader.name || leader.fullName}
                                    className={styles.leaderImg}
                                />
                                <div className={styles.leaderInfo}>
                                    <h3 className={styles.leaderName}>
                                        {leader.fullName || `${leader.firstName} ${leader.lastName}`}
                                    </h3>
                                    <p className={styles.leaderTags}>
                                        {leader.category?.name || 'General'}
                                    </p>
                                    <p className={styles.leaderDesc}>
                                        {leader.description || 'AI wisdom guide ready to help you on your journey.'}
                                    </p>
                                </div>
                                <a href={`/leader/${leader._id}`} className={styles.leaderButton}>
                                    Connect
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noData}>No leaders available at the moment.</div>
                    )}
                </div>
            </section>
        </div>
    );
};
