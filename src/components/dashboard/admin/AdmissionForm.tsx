import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, User, Phone, MapPin, GraduationCap } from 'lucide-react';

interface AdmissionFormProps {
  onClose: () => void;
}

const steps = [
  { id: 'personal', title: 'Personal Info', icon: User },
  { id: 'contact', title: 'Emergency Contact', icon: Phone },
  { id: 'allocation', title: 'Class Allocation', icon: GraduationCap },
];

const AdmissionForm: React.FC<AdmissionFormProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: { name: '', email: '', dob: '', gender: '', roll: '' },
    contact: { parentName: '', parentPhone: '', address: '' },
    allocation: { class: '', section: '', academicYear: '2024-25' }
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-navy-900">New Student Admission</h3>
            <p className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-8 py-4 flex justify-between relative">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i <= currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive ? 'bg-navy-900 border-navy-900 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-400'
                }`}>
                  {i < currentStep ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Body */}
        <div className="px-8 py-8 min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-navy-900 mb-2">Full Name</label>
                    <input type="text" placeholder="Enter student's full name" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">Email Address</label>
                    <input type="email" placeholder="student@eps.school" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">Roll Number</label>
                    <input type="text" placeholder="e.g. EPS-2024-001" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">Date of Birth</label>
                    <input type="date" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">Gender</label>
                    <select className="input-field">
                      <option>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-navy-900 mb-2">Parent/Guardian Name</label>
                    <input type="text" placeholder="Enter parent's full name" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">Primary Phone</label>
                    <input type="tel" placeholder="+91 00000 00000" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">Emergency Contact</label>
                    <input type="tel" placeholder="+91 00000 00000" className="input-field" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-navy-900 mb-2">Residential Address</label>
                    <textarea rows={3} placeholder="Full home address..." className="input-field resize-none" />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">Assign Grade/Class</label>
                    <select className="input-field">
                      <option>Select Grade</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2">Section</label>
                    <select className="input-field">
                      <option>Select Section</option>
                      <option>Section A</option>
                      <option>Section B</option>
                      <option>Section C</option>
                    </select>
                  </div>
                  <div className="col-span-2 p-6 bg-blue-50 rounded-xl border border-blue-100 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-navy-900 font-bold">Academic Year 2024-25</h4>
                      <p className="text-sm text-blue-600 font-medium">Auto-assigned to the current active session.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-white hover:text-navy-900'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          
          <button 
            onClick={currentStep === steps.length - 1 ? onClose : nextStep}
            className="flex items-center gap-2 bg-navy-900 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-navy-800 transition-all shadow-lg shadow-navy-100"
          >
            {currentStep === steps.length - 1 ? 'Complete Admission' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdmissionForm;
