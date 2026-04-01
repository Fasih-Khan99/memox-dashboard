import { dashboardKPIs } from '@/lib/mockData';

export default function DashboardPage() {
    const kpis = [
        { label: "Active Agents", value: `${dashboardKPIs.activeAgents}` },
        { label: "Total Agents", value: `${dashboardKPIs.totalAgents}` },
        { label: "Active Calls", value: dashboardKPIs.activeCalls },
        { label: "Calls Today", value: dashboardKPIs.callsToday },
        { label: "Avg Duration (s)", value: dashboardKPIs.avgCallDuration },
        { label: "Overall Success Rate", value: `${(dashboardKPIs.overallSuccessRate * 100).toFixed(0)}%` },
        { label: "Meetings Booked", value: `${dashboardKPIs.meetingsBooked}` },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col justify-between min-h-[100px]">
                        <div className="text-sm text-gray-500 mb-1">{kpi.label}</div>
                        <div className="text-2xl text-green-400 font-semibold">{kpi.value}</div>
                    </div>
                ))}
                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Call Languages</div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                        {Object.entries(dashboardKPIs.languageDistribution).map(([lang, count]) => (
                            <div key={lang} className="flex justify-between text-xs md:text-sm lg:text-sm">
                                <span className="font-semibold text-green-400">{lang}</span>
                                <span className="font-semibold text-green-400">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}