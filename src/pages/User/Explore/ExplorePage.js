import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Styles
import styles from './ExplorePage.module.css';
// Utils
import { getLeaderImage } from '@/utils/imageHandler';
// Components
import { FeaturedCategories } from '../Home/FeaturedCategories/FeaturedCategories';
// RTK
import { useGetLeadersQuery } from '@/redux/misc/miscApi';
export var ExplorePage = function () {
    var _a, _b;
    var _c = useGetLeadersQuery(undefined), leadersData = _c.data, leadersLoading = _c.isLoading;
    // Safe console.log - sadece data varsa ve success ise log et
    if ((leadersData === null || leadersData === void 0 ? void 0 : leadersData.success) && ((_a = leadersData === null || leadersData === void 0 ? void 0 : leadersData.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        console.log(leadersData.data[0]);
    }
    return (_jsxs("div", { className: styles.explorePage, children: [_jsx("h1", { className: styles.exploreTitle, children: "Explore" }), _jsx(FeaturedCategories, {}), _jsxs("section", { className: styles.leadersSection, children: [_jsx("h2", { className: styles.sectionTitle, children: "Featured Leaders" }), _jsx("p", { className: styles.sectionSubtitle, children: "Connect with AI wisdom guides across various disciplines." }), _jsx("div", { className: styles.leadersGrid, children: leadersLoading ? (_jsx("div", { className: styles.loading, children: "Loading leaders..." })) : (leadersData === null || leadersData === void 0 ? void 0 : leadersData.success) && ((_b = leadersData === null || leadersData === void 0 ? void 0 : leadersData.data) === null || _b === void 0 ? void 0 : _b.length) > 0 ? (leadersData.data.map(function (leader) {
                            var _a;
                            return (_jsxs("div", { className: styles.leaderCard, children: [_jsx("img", { src: getLeaderImage(leader.image), alt: leader.name || leader.fullName, className: styles.leaderImg }), _jsxs("div", { className: styles.leaderInfo, children: [_jsx("h3", { className: styles.leaderName, children: leader.fullName || "".concat(leader.firstName, " ").concat(leader.lastName) }), _jsx("p", { className: styles.leaderTags, children: ((_a = leader.category) === null || _a === void 0 ? void 0 : _a.name) || 'General' }), _jsx("p", { className: styles.leaderDesc, children: leader.description || 'AI wisdom guide ready to help you on your journey.' })] }), _jsx("a", { href: "/leader/".concat(leader._id), className: styles.leaderButton, children: "Connect" })] }, leader._id));
                        })) : (_jsx("div", { className: styles.noData, children: "No leaders available at the moment." })) })] })] }));
};
