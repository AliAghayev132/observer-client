import React, { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import {
    useGetUserQuery,
    useUpdateProfilePictureMutation,
    useDeleteProfilePictureMutation
} from '@/redux/user/account/userAccountApi';
import { PhotoUploadModal } from './PhotoUploadModal/PhotoUploadModal';
import styles from './ProfilePage.module.css';
import Swal from 'sweetalert2';
import { getUserProfilePictureUrl } from '@/utils/imageHandler';

export const ProfilePage: React.FC = () => {
    const user = useUser();
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    const { isLoading } = useGetUserQuery(undefined);
    const [updateProfilePicture, { isLoading: isUploading }] = useUpdateProfilePictureMutation();
    const [deleteProfilePicture] = useDeleteProfilePictureMutation();

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            await updateProfilePicture(formData).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Profile picture updated successfully!',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.data?.messages || 'Failed to update profile picture'
            });
        }
    };

    const handleDeletePhoto = async () => {
        try {
            await deleteProfilePicture(undefined).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Profile picture removed successfully!',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.data?.messages || 'Failed to remove profile picture'
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getFullName = () => {
        if (!user) return 'Loading...';
        return `${user.firstName} ${user.secondName}`;
    };

    const getProfileImageSrc = () => {
        return getUserProfilePictureUrl(user?.profilePicture);
    };

    const hasProfilePicture = () => {
        return user?.profilePicture && user.profilePicture !== 'no-image';
    };

    const getInitials = () => {
        if (!user) return 'U';
        const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
        const secondInitial = user.secondName?.charAt(0)?.toUpperCase() || '';
        return firstInitial + secondInitial || 'U';
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading profile...</div>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.page__title}>Your Profile</h1>

                <div className={styles.profile__container}>
                    <div className={styles.profile__sidebar}>
                        <div className={styles.profile__image__container}>
                            {hasProfilePicture() ? (
                                <img
                                    src={getProfileImageSrc()}
                                    alt="User Profile"
                                    className={styles.profile__image}
                                    onError={(e) => {
                                        // Fallback to no-image if image fails to load
                                        e.currentTarget.style.display = 'none';
                                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                        if (placeholder) {
                                            placeholder.style.display = 'flex';
                                        }
                                    }}
                                />
                            ) : null}

                            {!hasProfilePicture() && (
                                <div className={styles.profile__image__placeholder}>
                                    <span className={styles.profile__initials}>
                                        {getInitials()}
                                    </span>
                                </div>
                            )}

                            {/* Hidden placeholder for error fallback */}
                            {hasProfilePicture() && (
                                <div
                                    className={styles.profile__image__placeholder}
                                    style={{ display: 'none' }}
                                >
                                    <span className={styles.profile__initials}>
                                        {getInitials()}
                                    </span>
                                </div>
                            )}

                            <div className={styles.profile__image__overlay}>
                                <button
                                    className={styles.change__photo__btn}
                                    onClick={() => setShowPhotoModal(true)}
                                >
                                    {hasProfilePicture() ? 'Change Photo' : 'Add Photo'}
                                </button>
                            </div>
                        </div>

                        <div className={styles.profile__stats}>
                            <div className={styles.stat__item}>
                                <span className={styles.stat__value}>5</span>
                                <span className={styles.stat__label}>AI Chats</span>
                            </div>
                            <div className={styles.stat__item}>
                                <span className={styles.stat__value}>3</span>
                                <span className={styles.stat__label}>Favorites</span>
                            </div>
                            <div className={styles.stat__item}>
                                <span className={styles.stat__value}>12</span>
                                <span className={styles.stat__label}>Days Active</span>
                            </div>
                        </div>

                        <div className={styles.profile__subscription}>
                            <div className={`${styles.subscription__badge} ${styles.basic}`}>
                                Basic Plan
                            </div>
                            <a href="/subscribe" className={styles.upgrade__button}>
                                Upgrade to Pro
                            </a>
                        </div>
                    </div>

                    <div className={styles.profile__content}>
                        <div className={styles.profile__section}>
                            <h2 className={styles.section__title}>Personal Information</h2>
                            <div className={styles.profile__info}>
                                <div className={styles.info__group}>
                                    <label className={styles.info__label}>Name</label>
                                    <div className={styles.info__value}>{getFullName()}</div>
                                </div>
                                <div className={styles.info__group}>
                                    <label className={styles.info__label}>Birth Date</label>
                                    <div className={styles.info__value}>
                                        {user?.birthDate ? formatDate(user.birthDate) : 'Not provided'}
                                    </div>
                                </div>
                                <div className={styles.info__group}>
                                    <label className={styles.info__label}>Gender</label>
                                    <div className={styles.info__value}>
                                        {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not provided'}
                                    </div>
                                </div>
                                <div className={styles.info__group}>
                                    <label className={styles.info__label}>Email</label>
                                    <div className={styles.info__value}>{user?.email || 'Not provided'}</div>
                                </div>
                            </div>
                            <button className={styles.edit__button}>Edit Information</button>
                        </div>

                        <div className={styles.profile__section}>
                            <h2 className={styles.section__title}>Subscription Details</h2>
                            <div className={styles.profile__info}>
                                <div className={styles.info__group}>
                                    <label className={styles.info__label}>Current Plan</label>
                                    <div className={styles.info__value}>Basic</div>
                                </div>
                                <div className={styles.info__group}>
                                    <label className={styles.info__label}>Billing Cycle</label>
                                    <div className={styles.info__value}>Monthly</div>
                                </div>
                                <div className={styles.info__group}>
                                    <label className={styles.info__label}>Next Billing Date</label>
                                    <div className={styles.info__value}>August 15, 2025</div>
                                </div>
                                <div className={styles.info__group}>
                                    <label className={styles.info__label}>Daily Questions</label>
                                    <div className={styles.info__value}>5 questions per day</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.profile__section}>
                            <h2 className={styles.section__title}>Account Management</h2>
                            <div className={styles.account__actions}>
                                <button className={`${styles.action__button} ${styles.change__password}`}>
                                    Change Password
                                </button>
                                <button className={`${styles.action__button} ${styles.delete__account}`}>
                                    Delete My Account
                                </button>
                                <button
                                    className={`${styles.action__button} ${styles.talk__leaders}`}
                                    onClick={() => window.location.href = '/leaderchat'}
                                >
                                    Talk to Leaders
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PhotoUploadModal
                isOpen={showPhotoModal}
                onClose={() => setShowPhotoModal(false)}
                onUpload={handleImageUpload}
                onDelete={hasProfilePicture() ? handleDeletePhoto : undefined}
                currentPhoto={hasProfilePicture() ? getProfileImageSrc() : undefined}
                isUploading={isUploading}
            />
        </main>
    );
};
