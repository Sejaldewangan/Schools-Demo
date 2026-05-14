
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { studentAPI } from '../../services/api';
import { Calendar, CreditCard, Award, Download, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Skeleton } from '../../components/ui/Skeleton';

const StudentDashboard = () => {
  const { user } = useAuth();

  const { data: gradesData, isLoading: loadingGrades } = useQuery({
    queryKey: ['studentGrades', user?.id],
    queryFn: async () => {
      const res = await studentAPI.getGrades(user!.id);
      return res.data;
    },
    enabled: !!user,
  });

  const { data: feesData, isLoading: loadingFees } = useQuery({
    queryKey: ['studentFees', user?.id],
    queryFn: async () => {
      const res = await studentAPI.getFees(user!.id);
      return res.data;
    },
    enabled: !!user,
  });

  if (loadingGrades || loadingFees) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <Skeleton className="h-80 lg:col-span-2 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  const grades = gradesData?.data || [];
  const gradesSummary = gradesData?.summary || { percentage: '0%' };
  const feesSummary = feesData?.summary || { totalDue: 0, totalPaid: 0 };
  const feesList = feesData?.data || [];

  // Chart data formatting
  const chartData = grades.slice(0, 5).map((g: any) => ({
    subject: g.subject?.name || 'Unknown',
    score: g.marksObtained,
    max: g.maxMarks,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 font-display">Student Portal</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name}</p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-navy-800 to-navy-600 text-white border-none">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 rounded-xl"><Award className="w-6 h-6" /></div>
          </div>
          <p className="text-navy-100 text-sm">Overall Academic Performance</p>
          <p className="text-3xl font-bold mt-1 font-display">{gradesSummary.percentage}</p>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertCircle className="w-6 h-6" /></div>
            <button className="text-xs text-navy-600 font-semibold hover:underline">Pay Now</button>
          </div>
          <p className="text-gray-500 text-sm">Fees Due</p>
          <p className="text-3xl font-bold text-navy-900 mt-1">₹{feesSummary.totalDue}</p>
        </div>

        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Calendar className="w-6 h-6" /></div>
          </div>
          <p className="text-gray-500 text-sm">Next Exam Date</p>
          <p className="text-xl font-bold text-navy-900 mt-2">15 March, 2024</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="card lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-navy-900 text-lg font-display">Recent Performance</h3>
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy-800 transition-colors">
              <Download className="w-4 h-4" /> Report Card
            </button>
          </div>
          <div className="h-64">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}} />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={1500}>
                    {chartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.score / entry.max > 0.8 ? '#10b981' : entry.score / entry.max > 0.6 ? '#f59e0b' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">No grades available yet.</div>
            )}
          </div>
        </div>

        {/* Fee History */}
        <div className="card p-6 flex flex-col">
          <h3 className="font-bold text-navy-900 text-lg font-display mb-6">Fee Invoices</h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {feesList.length > 0 ? (
              feesList.map((fee: any) => (
                <div key={fee._id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${fee.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-navy-900 capitalize">{fee.feeType}</p>
                      <p className="text-xs text-gray-500">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-navy-900">₹{fee.amount}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${fee.status === 'paid' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {fee.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">No fee records found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
