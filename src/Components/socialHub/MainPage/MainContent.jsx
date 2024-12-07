import { FaUsers, FaDollarSign, FaShoppingCart, FaBox } from 'react-icons/fa';
import StatCard from './StatCard';

const MainContent = () => {
  const stats = [
    { title: 'Total Users', value: '2,543', change: 12.5, icon: FaUsers },
    { title: 'Revenue', value: '$45,234', change: 8.2, icon: FaDollarSign },
    { title: 'Orders', value: '1,345', change: -3.8, icon: FaShoppingCart },
    { title: 'Products', value: '456', change: 4.6, icon: FaBox },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-blue-500" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-800">New user registered</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Performance Metrics</h3>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              Export
            </button>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Conversion Rate', value: '64%' },
              { label: 'User Retention', value: '84%' },
              { label: 'Response Time', value: '1.2s' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{metric.label}</span>
                <span className="font-semibold text-gray-800">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;