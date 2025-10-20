'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  Building2,
  Mail,
  Lock,
  User,
  Users,
  Briefcase,
  Hash,
  CheckCircle2,
  Loader2,
  X,
  Plus,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { brandGradient, buttonStyles, glassMorphism, animations, typography } from '@/lib/design-tokens';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';
import { PremiumHeader } from '@/components/PremiumHeader';
import { PremiumFooter } from '@/components/PremiumFooter';

interface OnboardingData {
  // Step 1: Account
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  password: string;
  confirmPassword: string;

  // Step 2: Company Details
  companyName: string;
  billingEmail: string;
  industry: string;
  companySize: string;

  // Step 3: Employees
  employees: {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
  }[];
}

interface CompleteOnboardingInput {
  companyName: string;
  billingEmail: string;
  industry: string;
  companySize: string;
  employees: {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
  }[];
}

interface CompleteOnboardingResponse {
  success: boolean;
  companyId: string;
  employeesInvited: number;
}

const INDUSTRIES = [
  'Technológia',
  'Kereskedelem',
  'Pénzügy',
  'Egészségügy',
  'Oktatás',
  'Marketing',
  'Ingatlan',
  'Gyártás',
  'Vendéglátás',
  'Egyéb'
];

const COMPANY_SIZES = [
  '1-10 fő',
  '11-50 fő',
  '51-200 fő',
  '201-500 fő',
  '500+ fő'
];

export default function CompanyOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<OnboardingData>({
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    billingEmail: '',
    industry: '',
    companySize: '',
    employees: []
  });

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  // Step 1: Validate account creation
  const validateStep1 = (): boolean => {
    if (!formData.ownerFirstName.trim()) {
      setError('A keresztnév kötelező');
      return false;
    }
    if (!formData.ownerLastName.trim()) {
      setError('A vezetéknév kötelező');
      return false;
    }
    if (!formData.ownerEmail.trim()) {
      setError('Az email cím kötelező');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.ownerEmail)) {
      setError('Érvénytelen email cím');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A jelszónak legalább 6 karakter hosszúnak kell lennie');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('A jelszavak nem egyeznek');
      return false;
    }
    return true;
  };

  // Step 2: Validate company details
  const validateStep2 = (): boolean => {
    if (!formData.companyName.trim()) {
      setError('A vállalat neve kötelező');
      return false;
    }
    if (!formData.billingEmail.trim()) {
      setError('A számlázási email kötelező');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.billingEmail)) {
      setError('Érvénytelen email cím');
      return false;
    }
    if (!formData.industry) {
      setError('Az iparág megadása kötelező');
      return false;
    }
    if (!formData.companySize) {
      setError('A céges létszám megadása kötelező');
      return false;
    }
    return true;
  };

  // Step 3: Validate employees (optional, but if added must be valid)
  const validateStep3 = (): boolean => {
    for (const employee of formData.employees) {
      if (!employee.firstName.trim() || !employee.lastName.trim()) {
        setError('Az alkalmazottak neve kötelező');
        return false;
      }
      if (!employee.email.trim()) {
        setError('Az alkalmazottak email címe kötelező');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(employee.email)) {
        setError(`Érvénytelen email cím: ${employee.email}`);
        return false;
      }
      if (!employee.jobTitle.trim()) {
        setError('A munkakör megadása kötelező');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setError('');

    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;

    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const addEmployee = () => {
    setFormData(prev => ({
      ...prev,
      employees: [...prev.employees, { firstName: '', lastName: '', email: '', jobTitle: '' }]
    }));
  };

  const removeEmployee = (index: number) => {
    setFormData(prev => ({
      ...prev,
      employees: prev.employees.filter((_, i) => i !== index)
    }));
  };

  const updateEmployee = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      employees: prev.employees.map((emp, i) =>
        i === index ? { ...emp, [field]: value } : emp
      )
    }));
    setError('');
  };

  const handleComplete = async () => {
    setError('');
    setLoading(true);

    try {
      // Step 1: Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.ownerEmail.trim().toLowerCase(),
        formData.password
      );

      // Update display name
      await updateProfile(userCredential.user, {
        displayName: `${formData.ownerFirstName} ${formData.ownerLastName}`
      });

      // Step 2: Call Cloud Function to create company and setup everything
      const completeOnboarding = httpsCallable<CompleteOnboardingInput, CompleteOnboardingResponse>(
        functions,
        'completeCompanyOnboarding'
      );

      const result = await completeOnboarding({
        companyName: formData.companyName.trim(),
        billingEmail: formData.billingEmail.trim().toLowerCase(),
        industry: formData.industry,
        companySize: formData.companySize,
        employees: formData.employees.map(emp => ({
          firstName: emp.firstName.trim(),
          lastName: emp.lastName.trim(),
          email: emp.email.trim().toLowerCase(),
          jobTitle: emp.jobTitle.trim()
        }))
      });

      if (result.data.success) {
        setSuccess(true);
        // Force token refresh to get new custom claims
        await userCredential.user.getIdToken(true);

        // Redirect to company dashboard
        setTimeout(() => {
          router.push('/company/dashboard');
        }, 1500);
      } else {
        setError('Hiba történt a regisztráció során');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Onboarding error:', err);

      if (err.code === 'auth/email-already-in-use') {
        setError('Ez az email cím már használatban van');
        setCurrentStep(1);
      } else if (err.code === 'auth/weak-password') {
        setError('A jelszó túl gyenge');
        setCurrentStep(1);
      } else {
        setError(err.message || 'Hiba történt a regisztráció során');
      }
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-12">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              step === currentStep
                ? 'bg-white text-gray-900 shadow-lg'
                : step < currentStep
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/50'
            }`}
          >
            {step < currentStep ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              step
            )}
          </div>
          {step < 4 && (
            <div
              className={`w-16 h-1 rounded ${
                step < currentStep ? 'bg-white/30' : 'bg-white/10'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const inputClass = "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all backdrop-blur-xl";
  const labelClass = "block text-sm font-medium text-white/90 mb-2";

  const renderStep1 = () => (
    <motion.div
      key="step1"
      {...animations.fadeIn}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-3">
          Fiók létrehozása
        </h2>
        <p className="text-white/70 text-lg">
          Kezdjük a vállalati fiók tulajdonosának adataival
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Keresztnév *</label>
          <input
            type="text"
            value={formData.ownerFirstName}
            onChange={(e) => updateFormData('ownerFirstName', e.target.value)}
            className={inputClass}
            placeholder="János"
          />
        </div>

        <div>
          <label className={labelClass}>Vezetéknév *</label>
          <input
            type="text"
            value={formData.ownerLastName}
            onChange={(e) => updateFormData('ownerLastName', e.target.value)}
            className={inputClass}
            placeholder="Kovács"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email cím *</label>
        <input
          type="email"
          value={formData.ownerEmail}
          onChange={(e) => updateFormData('ownerEmail', e.target.value)}
          className={inputClass}
          placeholder="janos.kovacs@cegem.hu"
        />
      </div>

      <div>
        <label className={labelClass}>Jelszó *</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData('password', e.target.value)}
          className={inputClass}
          placeholder="Legalább 6 karakter"
        />
      </div>

      <div>
        <label className={labelClass}>Jelszó megerősítése *</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
          className={inputClass}
          placeholder="Jelszó újra"
        />
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      {...animations.fadeIn}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-3">
          Vállalati adatok
        </h2>
        <p className="text-white/70 text-lg">
          Add meg a vállalat alapvető információit
        </p>
      </div>

      <div>
        <label className={labelClass}>Vállalat neve *</label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => updateFormData('companyName', e.target.value)}
          className={inputClass}
          placeholder="Cégem Kft."
        />
      </div>

      <div>
        <label className={labelClass}>Számlázási email cím *</label>
        <input
          type="email"
          value={formData.billingEmail}
          onChange={(e) => updateFormData('billingEmail', e.target.value)}
          className={inputClass}
          placeholder="szamlazas@cegem.hu"
        />
        <p className="text-xs text-white/50 mt-1.5">
          Erre a címre küldjük a számlákat és fizetési értesítéseket
        </p>
      </div>

      <div>
        <label className={labelClass}>Iparág *</label>
        <select
          value={formData.industry}
          onChange={(e) => updateFormData('industry', e.target.value)}
          className={inputClass}
        >
          <option value="" className="bg-gray-900 text-white">Válassz iparágat...</option>
          {INDUSTRIES.map(industry => (
            <option key={industry} value={industry} className="bg-gray-900 text-white">{industry}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Cég mérete *</label>
        <select
          value={formData.companySize}
          onChange={(e) => updateFormData('companySize', e.target.value)}
          className={inputClass}
        >
          <option value="" className="bg-gray-900 text-white">Válaszd ki a létszámot...</option>
          {COMPANY_SIZES.map(size => (
            <option key={size} value={size} className="bg-gray-900 text-white">{size}</option>
          ))}
        </select>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      {...animations.fadeIn}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-3">
          Alkalmazottak hozzáadása
        </h2>
        <p className="text-white/70 text-lg">
          Hívj meg alkalmazottakat (később is megteheted)
        </p>
      </div>

      {formData.employees.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-2xl border-2 border-dashed border-white/20">
          <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <p className="text-white/70 mb-6 text-lg">Még nem adtál hozzá alkalmazottakat</p>
          <button
            onClick={addEmployee}
            className={buttonStyles.primaryDark}
          >
            <Plus className="w-4 h-4" />
            <span>Első alkalmazott hozzáadása</span>
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {formData.employees.map((employee, index) => (
              <div key={index} className="p-5 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 relative">
                <button
                  onClick={() => removeEmployee(index)}
                  className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Keresztnév
                    </label>
                    <input
                      type="text"
                      value={employee.firstName}
                      onChange={(e) => updateEmployee(index, 'firstName', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                      placeholder="Péter"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Vezetéknév
                    </label>
                    <input
                      type="text"
                      value={employee.lastName}
                      onChange={(e) => updateEmployee(index, 'lastName', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                      placeholder="Nagy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Email cím
                    </label>
                    <input
                      type="email"
                      value={employee.email}
                      onChange={(e) => updateEmployee(index, 'email', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                      placeholder="peter.nagy@cegem.hu"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Munkakör
                    </label>
                    <input
                      type="text"
                      value={employee.jobTitle}
                      onChange={(e) => updateEmployee(index, 'jobTitle', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                      placeholder="Marketing Manager"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addEmployee}
            className="w-full py-4 border-2 border-dashed border-white/30 rounded-xl text-white/70 hover:border-white/50 hover:text-white transition-all flex items-center justify-center space-x-2 backdrop-blur-xl bg-white/5"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Újabb alkalmazott hozzáadása</span>
          </button>
        </>
      )}
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      key="step4"
      {...animations.fadeIn}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-3">
          Összefoglaló
        </h2>
        <p className="text-white/70 text-lg">
          Ellenőrizd az adatokat mielőtt véglegesíted
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
          <h3 className="font-semibold text-white text-lg mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Fiók tulajdonos
          </h3>
          <div className="text-sm space-y-2 text-white/80">
            <p><strong className="text-white">Név:</strong> {formData.ownerFirstName} {formData.ownerLastName}</p>
            <p><strong className="text-white">Email:</strong> {formData.ownerEmail}</p>
          </div>
        </div>

        <div className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
          <h3 className="font-semibold text-white text-lg mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Vállalat
          </h3>
          <div className="text-sm space-y-2 text-white/80">
            <p><strong className="text-white">Név:</strong> {formData.companyName}</p>
            <p><strong className="text-white">Számlázási email:</strong> {formData.billingEmail}</p>
            <p><strong className="text-white">Iparág:</strong> {formData.industry}</p>
            <p><strong className="text-white">Méret:</strong> {formData.companySize}</p>
          </div>
        </div>

        <div className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
          <h3 className="font-semibold text-white text-lg mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Alkalmazottak
          </h3>
          {formData.employees.length === 0 ? (
            <p className="text-sm text-white/60">Később adhatsz hozzá alkalmazottakat</p>
          ) : (
            <div className="space-y-2">
              {formData.employees.map((emp, index) => (
                <div key={index} className="text-sm text-white/80 flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                  <span>{emp.firstName} {emp.lastName}</span>
                  <span className="text-xs text-white/60">{emp.jobTitle}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (success) {
    return (
      <div className="min-h-screen" style={{ background: brandGradient }}>
        <PremiumHeader />
        <div className="container mx-auto px-6 flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-white mb-3">
              Sikeres regisztráció!
            </h2>
            <p className="text-white/70 text-lg mb-6">
              Átirányítás a vezérlőpultra...
            </p>
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: brandGradient }}>
      <PremiumHeader />

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            {...animations.fadeInUp}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-4">
              Vállalati regisztráció
            </h1>
            <p className="text-white/70 text-lg">
              Csatlakozz az Elira platformhoz és kezdd el csapatod fejlesztését
            </p>
          </motion.div>

          {/* Progress Steps */}
          {renderStepIndicator()}

          {/* Form Card */}
          <motion.div
            {...animations.scaleIn}
            className="p-8 lg:p-12 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-xl text-white text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  disabled={loading}
                  className={buttonStyles.secondaryDark}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Vissza</span>
                </button>
              ) : (
                <Link href="/auth" className={buttonStyles.secondaryDark}>
                  <ChevronLeft className="w-4 h-4" />
                  <span>Bejelentkezés</span>
                </Link>
              )}

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={buttonStyles.primaryDark}
                >
                  <span>Tovább</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className={buttonStyles.primaryDark}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Regisztráció...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Regisztráció befejezése</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>

          {/* Footer Link */}
          <p className="text-center text-white/60 text-sm mt-8">
            Már van fiókod?{' '}
            <Link href="/auth" className="text-white hover:text-white/80 font-medium underline">
              Jelentkezz be
            </Link>
          </p>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
