export default function ErrorPopupModal({ show, errors, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-neutral-900 p-6 rounded-xl shadow-xl border border-neutral-700 max-w-md w-full">
        <h2 className="text-lg font-semibold text-white mb-4">
          Code Validation Errors
        </h2>

        {errors?.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-auto pr-2">
            {errors.map((err, i) => (
              <div
                key={i}
                className="bg-red-600/20 border border-red-600 text-red-400 px-3 py-2 rounded text-sm"
              >
                <strong>Line {err.line}:</strong> {err.message}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-green-400 text-sm">No errors found.</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
