import { getCallById } from '@/lib/mockData';
import { notFound } from 'next/navigation';

// Update: Add async and wrap params in a Promise type
export default async function CallDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  // Update: Await the params
  const { id } = await params;
  const call = getCallById(id);

  if (!call) return notFound();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-400">{call.company}</h1>
        <p className="text-gray-500 font-medium">Contact: {call.contact}</p>
      </div>

      {/* Call Metadata Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Agent</div>
          <div className="font-semibold text-gray-800">{call.agentName}</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Start Time</div>
          <div className="font-semibold text-gray-800">{formatDate(call.startTime)}</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Duration</div>
          <div className="font-semibold text-gray-800">
            {Math.floor(call.duration / 60)}m {call.duration % 60}s
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Outcome</div>
          <div className={`font-semibold capitalize ${call.outcome === 'meeting_booked' ? 'text-green-600' : 'text-gray-800'
            }`}>
            {call.outcome ? call.outcome.replace('_', ' ') : 'In Progress'}
          </div>
        </div>
      </div>

      {/* Transcript Timeline */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-green-400">Conversation Timeline</h2>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase">
          {call.language}
        </span>
      </div>

      {!call.transcript ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500 italic">No transcript available for this live call.</p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-4 md:p-8 space-y-6 border border-gray-100">
          {call.transcript.map((line, index) => {
            const isAgent = line.speaker === 'agent';

            return (
              <div key={index} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm ${isAgent
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                  }`}>
                  <div className="flex justify-between items-center mb-1 gap-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isAgent ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                      {isAgent ? "Agent" : "Prospect"}
                    </span>
                    <span className={`text-[10px] font-medium ${isAgent ? 'text-blue-200' : 'text-gray-400'
                      }`}>
                      {Math.floor(line.timestamp / 60)}:{(line.timestamp % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{line.text}</p>

                  {line.sentiment && (
                    <div className="mt-2 flex justify-end">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${line.sentiment === 'positive' ? 'bg-green-50 text-green-600' :
                        line.sentiment === 'negative' ? 'bg-red-50 text-red-600' :
                          'bg-yellow-50 text-yellow-600'
                        }`}>
                        {line.sentiment}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}