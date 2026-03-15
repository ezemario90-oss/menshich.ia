import React from 'react';

interface Props {
	metricLabel: string;
	value: number;
	delta: string;
}

const DashboardCard: React.FC<Props> = ({ metricLabel, value, delta }) => {
	return (
		<div className="dashboard-card">
			<div className="label">{metricLabel}</div>
			<div className="value">{value}</div>
			<div className="delta">{delta}</div>
			<style jsx>{`
				.dashboard-card {
					background: var(--brand-surface);
					border-radius: 12px;
					box-shadow: 0 6px 18px rgba(0,0,0,.08);
					padding: 24px 32px;
					min-width: 160px;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 8px;
				}
				.label {
					font-size: 15px;
					color: var(--text-muted);
				}
				.value {
					font-size: 28px;
					font-weight: 700;
					color: var(--brand-primary);
				}
				.delta {
					font-size: 13px;
					color: var(--text-muted);
				}
			`}</style>
		</div>
	);
};

export default DashboardCard;