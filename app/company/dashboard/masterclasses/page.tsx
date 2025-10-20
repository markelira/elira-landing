'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CompanyMasterclass {
  id: string;
  masterclassId: string;
  title: string;
  duration: number;
  seats: {
    purchased: number;
    used: number;
    available: number;
  };
  pricePerSeat: number;
  totalPaid: number;
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'active' | 'completed';
}

interface CompanyEmployee {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  jobTitle?: string;
  status: 'invited' | 'active' | 'left';
  enrolledMasterclasses?: { masterclassId: string }[];
}

interface Company {
  id: string;
  name: string;
  billingEmail: string;
  plan: string;
  status: string;
}

interface EnrollEmployeesResponse {
  success: boolean;
  enrolledCount: number;
  enrolledEmployees: string[];
  skipped: number;
}

export default function MasterclassesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [company, setCompany] = useState<Company | null>(null);
  const [masterclasses, setMasterclasses] = useState<CompanyMasterclass[]>([]);
  const [employees, setEmployees] = useState<CompanyEmployee[]>([]);

  // Assignment modal state
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMasterclass, setSelectedMasterclass] = useState<CompanyMasterclass | null>(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [assigning, setAssigning] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth?redirect=/company/dashboard/masterclasses');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const db = getFirestore();

      // Find company where user is admin
      const adminsQuery = query(
        collection(db, 'companies'),
        where(`admins.${user!.uid}`, '!=', null)
      );

      let companyId: string | null = null;

      // Try alternative query approach
      const companiesSnapshot = await getDocs(collection(db, 'companies'));
      for (const companyDoc of companiesSnapshot.docs) {
        const adminRef = doc(db, 'companies', companyDoc.id, 'admins', user!.uid);
        const adminDoc = await getDoc(adminRef);
        if (adminDoc.exists()) {
          companyId = companyDoc.id;
          setCompany({ id: companyDoc.id, ...companyDoc.data() } as Company);
          break;
        }
      }

      if (!companyId) {
        setError('Nem található vállalat');
        setLoading(false);
        return;
      }

      // Load masterclasses
      const masterclassesSnapshot = await getDocs(
        collection(db, 'companies', companyId, 'masterclasses')
      );

      const masterclassesList: CompanyMasterclass[] = masterclassesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          masterclassId: data.masterclassId,
          title: data.title,
          duration: data.duration,
          seats: data.seats,
          pricePerSeat: data.pricePerSeat,
          totalPaid: data.totalPaid,
          startDate: data.startDate?.toDate(),
          endDate: data.endDate?.toDate(),
          status: data.status,
        };
      });

      setMasterclasses(masterclassesList);

      // Load employees
      const employeesSnapshot = await getDocs(
        collection(db, 'companies', companyId, 'employees')
      );

      const employeesList: CompanyEmployee[] = employeesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as CompanyEmployee));

      setEmployees(employeesList);

      setLoading(false);
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.message || 'Hiba történt az adatok betöltése során');
      setLoading(false);
    }
  };

  const openAssignModal = (masterclass: CompanyMasterclass) => {
    setSelectedMasterclass(masterclass);
    setSelectedEmployeeIds([]);
    setAssignSuccess(null);
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedMasterclass(null);
    setSelectedEmployeeIds([]);
    setAssignSuccess(null);
  };

  const toggleEmployeeSelection = (employeeId: string) => {
    setSelectedEmployeeIds(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleAssignEmployees = async () => {
    if (!selectedMasterclass || !company || selectedEmployeeIds.length === 0) return;

    try {
      setAssigning(true);
      setError(null);

      const functions = getFunctions();
      const enrollEmployees = httpsCallable<
        { companyId: string; masterclassId: string; employeeIds: string[] },
        EnrollEmployeesResponse
      >(functions, 'enrollEmployeesInMasterclass');

      const result = await enrollEmployees({
        companyId: company.id,
        masterclassId: selectedMasterclass.id,
        employeeIds: selectedEmployeeIds,
      });

      if (result.data.success) {
        setAssignSuccess(
          `Sikeres hozzárendelés: ${result.data.enrolledCount} alkalmazott. ${
            result.data.skipped > 0 ? `Kihagyott: ${result.data.skipped}` : ''
          }`
        );

        // Reload data to refresh seat counts
        await loadData();

        // Close modal after 2 seconds
        setTimeout(() => {
          closeAssignModal();
        }, 2000);
      }

      setAssigning(false);
    } catch (err: any) {
      console.error('Error assigning employees:', err);
      setError(err.message || 'Hiba történt a hozzárendelés során');
      setAssigning(false);
    }
  };

  // Get eligible employees for assignment (active, not already enrolled)
  const getEligibleEmployees = (masterclassId: string) => {
    return employees.filter(emp => {
      // Must be active
      if (emp.status !== 'active') return false;

      // Must not be already enrolled
      const alreadyEnrolled = emp.enrolledMasterclasses?.some(
        e => e.masterclassId === masterclassId
      );

      return !alreadyEnrolled;
    });
  };

  const getEnrolledCount = (masterclassId: string) => {
    return employees.filter(emp =>
      emp.enrolledMasterclasses?.some(e => e.masterclassId === masterclassId)
    ).length;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error && !company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Hiba</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/company/dashboard"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            ← Vissza a vezérlőpulthoz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="/company/dashboard"
                  className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
                >
                  ← Vissza a vezérlőpulthoz
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Masterclass-ok</h1>
                <p className="text-gray-600 mt-1">{company?.name}</p>
              </div>
              <Link
                href="/company/dashboard/masterclasses/create"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Helyek hozzáadása
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Masterclasses List */}
        {masterclasses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Még nincs masterclass
            </h3>
            <p className="mt-2 text-gray-600">
              Vásárolj masterclass helyeket, hogy elkezd a csapatod képzését.
            </p>
            <div className="mt-6">
              <Link
                href="/masterclasses"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
              >
                Masterclass-ok böngészése
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {masterclasses.map((masterclass) => {
              const enrolledCount = getEnrolledCount(masterclass.id);
              const eligibleEmployees = getEligibleEmployees(masterclass.id);

              return (
                <div
                  key={masterclass.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {masterclass.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {masterclass.duration} hetes program
                        </p>

                        {/* Status Badge */}
                        <div className="mt-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              masterclass.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : masterclass.status === 'scheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {masterclass.status === 'active' && 'Aktív'}
                            {masterclass.status === 'scheduled' && 'Ütemezett'}
                            {masterclass.status === 'completed' && 'Befejezett'}
                          </span>
                        </div>
                      </div>

                      {/* Seat Stats */}
                      <div className="ml-6 text-right">
                        <div className="text-3xl font-bold text-teal-600">
                          {masterclass.seats.available}
                        </div>
                        <div className="text-sm text-gray-600">szabad hely</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {masterclass.seats.used} használt / {masterclass.seats.purchased} vásárolt
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="mt-4 flex gap-6 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Kezdés:</span>{' '}
                        {masterclass.startDate?.toLocaleDateString('hu-HU')}
                      </div>
                      <div>
                        <span className="font-medium">Befejezés:</span>{' '}
                        {masterclass.endDate?.toLocaleDateString('hu-HU')}
                      </div>
                    </div>

                    {/* Enrolled Employees Count */}
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="font-medium">{enrolledCount}</span> alkalmazott beiratkozva
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => openAssignModal(masterclass)}
                        disabled={masterclass.seats.available === 0 || eligibleEmployees.length === 0}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                        Alkalmazottak hozzárendelése
                      </button>

                      {masterclass.seats.available === 0 && (
                        <span className="text-sm text-amber-600 self-center">
                          Nincs több szabad hely
                        </span>
                      )}

                      {eligibleEmployees.length === 0 && masterclass.seats.available > 0 && (
                        <span className="text-sm text-gray-600 self-center">
                          Nincs hozzárendelhető alkalmazott
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Assign Employees Modal */}
      <AnimatePresence>
        {showAssignModal && selectedMasterclass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeAssignModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Alkalmazottak hozzárendelése
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedMasterclass.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Szabad helyek: <span className="font-medium">{selectedMasterclass.seats.available}</span>
                </p>
              </div>

              <div className="p-6 overflow-y-auto max-h-96">
                {assignSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-green-800 mt-2">{assignSuccess}</p>
                  </div>
                ) : (
                  <>
                    {getEligibleEmployees(selectedMasterclass.id).length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600">
                          Nincs hozzárendelhető alkalmazott. Minden aktív alkalmazott már beiratkozott.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {getEligibleEmployees(selectedMasterclass.id).map((employee) => (
                          <label
                            key={employee.id}
                            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedEmployeeIds.includes(employee.id)}
                              onChange={() => toggleEmployeeSelection(employee.id)}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <div className="ml-3 flex-1">
                              <div className="font-medium text-gray-900">
                                {employee.fullName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {employee.email}
                                {employee.jobTitle && ` • ${employee.jobTitle}`}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {selectedEmployeeIds.length > 0 && (
                    <span>
                      {selectedEmployeeIds.length} alkalmazott kiválasztva
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={closeAssignModal}
                    disabled={assigning}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
                  >
                    Mégse
                  </button>
                  <button
                    onClick={handleAssignEmployees}
                    disabled={assigning || selectedEmployeeIds.length === 0 || assignSuccess !== null}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {assigning ? 'Hozzárendelés...' : 'Hozzárendelés'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
