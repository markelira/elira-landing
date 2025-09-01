'use client'

export default function InstructorContentPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          Tartalom Szerkesztés
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Itt szerkesztheti kurzusai tartalmát, leckéit és anyagait.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✏️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tartalom szerkesztő hamarosan elérhető
          </h3>
          <p className="text-gray-500">
            Ez a funkció fejlesztés alatt áll.
          </p>
        </div>
      </div>
    </div>
  )
}