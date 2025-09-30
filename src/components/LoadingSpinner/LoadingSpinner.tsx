// Components/LoadingSpinner/LoadingSpinner.jsx

export const LoadingSpinner = ({
    text,
    overlay = true
}) => {

    const SpinnerContent = () => (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#e0dac3] relative overflow-hidden">
        {/* Soft background blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
  
        <div className="relative flex flex-col items-center">
          {/* Spinning ring */}
          <div className="relative">
            <div className="h-28 w-28 rounded-full border-4 border-[#3966b0]/20 border-t-black animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="font-bold">Observer</h1>
            </div>
          </div>
  
          <div className="mt-6 text-center">
            {text.trim().length > 0 && <p className="text-sm font-medium text-gray-700">{text}</p>}
            <p className="text-xs text-gray-500 mt-1 animate-pulse">Please wait</p>
          </div>
        </div>
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
