import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

interface EmiCalculatorProps {
  onClose?: () => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({ onClose }) => {
  const [loanAmount, setLoanAmount] = useState<number>(3500000); // 35 Lakhs default
  const [loanInput, setLoanInput] = useState<string>('3500000');
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default SBI home loan
  const [tenureYears, setTenureYears] = useState<number>(15); // 15 years

  const handleLoanSliderChange = (val: number) => {
    setLoanAmount(val);
    setLoanInput(String(val));
  };

  const handleLoanInputChange = (raw: string) => {
    const cleaned = raw.replace(/[^0-9]/g, '');
    setLoanInput(cleaned);
    if (!cleaned) {
      setLoanAmount(0);
      return;
    }
    const parsed = Math.min(500000000, Number(cleaned));
    setLoanAmount(parsed);
  };

  const handleLoanInputBlur = () => {
    setLoanInput(String(loanAmount));
  };

  // Calculate EMI
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    loanAmount && monthlyRate
      ? Math.round(
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="emi-calculator-card bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl transition-colors duration-300">
      <div className="emi-header flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="emi-icon-box p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Bank Loan & EMI Calculator</h3>
            <p className="text-xs text-slate-400">SBI, HDFC, ICICI & Partner Housing Finance Calculator</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white cursor-pointer"
          >
            Close
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount Slider + Custom Input */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <label className="text-xs font-semibold text-slate-300">Loan Amount</label>
              <div className="flex items-center gap-2">
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 text-xs font-bold text-amber-400 pointer-events-none">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={loanInput}
                    onChange={(e) => handleLoanInputChange(e.target.value)}
                    onBlur={handleLoanInputBlur}
                    placeholder="Enter custom amount"
                    aria-label="Custom Loan Amount in INR"
                    className="emi-custom-input w-36 sm:w-40 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl pl-6 pr-2.5 py-1.5 text-xs sm:text-sm font-extrabold text-amber-400 text-right focus:outline-none transition"
                  />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-amber-400 hidden sm:inline">
                  ({formatCurrency(loanAmount)})
                </span>
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="20000000"
              step="10000"
              value={Math.min(Math.max(loanAmount, 100000), 20000000)}
              onChange={(e) => handleLoanSliderChange(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>₹1 Lakh</span>
              <span>₹1 Crore</span>
              <span>₹2 Crore (or type custom above)</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Interest Rate</label>
              <span className="text-base font-extrabold text-emerald-400">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min="7.0"
              max="12.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>7.0% (Subsidized)</span>
              <span>8.5% (Standard SBI)</span>
              <span>12.0%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Loan Tenure</label>
              <span className="text-base font-extrabold text-sky-400">{tenureYears} Years ({totalMonths} Months)</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* EMI Result Summary Card */}
        <div className="emi-result-card lg:col-span-5 bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Monthly EMI Amount</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
              {formatCurrency(emi)}
              <span className="text-xs font-normal text-slate-400"> / month</span>
            </div>

            <div className="mt-6 space-y-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Principal Amount:</span>
                <strong className="text-white">{formatCurrency(loanAmount)}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Interest Payable:</span>
                <strong className="text-emerald-400">{formatCurrency(totalInterest)}</strong>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 font-bold">
                <span>Total Payment (Loan + Interest):</span>
                <strong className="text-amber-400">{formatCurrency(totalPayment)}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="https://wa.me/919829000000?text=Hello%20Ajarwal%20Real%20Estate%20Group!%20I%20would%20like%20to%20check%20bank%20loan%20eligibility%20and%20EMI%20for%20Bhankrota%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition"
            >
              <span>Get Instant Bank Loan Approval Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
