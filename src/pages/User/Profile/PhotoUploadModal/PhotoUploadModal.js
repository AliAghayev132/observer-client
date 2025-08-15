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
import { useState, useRef } from 'react';
import styles from './PhotoUploadModal.module.css';
export var PhotoUploadModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onUpload = _a.onUpload, onDelete = _a.onDelete, currentPhoto = _a.currentPhoto, _b = _a.isUploading, isUploading = _b === void 0 ? false : _b;
    var _c = useState(false), dragActive = _c[0], setDragActive = _c[1];
    var _d = useState(null), previewImage = _d[0], setPreviewImage = _d[1];
    var _e = useState(null), selectedFile = _e[0], setSelectedFile = _e[1];
    var fileInputRef = useRef(null);
    // File size limit: 2MB
    var MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
    if (!isOpen)
        return null;
    var formatFileSize = function (bytes) {
        if (bytes === 0)
            return '0 Bytes';
        var k = 1024;
        var sizes = ['Bytes', 'KB', 'MB', 'GB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    var handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    var handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };
    var handleFileSelect = function (file) {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPG, PNG, GIF)');
            return;
        }
        // Check file size (2MB limit)
        if (file.size > MAX_FILE_SIZE) {
            alert("File size must be less than 2MB. Your file is ".concat(formatFileSize(file.size)));
            return;
        }
        setSelectedFile(file);
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            setPreviewImage((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
        };
        reader.readAsDataURL(file);
    };
    var handleFileInputChange = function (e) {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };
    var handleUpload = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedFile) return [3 /*break*/, 2];
                    return [4 /*yield*/, onUpload(selectedFile)];
                case 1:
                    _a.sent();
                    handleClose();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!onDelete) return [3 /*break*/, 2];
                    return [4 /*yield*/, onDelete()];
                case 1:
                    _a.sent();
                    handleClose();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleClose = function () {
        setPreviewImage(null);
        setSelectedFile(null);
        setDragActive(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };
    var openFileDialog = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    return (_jsx("div", { className: styles.modalOverlay, onClick: handleClose, children: _jsxs("div", { className: styles.modalContent, onClick: function (e) { return e.stopPropagation(); }, children: [_jsxs("div", { className: styles.modalHeader, children: [_jsx("h2", { className: styles.modalTitle, children: "Update Profile Picture" }), _jsx("button", { className: styles.closeButton, onClick: handleClose, disabled: isUploading, children: "\u00D7" })] }), _jsxs("div", { className: styles.modalBody, children: [currentPhoto && !previewImage && (_jsxs("div", { className: styles.currentPhotoSection, children: [_jsx("h3", { className: styles.sectionTitle, children: "Current Photo" }), _jsx("div", { className: styles.currentPhotoContainer, children: _jsx("img", { src: currentPhoto, alt: "Current profile", className: styles.currentPhoto }) })] })), previewImage && (_jsxs("div", { className: styles.previewSection, children: [_jsx("h3", { className: styles.sectionTitle, children: "Preview" }), _jsxs("div", { className: styles.previewContainer, children: [_jsx("img", { src: previewImage, alt: "Preview", className: styles.previewImage }), selectedFile && (_jsxs("div", { className: styles.fileInfo, children: [_jsx("p", { className: styles.fileName, children: selectedFile.name }), _jsx("p", { className: styles.fileSize, children: formatFileSize(selectedFile.size) })] }))] })] })), _jsxs("div", { className: styles.uploadSection, children: [_jsx("h3", { className: styles.sectionTitle, children: previewImage ? 'Change Photo' : 'Upload New Photo' }), _jsx("div", { className: "".concat(styles.dropZone, " ").concat(dragActive ? styles.dragActive : ''), onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: openFileDialog, children: _jsxs("div", { className: styles.dropZoneContent, children: [_jsx("div", { className: styles.uploadIcon, children: "\uD83D\uDCF7" }), _jsxs("p", { className: styles.dropZoneText, children: ["Drag and drop your photo here, or ", _jsx("span", { className: styles.clickText, children: "click to browse" })] }), _jsx("p", { className: styles.dropZoneSubtext, children: "Supports: JPG, PNG, GIF (Max 2MB)" })] }) }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileInputChange, style: { display: 'none' } })] })] }), _jsx("div", { className: styles.modalFooter, children: _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { className: styles.cancelButton, onClick: handleClose, disabled: isUploading, children: "Cancel" }), currentPhoto && onDelete && (_jsx("button", { className: styles.deleteButton, onClick: handleDelete, disabled: isUploading, children: isUploading ? 'Deleting...' : 'Remove Photo' })), selectedFile && (_jsx("button", { className: styles.uploadButton, onClick: handleUpload, disabled: isUploading, children: isUploading ? 'Uploading...' : 'Upload Photo' }))] }) })] }) }));
};
