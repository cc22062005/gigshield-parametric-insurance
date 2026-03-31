import { ClaimStepper, StatusBadge } from '../components';

export default function ClaimsManagement() {
  return (
    <div className="p-6 space-y-6">
      {/* Zero-Touch Flow */}
      <div className="glass-card p-6">
        <h2>Zero-Touch Claim Process</h2>
        <ClaimStepper steps={[
          { title: 'Trigger Detected', status: 'completed' },
          { title: 'Auto-Initiated', status: 'completed' },
          { title: 'Fraud Check', status: 'in-progress' },
          { title: 'Payout', status: 'pending' }
        ]} />
      </div>

      {/* Recent Claims */}
      <div className="glass-card">
        <div className="flex justify-between items-center mb-4">
          <h3>Recent Claims</h3>
          <button className="btn-primary">Simulate Claim</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div>Heavy Rain - Mumbai</div>
              <div className="text-sm text-gray-500">Apr 3, 2:15 PM</div>
            </div>
            <StatusBadge>Approved</StatusBadge>
            <div>₹1,250</div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div>Severe AQI - Delhi</div>
              <div className="text-sm text-gray-500">Apr 2, 11:30 AM</div>
            </div>
            <StatusBadge>Flagged</StatusBadge>
            <div>₹890</div>
          </div>
        </div>
      </div>
    </div>
  );
}
