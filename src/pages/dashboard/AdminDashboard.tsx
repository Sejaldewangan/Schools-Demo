
import { useQuery } from '@tanstack/react-query';
import { adminAPI } from '../../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, IndianRupee, TrendingUp, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await adminAPI.getStats();
      return res.data.data;
    },
  });

  if (isLoading) return <div className="animate-pulse flex gap-4"><div className="h-32 bg-gray-200 rounded-2xl w-1/4" /></div>;

  const { overview, revenue, enrollment, recentStudents } = data;

  const kpis = [
    { title: 'Total Students', value: overview.totalStudents, icon: Users, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
    { title: 'Total Teachers', value: overview.totalTeachers, icon: UserCheck, color: 'bg-emerald-50 text-emerald-600', trend: '+2%' },
    { title: 'Revenue Collected', value: `₹${(revenue.totalCollected / 100000).toFixed(2)}L`, icon: IndianRupee, color: 'bg-gold-50 text-gold-600', trend: '+15%' },
    { title: 'Attendance Rate', value: '94%', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', trend: '+1%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-navy-900 font-display">Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Here is the latest data for your school.</p>
        </div>
        <button className="btn-primary">Download Report</button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="card p-5">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{kpi.trend}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{kpi.title}</h3>
            <p className="text-2xl font-black text-navy-900 mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2 p-6">
          <h3 className="text-lg font-bold text-navy-900 font-display mb-6">Enrollment Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollment}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3949ab" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3949ab" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <Area type="monotone" dataKey="students" stroke="#3949ab" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6 flex flex-col">
          <h3 className="text-lg font-bold text-navy-900 font-display mb-6">Recent Admissions</h3>
          <div className="flex-1 overflow-y-auto space-y-4">
            {recentStudents?.map((s: any) => (
              <div key={s._id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{s.name}</p>
                    <p className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="badge badge-green">New</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
