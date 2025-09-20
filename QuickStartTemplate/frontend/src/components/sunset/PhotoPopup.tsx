import React from 'react'

interface PhotoMarker {
  id: string
  coordinates: [number, number]
  ipfsHash: string
  name: string
  timestamp: string
}

interface PhotoModalProps {
  isOpen: boolean
  photo: PhotoMarker | null
  onClose: () => void
}

const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, photo, onClose }) => {
  if (!isOpen || !photo) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm pt-32" role="dialog" aria-modal="true">
      <div className="relative max-w-2xl max-h-[90vh] bg-gradient-to-br from-yellow-400/90 via-orange-500/90 to-pink-500/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/30 mb-20 mx-4">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full text-white flex items-center justify-center transition-colors"
          onClick={onClose}
          aria-label="Close photo"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col">
          {/* Photo */}
          <div className="flex items-center justify-center p-2 sm:p-6">
            <img
              src={`https://tan-mad-gorilla-689.mypinata.cloud/ipfs/${photo.ipfsHash}`}
              alt={photo.name}
              className="max-w-full max-h-[70vh] sm:max-h-[50vh] object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Info panel */}
          <div className="px-3 sm:px-6 pb-3 sm:pb-6 text-white">
            <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-center">{photo.name}</h3>

            {/* Location and Timestamp - Responsive layout */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 sm:mb-6">
              {/* Geolocation */}
              <div className="flex-1">
                <h4 className="text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-wide mb-0 sm:mb-2">Location</h4>
                <div className="text-sm sm:text-lg">
                  <div className="font-mono sm:bg-white/10 sm:rounded-lg p-2 sm:p-3 sm:backdrop-blur-sm text-center min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center">
                    {photo.coordinates[1].toFixed(6).replace('.', ',')}, {photo.coordinates[0].toFixed(6).replace('.', ',')}
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex-1">
                <h4 className="text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-wide mb-0 sm:mb-2">Uploaded on</h4>
                <div className="text-sm sm:text-lg sm:bg-white/10 sm:rounded-lg p-2 sm:p-3 sm:backdrop-blur-sm text-center min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center">
                  {new Date(photo.timestamp).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-center">
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
                onClick={onClose}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoModal
