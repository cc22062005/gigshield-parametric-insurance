import { useState } from 'react';
import {
  CloudRain,
  Wind,
  AlertTriangle,
  Play,
  ShieldAlert,
  MonitorCheck,
  CloudLightning,
  Gauge,
} from 'lucide-react';
import { KPICard } from '../components';
import api from '../services/api';

type LogType = 'info' | 'success' | 'warning';

type LogItem = {
  id: string;
  time: string;
  msg: string;
  type: LogType;
};

type ClaimItem = {
  id: string;
  trigger: string;
  score: number;
  status: string;
  approved: boolean;
};

export default function AdminSimulator() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [claims, setClaims] = useState<ClaimItem[]>([]);
  const [isInjecting, setIsInjecting] = useState(false);

  const addLog = (msg: string, type: LogType = 'info') => {
    setLogs((prev) =>
      [
        {
          id: `log_${Date.now()}`,
          time: new Date().toLocaleTimeString(),
          msg,
          type,
        },
        ...prev,
      ].slice(0, 10)
    );
  };

  const simulateDisruption = async (
    type: string,
    metric: string,
    zone: string
  ) => {
    setIsInjecting(true);
    addLog(`Injecting ${type} event into ${zone}...`, 'warning');

    try {
      const hookRes = await api.post('/demo/trigger-disruption', {
        eventType: type,
        metric,
        zone,
      });

      addLog(`Webhook captured: ${hookRes.data.message}`, 'success');

      setTimeout(async () => {
        try {
          addLog(`Evaluating impacted active policies in ${zone}...`, 'info');

          const claimRes = await api.post('/claims/simulate', {
            trigger: type,
            zone,
          });

          setTimeout(async () => {
            try {
              addLog(
                `Routing ${claimRes.data.claimId} to Python ML Service for fraud classification...`,
                'warning'
              );

              const fraudRes = await api.post('/claims/fraud-check', {
                claimId: claimRes.data.claimId,
              });

              setClaims((prev) => [
                {
                  id: claimRes.data.claimId,
                  trigger: claimRes.data.trigger,
                  score: fraudRes.data.confidence,
                  status: fraudRes.data.reason,
                  approved: fraudRes.data.approved,
                },
                ...prev,
              ]);

              addLog(
                `ML check complete. Confidence Score: ${fraudRes.data.confidence}. Status: ${fraudRes.data.approved ? 'APPROVED' : 'FLAGGED'
                }`,
                fraudRes.data.approved ? 'success' : 'warning'
              );
            } catch (error: any) {
              addLog(
                `Fraud classification error: ${error?.response?.data?.message || error.message
                }`,
                'warning'
              );
            } finally {
              setIsInjecting(false);
            }
          }, 1500);
        } catch (error: any) {
          addLog(
            `Claim simulation error: ${error?.response?.data?.message || error.message
            }`,
            'warning'
          );
          setIsInjecting(false);
        }
      }, 1000);
    } catch (error: any) {
      addLog(
        `Simulation error: ${error?.response?.data?.message || error.message}`,
        'warning'
      );
      setIsInjecting(false);
    }
  };

  const simulateSpoof = () => {
    setClaims((prev) => [
      {
        id: `clm_fraud_${Date.now()}`,
        trigger: 'Heavy Rain',
        score: 0.88,
        status: 'High risk fraud anomaly detected. Action required.',
        approved: false,
      },
      ...prev,
    ]);

    addLog(
      'Mocking fraud injection... ML blocked fake claim with score 0.88',
      'warning'
    );
  };

  const getLogColor = (type: LogType) => {
    if (type === 'info') return 'text-blue-300';
    if (type === 'success') return 'text-emerald-400';
    return 'text-amber-400';
  };

  return (
    <>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in min-h-full w-full">
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MonitorCheck className="text-brand-400 w-6 h-6" />
            Hackathon Scenario Simulator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Use this panel to instantly inject mock data payloads into the
            backend, simulating public API webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          DEMO OVERRIDE MODE
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={<CloudRain className="text-blue-400 w-5 h-5" />}
          label="Total Events Validated"
          value="0"
          trend="-"
        />
        <KPICard
          icon={<ShieldAlert className="text-amber-400 w-5 h-5" />}
          label="Fraud Block Rate"
          value="100%"
          trend="+0"
        />
        <KPICard
          icon={<Play className="text-emerald-400 w-5 h-5" />}
          label="Avg Payment Time"
          value="1.2s"
          trend="-0.4s"
        />
        <KPICard
          icon={<Gauge className="text-brand-400 w-5 h-5" />}
          label="ML Avg Latency"
          value="142ms"
          trend="-12ms"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-dark-800/60 border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <CloudLightning className="w-4 h-4 text-slate-400" />
              Inject Weather Events
            </h3>

            <div className="space-y-3">
              <button
                disabled={isInjecting}
                onClick={() =>
                  simulateDisruption(
                    'Heavy Rain',
                    '75.2mm/hr',
                    'Bangalore - Koramangala'
                  )
                }
                className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors text-blue-400 text-sm font-semibold disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4" />
                  <span>{'>'} 60mm Rain Burst</span>
                </div>
                <Play className="w-4 h-4" />
              </button>

              <button
                disabled={isInjecting}
                onClick={() =>
                  simulateDisruption('Severe AQI', '480 NAQI', 'Delhi - NCR')
                }
                className="w-full flex items-center justify-between p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors text-purple-400 text-sm font-semibold disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  <span>AQI {'>'} 400 Crisis</span>
                </div>
                <Play className="w-4 h-4" />
              </button>

              <button
                disabled={isInjecting}
                onClick={() =>
                  simulateDisruption(
                    'Local Curfew',
                    'Section 144 Confirmed',
                    'Bangalore - South'
                  )
                }
                className="w-full flex items-center justify-between p-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors text-amber-400 text-sm font-semibold disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Govt Curfew Signal
                </div>
                <Play className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm font-bold text-white mt-8 mb-4 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-400" />
              Inject Fraud Vectors
            </h3>

            <button
              disabled={isInjecting}
              onClick={simulateSpoof}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors text-red-500 text-sm font-semibold disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Spoof Claim (GPS Mismatch)
              </div>
              <Play className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-dark-900 border border-white/[0.04] rounded-xl p-4 font-mono text-[10px] overflow-hidden">
            <h4 className="text-slate-500 uppercase mb-2">System Logs</h4>
            <div className="space-y-1.5 opacity-80 h-40 overflow-y-auto">
              {logs.length === 0 && (
                <span className="text-slate-600">
                  Awaiting injection payloads...
                </span>
              )}

              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2">
                  <span className="text-slate-500 shrink-0">[{log.time}]</span>
                  <span className={getLogColor(log.type)}>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-dark-800/60 border border-white/[0.06] rounded-xl overflow-hidden h-full">
            <div className="px-5 py-4 border-b border-white/[0.04] bg-dark-700/30 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Gauge className="w-4 h-4 text-brand-400" />
                ML Fraud Center Monitor
              </h3>
            </div>

            <div className="p-5">
              {claims.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500 border border-dashed border-white/[0.08] rounded-xl">
                  <MonitorCheck className="w-8 h-8 mb-3 opacity-50" />
                  <p className="text-sm">
                    No live claims detected over the event bus.
                  </p>
                  <p className="text-xs mt-1">
                    Trigger an event to start pipeline.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {claims.map((claim) => (
                    <div
                      key={claim.id}
                      className={`p-4 rounded-xl border ${claim.approved
                        ? 'bg-emerald-500/5 border-emerald-500/10'
                        : 'bg-red-500/5 border-red-500/10'
                        } flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg border shadow-lg ${claim.approved
                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                            : 'border-red-500/20 bg-red-500/10 text-red-500'
                            }`}
                        >
                          <span className="text-[10px] font-bold uppercase">
                            Score
                          </span>
                          <span className="text-sm font-extrabold">
                            {claim.score.toFixed(2)}
                          </span>
                        </div>

                        <div>
                          <p className="text-white font-medium text-sm">
                            {claim.id}{' '}
                            <span className="text-slate-500 font-normal">
                              | {claim.trigger} Payout
                            </span>
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {claim.status}
                          </p>
                        </div>
                      </div>

                      <div>
                        {claim.approved ? (
                          <span className="px-3 py-1 rounded border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                            Auto-Approved
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded border border-red-500/20 text-red-500 text-xs font-bold uppercase">
                            Flagged: Manual Review
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
