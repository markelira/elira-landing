'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Info, ChevronRight } from 'lucide-react';
import MobileInput, { MobileTextarea, MobileSelect } from './MobileInput';
import MobileButton from './MobileButton';
import { cn } from '@/lib/utils';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: (value: any) => string | undefined;
  hint?: string;
}

interface MobileFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitLabel?: string;
  successMessage?: string;
  className?: string;
  stepForm?: boolean; // Enable step-by-step form
}

/**
 * MobileForm - Mobile-optimized form with inline validation and step support
 */
const MobileForm: React.FC<MobileFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  successMessage = 'Form submitted successfully!',
  className = '',
  stepForm = false,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize form data
  useEffect(() => {
    const initialData: Record<string, any> = {};
    fields.forEach(field => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
  }, [fields]);

  const validateField = (field: FormField, value: any): string | undefined => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
    }
    
    if (field.validation) {
      return field.validation(value);
    }
    
    return undefined;
  };

  const handleFieldChange = (field: FormField, value: any) => {
    setFormData(prev => ({ ...prev, [field.name]: value }));
    
    // Clear error when user starts typing
    if (errors[field.name]) {
      setErrors(prev => ({ ...prev, [field.name]: '' }));
    }
    
    // Validate on change if field was touched
    if (touched[field.name]) {
      const error = validateField(field, value);
      if (error) {
        setErrors(prev => ({ ...prev, [field.name]: error }));
      }
    }
  };

  const handleFieldBlur = (field: FormField) => {
    setTouched(prev => ({ ...prev, [field.name]: true }));
    
    const error = validateField(field, formData[field.name]);
    if (error) {
      setErrors(prev => ({ ...prev, [field.name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach(field => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = fields.find(field => errors[field.name]);
      if (firstErrorField) {
        const element = document.getElementById(`field-${firstErrorField.name}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({});
        setErrors({});
        setTouched({});
        setIsSuccess(false);
        setCurrentStep(0);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Validate current step fields
    const currentField = fields[currentStep];
    const error = validateField(currentField, formData[currentField.name]);
    
    if (error) {
      setErrors(prev => ({ ...prev, [currentField.name]: error }));
      setTouched(prev => ({ ...prev, [currentField.name]: true }));
      return;
    }
    
    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderField = (field: FormField, index: number) => {
    const fieldProps = {
      label: field.label,
      placeholder: field.placeholder,
      value: formData[field.name] || '',
      onChange: (e: any) => handleFieldChange(field, e.target.value),
      onBlur: () => handleFieldBlur(field),
      error: touched[field.name] ? errors[field.name] : undefined,
      hint: field.hint,
      required: field.required,
      disabled: isSubmitting,
      fullWidth: true,
    };

    switch (field.type) {
      case 'textarea':
        return <MobileTextarea {...fieldProps} rows={4} />;
      
      case 'select':
        return (
          <MobileSelect
            {...fieldProps}
            options={field.options || []}
          />
        );
      
      default:
        return (
          <MobileInput
            {...fieldProps}
            type={field.type}
          />
        );
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Success!
        </h3>
        <p className="text-gray-600">
          {successMessage}
        </p>
      </motion.div>
    );
  }

  // Step form
  if (stepForm && fields.length > 0) {
    const currentField = fields[currentStep];
    const progress = ((currentStep + 1) / fields.length) * 100;

    return (
      <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {fields.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-600 to-cyan-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Current field */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            id={`field-${currentField.name}`}
          >
            {renderField(currentField, currentStep)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between space-x-4">
          <MobileButton
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={currentStep === 0 ? 'invisible' : ''}
          >
            Previous
          </MobileButton>

          {currentStep < fields.length - 1 ? (
            <MobileButton
              type="button"
              variant="default"
              onClick={nextStep}
              icon={<ChevronRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Next
            </MobileButton>
          ) : (
            <MobileButton
              type="submit"
              variant="default"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {submitLabel}
            </MobileButton>
          )}
        </div>
      </form>
    );
  }

  // Regular form
  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className={cn('space-y-5', className)}
    >
      {fields.map((field, index) => (
        <div key={field.name} id={`field-${field.name}`}>
          {renderField(field, index)}
        </div>
      ))}

      <MobileButton
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {submitLabel}
      </MobileButton>
    </form>
  );
};

export default MobileForm;

/**
 * InlineValidation - Show validation status inline
 */
export const InlineValidation: React.FC<{
  isValid?: boolean;
  message?: string;
  show?: boolean;
}> = ({ isValid, message, show = false }) => {
  if (!show || !message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'flex items-center space-x-2 mt-2 text-sm',
        isValid ? 'text-green-600' : 'text-red-600'
      )}
    >
      {isValid ? (
        <Check className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      <span>{message}</span>
    </motion.div>
  );
};

/**
 * FormProgress - Visual progress indicator for multi-step forms
 */
export const FormProgress: React.FC<{
  steps: string[];
  currentStep: number;
  className?: string;
}> = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  index <= currentStep
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-2 text-gray-600 text-center max-w-[60px]">
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2',
                  index < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};