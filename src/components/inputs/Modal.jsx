function Modal({ open, onClose, children }) {
  return (
    <>
      {open && (
        <div //this dive is for the outside of the modal, i.e the background when the modal is open
          onClick={onClose} //this helps
          className="fixed inset-0 flex justify-center items-center bg-black/20"
        >
          <div
            onClick={(e) => e.stopPropagation()} //I added this because when clicking the inside of the opened modal, the modal closed, this fixes that bug
            className="bg-green-50 rounded-xl shadow-2xl p-4 md:w-2/4 md:h-2/4 w-3/4 h-3/4 overflow-y-auto scale-100 opacity-100"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-1 rounded-lg text-slate-600 bg-green-200 hover:bg-green-400 hover:text-slate-800 hover:animate-bounce"
            >
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
