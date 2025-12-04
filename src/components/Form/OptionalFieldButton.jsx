const OptionalFieldButton = ({ 
  section, 
  field, 
  label, 
  isActive, 
  onToggle 
}) => {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
        ${isActive 
          ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100' 
          : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
        }
      `}
    >
      {isActive ? (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{label}</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default OptionalFieldButton;