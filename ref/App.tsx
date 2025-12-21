
import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Server, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  LineChart, 
  BrainCircuit, 
  FileSearch,
  LayoutDashboard,
  GraduationCap,
  MessageSquareQuote,
  ArrowRight,
  Globe,
  Minus
} from 'lucide-react';
import { PlanData, ComparisonMetric } from './types';

const App: React.FC = () => {
  const plans: PlanData[] = [
    {
      id: 'basic',
      name: 'Essential',
      subtitle: '數位教學基石',
      price: 'HK$38,999',
      pricePeriod: '/ 年 / 每校',
      description: '為學校建立穩健的數位作業管理體系，實現教學資源的雲端化與結構化。',
      highlightColor: 'bg-slate-700',
      buttonText: '了解基礎方案',
      features: [],
    },
    {
      id: 'standard',
      name: 'Professional',
      subtitle: 'AI 原生賦能教學',
      price: 'HK$78,999',
      pricePeriod: '起 / 年 / 每校',
      description: '全校級 AI 轉型首選。深度集成智谱 AI 等教育大模型，提供全流程自動化體驗。',
      isPopular: true,
      highlightColor: 'bg-blue-600',
      buttonText: '啟動 AI 轉型',
      features: [],
    },
    {
      id: 'premium',
      name: 'Enterprise',
      subtitle: '校園私有化 AI 中心',
      price: 'HK$218,999',
      pricePeriod: '起 (首年含硬件)',
      description: '為領航學校打造，建立校內專屬 AI 算力中心，確保極致隱私與極速性能。',
      highlightColor: 'bg-indigo-900',
      buttonText: '預約專家諮詢',
      features: [],
    },
  ];

  // Grouped Comparison Data
  const comparisonData = [
    {
      category: '教學管理基石',
      items: [
        { feature: '智能班級/作業生命週期管理', e: 'check', p: 'check', t: 'check' },
        { feature: '高精度 OCR 題目識別模組', e: 'check', p: 'check', t: 'check' },
        { feature: '基礎學情數據統計報表', e: 'check', p: 'check', t: 'check' },
      ]
    },
    {
      category: 'AI 原生賦能',
      items: [
        { feature: '智谱 AI 專屬教育模型驅動', e: 'minus', p: 'check', t: 'check' },
        { feature: 'AI Quiz Builder (自動化生題)', e: 'cross', p: 'check', t: 'check' },
        { feature: 'AI 批改 Agent (支援複雜語法評分)', e: 'cross', p: 'check', t: 'check' },
      ]
    },
    {
      category: '引導式學習',
      items: [
        { feature: 'Socratic 學生引導導師', e: 'cross', p: 'check', t: 'check' },
        { feature: '個人化動態分析與錯題推送', e: 'cross', p: 'check', t: 'check' },
      ]
    },
    {
      category: '架構與安全性',
      items: [
        { feature: '數據存儲模式', e: '雲端', p: '雲端/專用', t: '私有化部署' },
        { feature: 'GPU 本地算力硬件集群', e: 'cross', p: 'cross', t: 'check' },
        { feature: '支援內網離線運行模式', e: 'cross', p: 'cross', t: 'check' },
      ]
    }
  ];

  const renderIcon = (val: string) => {
    if (val === 'check') return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (val === 'cross') return <X className="w-5 h-5 text-slate-200 mx-auto" />;
    if (val === 'minus') return <Minus className="w-5 h-5 text-slate-300 mx-auto" />;
    return <span className="text-xs font-bold text-slate-700">{val}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Insight <span className="text-blue-600">AI</span></span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">核心優勢</a>
            <a href="#plans" className="hover:text-blue-600 transition-colors">方案選擇</a>
            <a href="#table" className="hover:text-blue-600 transition-colors">功能全覽</a>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">
            預約演示
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-white pt-20 pb-20 overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
            Zhipu AI x Insight AI
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            讓 AI 真正落地課堂
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 mb-4 leading-relaxed font-medium">
            我們提供專業教育 AI 模型底座，為學校打包 OCR、自動評分、引導學習等原生模組。
          </p>
          <p className="max-w-3xl mx-auto text-lg text-slate-500 mb-12">
            不僅是管理工具，更是賦能每一位師生的智能教學夥伴。
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-24 mt-20">
        {/* Pricing Cards */}
        <div id="plans" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative flex flex-col bg-white rounded-3xl transition-all duration-500 hover:-translate-y-2 border ${plan.isPopular ? 'border-blue-600 shadow-2xl ring-4 ring-blue-50 scale-105 z-10' : 'border-slate-200 shadow-sm'}`}
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-blue-600 font-semibold text-sm">{plan.subtitle}</p>
                  </div>
                  {plan.isPopular && <Zap className="w-6 h-6 text-blue-600 fill-blue-600" />}
                </div>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-slate-500 text-sm">{plan.pricePeriod}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 min-h-[3rem]">
                  {plan.description}
                </p>
                <button className={`w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center ${plan.highlightColor}`}>
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table Section */}
        <section id="table" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">方案功能全覽</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">清晰的功能進階路徑，助您根據學校發展階段選擇最合適的 AI 夥伴。</p>
          </div>
          <div className="overflow-hidden bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 max-w-5xl mx-auto">
            <table className="w-full text-center border-collapse table-fixed">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-8 py-8 text-left text-sm font-bold text-slate-400 uppercase tracking-widest w-1/2 md:w-2/5">功能詳情</th>
                  <th className="px-4 py-8 text-sm font-bold text-slate-900 border-l border-slate-100">Essential</th>
                  <th className="px-4 py-8 text-sm font-bold text-blue-600 bg-blue-50/40 border-l border-slate-100">Professional</th>
                  <th className="px-4 py-8 text-sm font-bold text-indigo-900 border-l border-slate-100">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {/* Category Header Row */}
                    <tr className="bg-slate-50/40">
                      <td colSpan={4} className="px-8 py-3 text-left">
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{group.category}</span>
                      </td>
                    </tr>
                    {group.items.map((item, iIdx) => (
                      <tr key={`${gIdx}-${iIdx}`} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-10 py-5 text-left">
                          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors">{item.feature}</span>
                        </td>
                        <td className="px-4 py-5 border-l border-slate-100/50">{renderIcon(item.e)}</td>
                        <td className="px-4 py-5 bg-blue-50/10 border-l border-slate-100/50">{renderIcon(item.p)}</td>
                        <td className="px-4 py-5 border-l border-slate-100/50">{renderIcon(item.t)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-8 bg-slate-100/60 rounded-3xl border border-slate-200/50">
               <h5 className="font-bold text-slate-800 mb-3 flex items-center">
                 <div className="w-2 h-2 rounded-full bg-slate-400 mr-2"></div>
                 Essential 適合：
               </h5>
               <p className="text-sm text-slate-600 leading-relaxed">已有數位教材基礎，僅需更高效的作業生命週期管理與基礎自動批改模組的學校。</p>
             </div>
             <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 shadow-sm">
               <h5 className="font-bold text-blue-800 mb-3 flex items-center">
                 <div className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></div>
                 Professional 適合：
               </h5>
               <p className="text-sm text-blue-700 leading-relaxed">追求教學質變，希望全面應用 AI 實現自動出題、高階批改及引導式學習的轉型領先學校。</p>
             </div>
             <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
               <h5 className="font-bold text-indigo-800 mb-3 flex items-center">
                 <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
                 Enterprise 適合：
               </h5>
               <p className="text-sm text-indigo-700 leading-relaxed">對數據安全與算力性能有極致要求，希望建立校內私有 AI 集群與專屬知識庫的標竿學校。</p>
             </div>
          </div>
        </section>

        {/* Core Competencies Grid */}
        <section id="features" className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">核心競爭力</h2>
            <p className="text-slate-500">為什麼領先學校選擇 Insight AI 作為長期合作夥伴</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: <Globe className="w-7 h-7" />,
                title: "專業級教育模型",
                desc: "與智谱 AI 深度合作，基於海量教學語料微調，精準理解教學場景與學科邏輯。",
                color: "bg-blue-100 text-blue-700"
              },
              {
                icon: <FileSearch className="w-7 h-7" />,
                title: "開箱即用模塊",
                desc: "內建高精度 OCR、智能 Quiz 生成與複雜題型自動評分，無需複雜操作，開啟即賦能。",
                color: "bg-emerald-100 text-emerald-700"
              },
              {
                icon: <LayoutDashboard className="w-7 h-7" />,
                title: "原生管理生態",
                desc: "教學管理系統內生 AI 數據引擎，自動追踪分析學生學情，讓教學決策更有據可依。",
                color: "bg-orange-100 text-orange-700"
              },
              {
                icon: <GraduationCap className="w-7 h-7" />,
                title: "引導式 AI 學習",
                desc: "獨創 Socratic 導師互動模式，引導學生思考而非給出答案，實現真正的智慧教學。",
                color: "bg-purple-100 text-purple-700"
              }
            ].map((feature, i) => (
              <div key={i} className="group p-10 bg-white rounded-[2.5rem] border border-slate-200 hover:shadow-2xl hover:border-blue-100 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 rounded-[3.5rem] p-20 md:p-28 text-white text-center relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight">讓 AI 成為課堂上的可靠夥伴</h2>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-14 leading-relaxed">
              Insight AI 不僅是技術的集成，更是教育理念的延伸。
              <br className="hidden md:block" />我們與學校深度共創，確保 AI 真正轉化為教學效率與學生獲得感。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/40 text-lg transform hover:scale-[1.02]">
                預約演示校內方案
              </button>
              <button className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all text-lg">
                領取轉型白皮書
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="bg-blue-600 p-1 rounded-lg">
               <BrainCircuit className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Insight <span className="text-blue-600">AI</span></span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-10 font-medium">
            專為中小學量身定制的 AI 教育管理生態平台。
          </p>
          <div className="pt-10 border-t border-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2025 Insight AI Education Technology Limited. Hong Kong Science Park.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
