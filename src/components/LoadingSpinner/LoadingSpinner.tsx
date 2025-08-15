// Components/LoadingSpinner/LoadingSpinner.jsx

export const LoadingSpinner = ({
    size = 'large',
    text = 'Loading...',
    overlay = true
}) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10',
        large: 'w-16 h-16',
        xlarge: 'w-24 h-24'
    };

    const SpinnerContent = () => (
        <div className="flex flex-col items-center justify-center space-y-4">
            {/* Spinner */}
            <div className={`${sizeClasses[size]} animate-spin`}>
                <svg
                    className="w-full h-full text-primary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>

            {/* Loading Text */}
            {text && (
                <p className="text-gray-600 font-medium text-lg animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    if (!overlay) {
        return <SpinnerContent />;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
            <SpinnerContent />
        </div>
    );
};

// Alternative with dots animation
export const LoadingDots = ({ text = 'Loading' }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-gray-600 font-medium text-lg">
                    {text}
                </p>
            </div>
        </div>
    );
};

// Pulse animation variant
export const LoadingPulse = ({ text = 'Loading...' }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full animate-pulse"></div>
                <p className="text-gray-600 font-medium text-lg animate-pulse">
                    {text}
                </p>
            </div>
        </div>
    );
};
