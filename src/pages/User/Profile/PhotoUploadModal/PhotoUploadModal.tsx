import React, { useState, useRef } from 'react';
import styles from './PhotoUploadModal.module.css';

interface PhotoUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => Promise<void>;
    onDelete?: () => Promise<void>;
    currentPhoto?: string;
    isUploading?: boolean;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
    isOpen,
    onClose,
    onUpload,
    onDelete,
    currentPhoto,
    isUploading = false
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // File size limit: 2MB
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

    if (!isOpen) return null;

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (file: File) => {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPG, PNG, GIF)');
            return;
        }

        // Check file size (2MB limit)
        if (file.size > MAX_FILE_SIZE) {
            alert(`File size must be less than 2MB. Your file is ${formatFileSize(file.size)}`);
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            await onUpload(selectedFile);
            handleClose();
        }
    };

    const handleDelete = async () => {
        if (onDelete) {
            await onDelete();
            handleClose();
        }
    };

    const handleClose = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        setDragActive(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Update Profile Picture</h2>
                    <button
                        className={styles.closeButton}
                        onClick={handleClose}
                        disabled={isUploading}
                    >
                        ×
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {/* Current Photo Section */}
                    {currentPhoto && !previewImage && (
                        <div className={styles.currentPhotoSection}>
                            <h3 className={styles.sectionTitle}>Current Photo</h3>
                            <div className={styles.currentPhotoContainer}>
                                <img
                                    src={currentPhoto}
                                    alt="Current profile"
                                    className={styles.currentPhoto}
                                />
                            </div>
                        </div>
                    )}

                    {/* Preview Section */}
                    {previewImage && (
                        <div className={styles.previewSection}>
                            <h3 className={styles.sectionTitle}>Preview</h3>
                            <div className={styles.previewContainer}>
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className={styles.previewImage}
                                />
                                {selectedFile && (
                                    <div className={styles.fileInfo}>
                                        <p className={styles.fileName}>{selectedFile.name}</p>
                                        <p className={styles.fileSize}>{formatFileSize(selectedFile.size)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Upload Section */}
                    <div className={styles.uploadSection}>
                        <h3 className={styles.sectionTitle}>
                            {previewImage ? 'Change Photo' : 'Upload New Photo'}
                        </h3>

                        <div
                            className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={openFileDialog}
                        >
                            <div className={styles.dropZoneContent}>
                                <div className={styles.uploadIcon}>📷</div>
                                <p className={styles.dropZoneText}>
                                    Drag and drop your photo here, or <span className={styles.clickText}>click to browse</span>
                                </p>
                                <p className={styles.dropZoneSubtext}>
                                    Supports: JPG, PNG, GIF (Max 2MB)
                                </p>
                            </div>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <div className={styles.buttonGroup}>
                        <button
                            className={styles.cancelButton}
                            onClick={handleClose}
                            disabled={isUploading}
                        >
                            Cancel
                        </button>

                        {currentPhoto && onDelete && (
                            <button
                                className={styles.deleteButton}
                                onClick={handleDelete}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Deleting...' : 'Remove Photo'}
                            </button>
                        )}

                        {selectedFile && (
                            <button
                                className={styles.uploadButton}
                                onClick={handleUpload}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Uploading...' : 'Upload Photo'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
