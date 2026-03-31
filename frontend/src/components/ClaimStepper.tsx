import { Check, Loader2, Circle, AlertTriangle } from 'lucide-react';

interface Step {
  label: string;
  detail?: string;
  status: 'completed' | 'active' | 'pending' | 'failed';
}

interface ClaimStepperProps {
  steps: Step[];
}

export default function ClaimStepper({ steps }: ClaimStepperProps) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-4">
          {/* Connector line + icon */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              step.status === 'completed' ? 'bg-brand-500/20 text-brand-400' :
              step.status === 'active' ? 'bg-amber-500/20 text-amber-400' :
              step.status === 'failed' ? 'bg-red-500/20 text-red-400' :
              'bg-dark-700 text-slate-500'
            }`}>
              {step.status === 'completed' ? <Check className="w-4 h-4" /> :
               step.status === 'active' ? <Loader2 className="w-4 h-4 animate-spin" /> :
               step.status === 'failed' ? <AlertTriangle className="w-4 h-4" /> :
               <Circle className="w-3 h-3" />}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-0.5 h-8 ${
                step.status === 'completed' ? 'bg-brand-500/30' : 'bg-dark-600'
              }`} />
            )}
          </div>

          {/* Label */}
          <div className="pt-1 pb-4">
            <p className={`text-sm font-medium ${
              step.status === 'completed' ? 'text-white' :
              step.status === 'active' ? 'text-amber-300' :
              step.status === 'failed' ? 'text-red-400' :
              'text-slate-500'
            }`}>
              {step.title || step.label}
            </p>
            {step.detail && (
              <p className="text-xs text-slate-500 mt-0.5">{step.detail}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
