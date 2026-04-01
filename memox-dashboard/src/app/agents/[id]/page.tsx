import { getAgentById } from '@/lib/mockData';
import StatusBadge from '@/components/StatusBadge';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function AgentDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const agent = getAgentById(id);

  if (!agent) return notFound();

  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="md:text-3xl lg:text-3xl text-2xl font-bold text-green-400">{agent.name}</h1>
          <StatusBadge status={agent.status} />
        </div>
        <div className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
          {agent.language}
        </div>
      </div>

      {/* Error Alert (if any) */}
      {agent.error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-8 shadow-sm">
          <div className="flex items-center">
            <span className="font-bold mr-2">System Alert:</span>
            <span>{agent.error}</span>
          </div>
        </div>
      )}

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Calls Today
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {agent.metrics.callsToday}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Total Calls
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {agent.metrics.totalCalls}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Success Rate
          </div>
          <div className="text-2xl font-bold text-green-600">
            {(agent.metrics.successRate * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Current Call Box (Replaces Configuration Box) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Current Activity</h2>
          {agent.currentCall && (
            <span className="flex items-center gap-2 text-xs font-bold text-red-500 animate-pulse">
              <span className="h-2 w-2 bg-red-500 rounded-full"></span>
              LIVE NOW
            </span>
          )}
        </div>

        <div className="p-6">
          {agent.currentCall ? (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Connected Company</p>
                <p className="text-xl font-bold text-gray-900">{agent.currentCall.company}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Duration</p>
                  <p className="font-mono text-lg text-gray-800">
                    {Math.floor(agent.currentCall.duration / 60)}:
                    {(agent.currentCall.duration % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Sentiment</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold uppercase ${agent.currentCall.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                    agent.currentCall.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                    {agent.currentCall.sentiment}
                  </span>
                </div>
              </div>

              <Link
                href={`/calls/${agent.currentCall.id}`}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Monitor Call
              </Link>
            </div>
          ) : (
            <div className="py-10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-4">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium text-lg">No calls active</p>
              <p className="text-gray-400 text-sm mt-1">This agent is currently waiting in the queue.</p>
            </div>
          )}
        </div>
      </div>

      {/* Performance History Chart/Metric (Optional Placeholder) */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Avg Call Duration</p>
          <p className="text-lg font-bold text-gray-900">{agent.metrics.avgCallDuration}s</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
          <p className="text-lg font-bold text-gray-900">{(agent.metrics.conversionRate * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}