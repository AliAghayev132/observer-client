var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useGetUserQuery, useUpdateProfilePictureMutation, useDeleteProfilePictureMutation } from '@/redux/user/account/userAccountApi';
import { PhotoUploadModal } from './PhotoUploadModal/PhotoUploadModal';
import styles from './ProfilePage.module.css';
import Swal from 'sweetalert2';
import { getUserProfilePictureUrl } from '@/utils/imageHandler';
export var ProfilePage = function () {
    var user = useUser();
    var _a = useState(false), showPhotoModal = _a[0], setShowPhotoModal = _a[1];
    var isLoading = useGetUserQuery(undefined).isLoading;
    var _b = useUpdateProfilePictureMutation(), updateProfilePicture = _b[0], isUploading = _b[1].isLoading;
    var deleteProfilePicture = useDeleteProfilePictureMutation()[0];
    var handleImageUpload = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    formData = new FormData();
                    formData.append('image', file);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, updateProfilePicture(formData).unwrap()];
                case 2:
                    _b.sent();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Profile picture updated successfully!',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.data) === null || _a === void 0 ? void 0 : _a.messages) || 'Failed to update profile picture'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDeletePhoto = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, deleteProfilePicture(undefined).unwrap()];
                case 1:
                    _b.sent();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Profile picture removed successfully!',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: ((_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.data) === null || _a === void 0 ? void 0 : _a.messages) || 'Failed to remove profile picture'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var formatDate = function (dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    var getFullName = function () {
        if (!user)
            return 'Loading...';
        return "".concat(user.firstName, " ").concat(user.secondName);
    };
    var getProfileImageSrc = function () {
        return getUserProfilePictureUrl(user === null || user === void 0 ? void 0 : user.profilePicture);
    };
    var hasProfilePicture = function () {
        return (user === null || user === void 0 ? void 0 : user.profilePicture) && user.profilePicture !== 'no-image';
    };
    var getInitials = function () {
        var _a, _b, _c, _d;
        if (!user)
            return 'U';
        var firstInitial = ((_b = (_a = user.firstName) === null || _a === void 0 ? void 0 : _a.charAt(0)) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || '';
        var secondInitial = ((_d = (_c = user.secondName) === null || _c === void 0 ? void 0 : _c.charAt(0)) === null || _d === void 0 ? void 0 : _d.toUpperCase()) || '';
        return firstInitial + secondInitial || 'U';
    };
    if (isLoading) {
        return _jsx("div", { className: styles.loading, children: "Loading profile..." });
    }
    return (_jsxs("main", { className: styles.main, children: [_jsxs("div", { className: styles.container, children: [_jsx("h1", { className: styles.page__title, children: "Your Profile" }), _jsxs("div", { className: styles.profile__container, children: [_jsxs("div", { className: styles.profile__sidebar, children: [_jsxs("div", { className: styles.profile__image__container, children: [hasProfilePicture() ? (_jsx("img", { src: getProfileImageSrc(), alt: "User Profile", className: styles.profile__image, onError: function (e) {
                                                    // Fallback to no-image if image fails to load
                                                    e.currentTarget.style.display = 'none';
                                                    var placeholder = e.currentTarget.nextElementSibling;
                                                    if (placeholder) {
                                                        placeholder.style.display = 'flex';
                                                    }
                                                } })) : null, !hasProfilePicture() && (_jsx("div", { className: styles.profile__image__placeholder, children: _jsx("span", { className: styles.profile__initials, children: getInitials() }) })), hasProfilePicture() && (_jsx("div", { className: styles.profile__image__placeholder, style: { display: 'none' }, children: _jsx("span", { className: styles.profile__initials, children: getInitials() }) })), _jsx("div", { className: styles.profile__image__overlay, children: _jsx("button", { className: styles.change__photo__btn, onClick: function () { return setShowPhotoModal(true); }, children: hasProfilePicture() ? 'Change Photo' : 'Add Photo' }) })] }), _jsxs("div", { className: styles.profile__stats, children: [_jsxs("div", { className: styles.stat__item, children: [_jsx("span", { className: styles.stat__value, children: "5" }), _jsx("span", { className: styles.stat__label, children: "AI Chats" })] }), _jsxs("div", { className: styles.stat__item, children: [_jsx("span", { className: styles.stat__value, children: "3" }), _jsx("span", { className: styles.stat__label, children: "Favorites" })] }), _jsxs("div", { className: styles.stat__item, children: [_jsx("span", { className: styles.stat__value, children: "12" }), _jsx("span", { className: styles.stat__label, children: "Days Active" })] })] }), _jsxs("div", { className: styles.profile__subscription, children: [_jsx("div", { className: "".concat(styles.subscription__badge, " ").concat(styles.basic), children: "Basic Plan" }), _jsx("a", { href: "/subscribe", className: styles.upgrade__button, children: "Upgrade to Pro" })] })] }), _jsxs("div", { className: styles.profile__content, children: [_jsxs("div", { className: styles.profile__section, children: [_jsx("h2", { className: styles.section__title, children: "Personal Information" }), _jsxs("div", { className: styles.profile__info, children: [_jsxs("div", { className: styles.info__group, children: [_jsx("label", { className: styles.info__label, children: "Name" }), _jsx("div", { className: styles.info__value, children: getFullName() })] }), _jsxs("div", { className: styles.info__group, children: [_jsx("label", { className: styles.info__label, children: "Birth Date" }), _jsx("div", { className: styles.info__value, children: (user === null || user === void 0 ? void 0 : user.birthDate) ? formatDate(user.birthDate) : 'Not provided' })] }), _jsxs("div", { className: styles.info__group, children: [_jsx("label", { className: styles.info__label, children: "Gender" }), _jsx("div", { className: styles.info__value, children: (user === null || user === void 0 ? void 0 : user.gender) ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not provided' })] }), _jsxs("div", { className: styles.info__group, children: [_jsx("label", { className: styles.info__label, children: "Email" }), _jsx("div", { className: styles.info__value, children: (user === null || user === void 0 ? void 0 : user.email) || 'Not provided' })] })] }), _jsx("button", { className: styles.edit__button, children: "Edit Information" })] }), _jsxs("div", { className: styles.profile__section, children: [_jsx("h2", { className: styles.section__title, children: "Subscription Details" }), _jsxs("div", { className: styles.profile__info, children: [_jsxs("div", { className: styles.info__group, children: [_jsx("label", { className: styles.info__label, children: "Current Plan" }), _jsx("div", { className: styles.info__value, children: "Basic" })] }), _jsxs("div", { className: styles.info__group, children: [_jsx("label", { className: styles.info__label, children: "Billing Cycle" }), _jsx("div", { className: styles.info__value, children: "Monthly" })] }), _jsxs("div", { className: styles.info__group, children: [_jsx("label", { className: styles.info__label, children: "Next Billing Date" }), _jsx("div", { className: styles.info__value, children: "August 15, 2025" })] }), _jsxs("div", { className: styles.info__group, children: [_jsx("label", { className: styles.info__label, children: "Daily Questions" }), _jsx("div", { className: styles.info__value, children: "5 questions per day" })] })] })] }), _jsxs("div", { className: styles.profile__section, children: [_jsx("h2", { className: styles.section__title, children: "Account Management" }), _jsxs("div", { className: styles.account__actions, children: [_jsx("button", { className: "".concat(styles.action__button, " ").concat(styles.change__password), children: "Change Password" }), _jsx("button", { className: "".concat(styles.action__button, " ").concat(styles.delete__account), children: "Delete My Account" }), _jsx("button", { className: "".concat(styles.action__button, " ").concat(styles.talk__leaders), onClick: function () { return window.location.href = '/leaderchat'; }, children: "Talk to Leaders" })] })] })] })] })] }), _jsx(PhotoUploadModal, { isOpen: showPhotoModal, onClose: function () { return setShowPhotoModal(false); }, onUpload: handleImageUpload, onDelete: hasProfilePicture() ? handleDeletePhoto : undefined, currentPhoto: hasProfilePicture() ? getProfileImageSrc() : undefined, isUploading: isUploading })] }));
};
