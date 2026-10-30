import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ADMIN_STATS } from '../../data/mockData';
import { 
  ShieldCheck, 
  Users, 
  Radio, 
  Droplets, 
  ScanSearch, 
  BellRing, 
  Server, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Power,
  RotateCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { adminSensors, toggleSensorStatus, alerts, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'sensors' | 'users' | 'logs'>('sensors');
  const [searchSensor, setSearchSensor] = useState('');

  const sensorHealthDistribution = [
    { name: 'Online / Active', value: 4448, color: '#10b981' },
    { name: 'Low Battery / Alert', value: 52, color: '#f59e0b' },
    { name: 'Offline Maintenance', value: 20, color: '#ef4444' }
  ];

  const filteredSensors = adminSensors.filter(s => 
    s.nodeName.toLowerCase().includes(searchSensor.toLowerCase()) ||
    s.farmer.toLowerCase().includes(searchSensor.toLowerCase()) ||
    s.farmName.toLowerCase().includes(searchSensor.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* 1. Admin Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/20">
                SAMS Platform Core
              </span>
              <span className="text-xs text-emerald-300">Central Infrastructure Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              IoT Network & Operations Directorate
            </h1>
            <p className="text-xs text-slate-300">
              Monitoring 4,520 IoT Nodes • 1,248 Registered Farmers • 1,890 Monitored Farms
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>MQTT Broker: 12ms latency</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Six Primary Admin Metric Cards (Requested in prompt) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Metric 1: Total Farmers */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Farmers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{ADMIN_STATS.totalFarmers}</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">+14 this week</p>
        </div>

        {/* Metric 2: Total Farms */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Farms</span>
            <Server className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{ADMIN_STATS.totalFarms}</p>
          <p className="text-[10px] text-slate-400 mt-1">3,420 Hectares</p>
        </div>

        {/* Metric 3: Total Sensors */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Sensors</span>
            <Radio className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{ADMIN_STATS.totalSensors}</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">98.4% Online</p>
        </div>

        {/* Metric 4: Active Irrigation Systems */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Active Pumps</span>
            <Droplets className="w-4 h-4 text-cyan-600" />
          </div>
          <p className="text-2xl font-extrabold text-cyan-700">{ADMIN_STATS.activeIrrigationSystems}</p>
          <p className="text-[10px] text-cyan-700 font-semibold mt-1">Auto-throttled</p>
        </div>

        {/* Metric 5: Disease Reports */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Disease Reports</span>
            <ScanSearch className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-extrabold text-rose-600">{ADMIN_STATS.diseaseReportsResolved}</p>
          <p className="text-[10px] text-slate-400 mt-1">14 open inquiries</p>
        </div>

        {/* Metric 6: System Alerts */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>System Alerts</span>
            <BellRing className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600">{ADMIN_STATS.systemAlerts}</p>
          <p className="text-[10px] text-slate-400 mt-1">All minor/logged</p>
        </div>

      </div>

      {/* 3. IoT Network Health & Telemetry Throughput Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Gateway Packet Traffic Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">LoRaWAN Gateway Packet Frequency</h2>
              <p className="text-xs text-slate-500">Hourly telemetry payloads processed by edge receivers</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              99.98% Deliverability
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { hour: '02:00', packets: 4200 },
                  { hour: '04:00', packets: 3900 },
                  { hour: '06:00', packets: 6800 },
                  { hour: '08:00', packets: 9200 },
                  { hour: '10:00', packets: 11400 },
                  { hour: '12:00', packets: 12800 },
                  { hour: '14:00', packets: 12200 },
                  { hour: '16:00', packets: 10500 },
                  { hour: '18:00', packets: 8900 },
                  { hour: '20:00', packets: 6100 }
                ]}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0', 
                    fontSize: '12px' 
                  }} 
                />
                <Bar dataKey="packets" name="Telemetry Packets" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sensor Node Health Distribution */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Hardware Fleet Status</h2>
            <p className="text-xs text-slate-500">4,520 Field Probes & Actuators</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sensorHealthDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                >
                  {sensorHealthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {sensorHealthDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. IoT Sensor Nodes Management Table (Prompt Requirement) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Field IoT Nodes Management</h2>
            <p className="text-xs text-slate-500">Live hardware telemetry status & remote override</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchSensor}
              onChange={(e) => setSearchSensor(e.target.value)}
              placeholder="Search node or farmer..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Node Identifier</th>
                <th className="py-3 px-4">Farm / Owner</th>
                <th className="py-3 px-4">Sensor Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Battery</th>
                <th className="py-3 px-4">Latest Stream</th>
                <th className="py-3 px-4 text-right">Toggle Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSensors.map(node => (
                <tr key={node.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {node.nodeName}
                    <span className="block text-[10px] text-slate-400">{node.id} • {node.firmware}</span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-800">{node.farmName}</p>
                    <p className="text-[11px] text-slate-500">{node.farmer}</p>
                  </td>
                  <td className="py-3 px-4">{node.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      node.status === 'Online'
                        ? 'bg-emerald-100 text-emerald-800'
                        : node.status === 'Alert'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {node.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${node.battery < 30 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {node.battery}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px] truncate max-w-xs">
                    {node.lastReading}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleSensorStatus(node.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        node.status === 'Online'
                          ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                          : 'border-slate-200 text-slate-400 hover:bg-slate-100'
                      }`}
                      title="Toggle Sensor Node State"
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
