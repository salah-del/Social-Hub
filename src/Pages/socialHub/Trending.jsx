import { FaChartLine, FaChartBar, FaChartPie } from 'react-icons/fa';

const Trending = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Overview</h1>
        <p className="text-gray-600 mt-1">Track your key performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: FaChartLine, title: 'Growth Metrics', value: '+24%' },
          { icon: FaChartBar, title: 'Monthly Revenue', value: '$12,345' },
          { icon: FaChartPie, title: 'Market Share', value: '34%' }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-2xl font-bold text-blue-600">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;