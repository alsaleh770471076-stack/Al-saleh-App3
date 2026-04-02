import React, { useState, useEffect, useMemo } from 'react';
import { 
  Truck, 
  ShoppingBasket, 
  Users, 
  Sprout, 
  Container, 
  Wallet, 
  Warehouse, 
  HandCoins,
  Home,
  BarChart3,
  Settings,
  TrendingUp,
  Coins,
  LogOut,
  User,
  LogIn,
  Calendar,
  CreditCard,
  Search,
  Moon,
  Youtube,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Banknote,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { 
  Supplier, 
  Transporter, 
  Customer, 
  InwardBatch, 
  Sale, 
  Transfer, 
  QatItem,
  TransportType,
  PaymentType
} from './types';

// --- Local Storage Helpers ---
const STORAGE_KEY = 'alsaleh_pro_data';

const loadData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const data = JSON.parse(saved);
    // Ensure legacy customers have preferences array
    if (data.customers) {
      data.customers = data.customers.map((c: any) => ({
        ...c,
        preferences: c.preferences || []
      }));
    }
    return data;
  }
  return {
    suppliers: [],
    transporters: [],
    customers: [],
    inwardBatches: [],
    sales: [],
    transfers: []
  };
};

const saveData = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// --- Components ---

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 transition-all duration-500 relative group",
      active ? "text-[#fbbf24] scale-110" : "text-emerald-100/40 hover:text-emerald-100/60"
    )}
  >
    {active && (
      <motion.div 
        layoutId="nav-glow"
        className="absolute -top-2 w-8 h-8 bg-[#fbbf24]/20 blur-xl rounded-full"
      />
    )}
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);

const QuickActionButton = ({ icon: Icon, label, color, onClick, primary }: { icon: any, label: string, color: string, onClick?: () => void, primary?: boolean }) => (
  <motion.button
    whileHover={{ 
      scale: 1.08,
      boxShadow: primary 
        ? "0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(251,191,36,0.2)"
        : "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(251,191,36,0.1)"
    }}
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    className={cn(
      "flex-1 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 border shadow-2xl relative overflow-hidden group transition-all duration-500",
      primary ? "h-32 border-[#fbbf24]/30 bg-gradient-to-br from-emerald-900/80 to-emerald-950/90" : "h-24 border-white/10 bg-white/5 backdrop-blur-2xl",
      color
    )}
  >
    {/* Shine Effect */}
    <motion.div 
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={cn(
        "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none",
        primary ? "opacity-40" : "opacity-20"
      )}
    />
    
    <div className={cn(
      "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
      primary && "from-[#fbbf24]/10"
    )} />
    
    <div className={cn(
      "transition-all duration-500 z-10",
      primary ? "text-[#fbbf24] group-hover:scale-125 group-hover:rotate-12" : "text-white group-hover:scale-110"
    )}>
      <Icon size={primary ? 32 : 24} />
    </div>
    <span className={cn(
      "font-black tracking-[0.1em] uppercase z-10 transition-colors duration-500",
      primary ? "text-sm text-[#fbbf24]" : "text-[10px] text-white/90"
    )}>{label}</span>
    
    {/* Bottom Glow */}
    <div className={cn(
      "absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
      primary ? "via-[#fbbf24]/60" : "via-white/20"
    )} />
  </motion.button>
);

const GridItem = ({ icon: Icon, label, badge, onClick, value = "0" }: { icon: any, label: string, badge?: boolean, onClick?: () => void, value?: string }) => (
  <motion.button
    whileHover={{ 
      scale: 1.05, 
      y: -8,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
    }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="relative aspect-[4/3] rounded-[2.5rem] backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 group shadow-2xl transition-colors duration-500"
  >
    {badge && (
      <span className="absolute top-6 right-6 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pulse z-20" />
    )}
    
    {/* Subtle Inner Glow */}
    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#fbbf24]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="text-[#fbbf24] group-hover:scale-125 group-hover:-rotate-3 transition-all duration-700 ease-out z-10">
      <div className="relative">
        <Icon size={40} />
        {/* Icon Glow */}
        <div className="absolute inset-0 blur-xl bg-[#fbbf24]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
    
    <div className="flex flex-col items-center gap-1 z-10">
      <span className="text-sm font-black text-white tracking-tight group-hover:text-[#fbbf24] transition-colors duration-500">{label}</span>
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-emerald-400/40" />
        <span className="text-[10px] font-black text-emerald-400/40 uppercase tracking-widest">{value}</span>
      </div>
    </div>

    {/* Border Highlight */}
    <div className="absolute inset-0 border border-[#fbbf24]/0 group-hover:border-[#fbbf24]/20 rounded-[2.5rem] transition-all duration-500" />
  </motion.button>
);

const SidebarItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-right group"
  >
    <div className="text-[#fbbf24] group-hover:scale-110 transition-transform">
      <Icon size={20} />
    </div>
    <span className="text-sm font-medium text-emerald-50/80">{label}</span>
  </button>
);

// --- Main Dashboard ---

function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Data State
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inwardBatches, setInwardBatches] = useState<InwardBatch[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  // Modal States
  const [showInwardModal, setShowInwardModal] = useState(false);
  const [showOutwardModal, setShowOutwardModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showEntityModal, setShowEntityModal] = useState<'supplier' | 'customer' | 'transporter' | 'expenses' | 'assets' | null>(null);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [transporterSearch, setTransporterSearch] = useState('');
  const [showSupplierList, setShowSupplierList] = useState(false);
  const [showTransporterList, setShowTransporterList] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form States
  const [customerForm, setCustomerForm] = useState({
    name: '',
    preferences: [] as string[],
    balance: 0
  });

  const [inwardForm, setInwardForm] = useState({
    supplierId: '',
    transporterId: '',
    transportType: 'weight' as TransportType,
    transportRate: 0,
    transportValue: 0, // weight or count
    items: [{ name: '', quantity: 0, price: 0 }] as QatItem[],
    notes: ''
  });

  const [outwardForm, setOutwardForm] = useState({
    customerId: 'cash',
    paymentType: 'cash' as PaymentType,
    paidAmount: 0,
    items: [{ name: '', quantity: 0, price: 0 }] as QatItem[],
    notes: ''
  });

  const [transferForm, setTransferForm] = useState({
    type: 'to_supplier' as 'to_supplier' | 'from_customer',
    entityId: '',
    amount: 0,
    bankName: 'شركة صرافة'
  });

  // Load Data on Mount
  useEffect(() => {
    const data = loadData();
    setSuppliers(data.suppliers);
    setTransporters(data.transporters);
    setCustomers(data.customers);
    setInwardBatches(data.inwardBatches);
    setSales(data.sales);
    setTransfers(data.transfers);

    // If empty, add the user's example data
    if (data.suppliers.length === 0) {
      const initialData = {
        suppliers: [
          { id: 's1', name: 'احمد حسين شعوف', phone: '777111222', balance: 0 },
          { id: 's2', name: 'سعد الجعبسي', phone: '777333444', balance: 0 },
          { id: 's3', name: 'عبدالمجيد', phone: '777555666', balance: 0 }
        ],
        transporters: [
          { id: 't1', name: 'احمد البرطي', carNumber: '1234', balance: 0 },
          { id: 't2', name: 'سليم دهقم', carNumber: '5678', balance: 0 },
          { id: 't3', name: 'ياسر النقيب', carNumber: '9012', balance: 0 }
        ],
        customers: [
          { id: 'c1', name: 'يوسف الكهربي', preferences: ['وكالة'], balance: 0 },
          { id: 'c2', name: 'الحزام السماوي', preferences: ['تخازين'], balance: 0 },
          { id: 'c3', name: 'أواب', preferences: ['نورالدين'], balance: 0 },
          { id: 'c4', name: 'ابو زكريا', preferences: ['نورالدين'], balance: 0 }
        ],
        inwardBatches: [],
        sales: [],
        transfers: []
      };
      saveData(initialData);
      setSuppliers(initialData.suppliers);
      setTransporters(initialData.transporters);
      setCustomers(initialData.customers);
    }
  }, []);

  // --- Calculations ---
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayInward = inwardBatches
      .filter(b => b.date.startsWith(today))
      .reduce((acc, b) => acc + b.items.reduce((sum, item) => sum + item.quantity, 0), 0);
    
    const todaySales = sales
      .filter(s => s.date.startsWith(today))
      .reduce((acc, s) => acc + s.items.reduce((sum, item) => sum + item.quantity, 0), 0);

    const totalRevenues = sales.reduce((acc, s) => acc + s.totalAmount, 0);
    const totalPaid = sales.reduce((acc, s) => acc + s.paidAmount, 0);
    const totalPurchaseValue = inwardBatches.reduce((acc, b) => acc + b.totalPurchase, 0);
    const totalExpenses = inwardBatches.reduce((acc, b) => acc + b.transportTotal, 0);
    const netProfit = totalRevenues - totalPurchaseValue - totalExpenses;

    return { todayInward, todaySales, totalRevenues, totalExpenses, netProfit, totalPaid };
  }, [inwardBatches, sales]);

  // --- Handlers ---

  const handleInwardSubmit = () => {
    const totalPurchase = inwardForm.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const transportTotal = inwardForm.transportType === 'weight' 
      ? inwardForm.transportValue * inwardForm.transportRate 
      : inwardForm.transportValue * inwardForm.transportRate; // Same logic if rate is per unit

    const newBatch: InwardBatch = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...inwardForm,
      transportTotal,
      totalPurchase
    };

    const updatedInward = [newBatch, ...inwardBatches];
    
    // Update Balances
    const updatedSuppliers = suppliers.map(s => 
      s.id === inwardForm.supplierId ? { ...s, balance: s.balance + totalPurchase } : s
    );
    const updatedTransporters = transporters.map(t => 
      t.id === inwardForm.transporterId ? { ...t, balance: t.balance + transportTotal } : t
    );

    const newData = { ...loadData(), inwardBatches: updatedInward, suppliers: updatedSuppliers, transporters: updatedTransporters };
    saveData(newData);
    setInwardBatches(updatedInward);
    setSuppliers(updatedSuppliers);
    setTransporters(updatedTransporters);
    setShowInwardModal(false);
    setInwardForm({
      supplierId: '',
      transporterId: '',
      transportType: 'weight',
      transportRate: 0,
      transportValue: 0,
      items: [{ name: '', quantity: 0, price: 0 }],
      notes: ''
    });
  };

  const handleSaleSubmit = () => {
    const totalAmount = outwardForm.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const remainingAmount = totalAmount - outwardForm.paidAmount;

    const newSale: Sale = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...outwardForm,
      totalAmount,
      remainingAmount
    };

    const updatedSales = [newSale, ...sales];

    // Update Customer Balance if debt
    let updatedCustomers = customers;
    if (outwardForm.customerId !== 'cash' && remainingAmount > 0) {
      updatedCustomers = customers.map(c => 
        c.id === outwardForm.customerId ? { ...c, balance: c.balance + remainingAmount } : c
      );
    }

    const newData = { ...loadData(), sales: updatedSales, customers: updatedCustomers };
    saveData(newData);
    setSales(updatedSales);
    setCustomers(updatedCustomers);
    setShowOutwardModal(false);
    setOutwardForm({
      customerId: 'cash',
      paymentType: 'cash',
      paidAmount: 0,
      items: [{ name: '', quantity: 0, price: 0 }],
      notes: ''
    });
  };

  const handleTransferSubmit = () => {
    const newTransfer: Transfer = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...transferForm
    };

    const updatedTransfers = [newTransfer, ...transfers];
    
    let updatedSuppliers = suppliers;
    let updatedCustomers = customers;

    if (transferForm.type === 'to_supplier') {
      updatedSuppliers = suppliers.map(s => 
        s.id === transferForm.entityId ? { ...s, balance: s.balance - transferForm.amount } : s
      );
    } else {
      updatedCustomers = customers.map(c => 
        c.id === transferForm.entityId ? { ...c, balance: c.balance - transferForm.amount } : c
      );
    }

    const newData = { ...loadData(), transfers: updatedTransfers, suppliers: updatedSuppliers, customers: updatedCustomers };
    saveData(newData);
    setTransfers(updatedTransfers);
    setSuppliers(updatedSuppliers);
    setCustomers(updatedCustomers);
    setShowTransferModal(false);
    setTransferForm({
      type: 'to_supplier',
      entityId: '',
      amount: 0,
      bankName: 'شركة صرافة'
    });
  };

  const handleCustomerSubmit = () => {
    let updatedCustomers: Customer[];
    if (editingCustomer) {
      updatedCustomers = customers.map(c => 
        c.id === editingCustomer.id ? { ...editingCustomer, ...customerForm } : c
      );
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...customerForm
      };
      updatedCustomers = [newCustomer, ...customers];
    }

    const newData = { ...loadData(), customers: updatedCustomers };
    saveData(newData);
    setCustomers(updatedCustomers);
    setShowAddCustomerModal(false);
    setEditingCustomer(null);
    setCustomerForm({ name: '', preferences: [], balance: 0 });
  };

  const handleCustomerSelection = (cid: string) => {
    const customer = customers.find(c => c.id === cid);
    if (customer && customer.preferences && customer.preferences.length > 0) {
      setOutwardForm(prev => ({
        ...prev,
        customerId: cid,
        items: customer.preferences.map(pref => ({ name: pref, quantity: 0, price: 0 }))
      }));
    } else {
      setOutwardForm(prev => ({ 
        ...prev, 
        customerId: cid,
        items: [{ name: '', quantity: 0, price: 0 }] 
      }));
    }
  };

  const closeEntityModal = () => {
    setShowEntityModal(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[#062c1e] text-emerald-50 font-sans selection:bg-[#fbbf24]/30 overflow-x-hidden" dir="rtl">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-800/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-72 bg-emerald-950 border-l border-white/10 z-[120] shadow-2xl overflow-y-auto custom-scrollbar"
            >
              <div className="p-6 border-b border-white/10 bg-gradient-to-br from-emerald-900 to-emerald-950">
                <h2 className="text-xl font-black text-white text-right">نظام الصالح المحاسبي</h2>
                <p className="text-[10px] text-[#fbbf24] font-bold mt-1">ابتكار تجارة القات</p>
              </div>
              <div className="py-2">
                <SidebarItem icon={Home} label="الرئيسية" onClick={() => { setActiveTab('home'); setShowSidebar(false); }} />
                <SidebarItem icon={Truck} label="سجل الوارد" onClick={() => { setActiveTab('reports'); setShowSidebar(false); }} />
                <SidebarItem icon={ShoppingBasket} label="سجل المصرف" onClick={() => { setActiveTab('reports'); setShowSidebar(false); }} />
                <div className="h-px bg-white/5 my-2 mx-4" />
                <SidebarItem icon={Users} label="دليل العملاء" onClick={() => { setShowEntityModal('customer'); setShowSidebar(false); }} />
                <SidebarItem icon={Sprout} label="دليل الموردين" onClick={() => { setShowEntityModal('supplier'); setShowSidebar(false); }} />
                <SidebarItem icon={Container} label="دليل المحملين" onClick={() => { setShowEntityModal('transporter'); setShowSidebar(false); }} />
                <div className="h-px bg-white/5 my-2 mx-4" />
                <SidebarItem icon={Banknote} label="حوالات شركة صرافة" onClick={() => { setShowTransferModal(true); setShowSidebar(false); }} />
                <SidebarItem icon={BarChart3} label="الرسوم البيانية" />
                <SidebarItem icon={Settings} label="الإعدادات" onClick={() => { setActiveTab('settings'); setShowSidebar(false); }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-40 relative z-10">
        {/* Header */}
        <header className="p-6 pt-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-2xl bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowSidebar(true)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="w-5 h-0.5 bg-white" />
                    <div className="w-5 h-0.5 bg-white" />
                    <div className="w-5 h-0.5 bg-white" />
                  </div>
                </button>
                <div>
                  <h1 className="text-lg font-black tracking-tighter text-white leading-none mb-1">الصالح حساب قات</h1>
                  <p className="text-emerald-400/60 text-[10px] font-medium uppercase tracking-[0.2em]">أهلاً بك يا مقوت</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-white/50 hover:text-white transition-colors">
                  <Search size={20} />
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <Moon size={20} />
                </button>
                <button className="text-white/50 hover:text-white transition-colors">
                  <Youtube size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowDownLeft size={14} className="text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400/60 uppercase">الوارد اليوم</span>
                </div>
                <p className="text-2xl font-black text-white">{stats.todayInward} <span className="text-xs font-normal opacity-50">حبة</span></p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowUpRight size={14} className="text-[#fbbf24]" />
                  <span className="text-[10px] font-bold text-[#fbbf24]/60 uppercase">المصرف اليوم</span>
                </div>
                <p className="text-2xl font-black text-white">{stats.todaySales} <span className="text-xs font-normal opacity-50">حبة</span></p>
              </div>
            </div>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 space-y-8"
            >
              {/* Quick Actions */}
              <section className="grid grid-cols-2 gap-4">
                <QuickActionButton 
                  icon={Truck} 
                  label="وارد جديد" 
                  primary
                  color="hover:shadow-emerald-500/30" 
                  onClick={() => setShowInwardModal(true)}
                />
                <QuickActionButton 
                  icon={ShoppingBasket} 
                  label="مصرف جديد" 
                  primary
                  color="hover:shadow-[#fbbf24]/30" 
                  onClick={() => setShowOutwardModal(true)}
                />
              </section>
              <section className="grid grid-cols-1">
                <QuickActionButton 
                  icon={Banknote} 
                  label="حوالة صراف (شركة صرافة)" 
                  color="hover:shadow-blue-500/20" 
                  onClick={() => setShowTransferModal(true)}
                />
              </section>

              {/* Management Grid */}
              <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-sm font-bold text-emerald-400/60 uppercase tracking-widest">الإدارة المركزية</h2>
                  <div className="h-px flex-1 mx-4 bg-white/5" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <GridItem icon={Users} label="العملاء" value={customers.length.toString()} onClick={() => setShowEntityModal('customer')} />
                  <GridItem icon={Sprout} label="الموردين" value={suppliers.length.toString()} onClick={() => setShowEntityModal('supplier')} />
                  <GridItem icon={HandCoins} label="المصاريف" value={stats.totalExpenses.toLocaleString()} onClick={() => setShowEntityModal('expenses')} />
                  <GridItem icon={Users} label="المحملين" value={transporters.length.toString()} onClick={() => setShowEntityModal('transporter')} />
                  <GridItem icon={TrendingUp} label="المبيعات" value={sales.length.toString()} onClick={() => setActiveTab('reports')} />
                  <GridItem icon={ShoppingBasket} label="المشتريات" value={inwardBatches.length.toString()} onClick={() => setActiveTab('reports')} />
                  <GridItem icon={Warehouse} label="الأصول" value="0" onClick={() => setShowEntityModal('assets')} />
                  <GridItem icon={Wallet} label="الحوالات" value={transfers.length.toString()} onClick={() => setActiveTab('reports')} />
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 space-y-6"
            >
              <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setActiveTab('home')}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowRight size={18} />
                    </button>
                    <h3 className="text-lg font-bold text-white">سجل العمليات</h3>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="text"
                        placeholder="بحث..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl py-2 pr-9 pl-3 text-white text-[10px] focus:outline-none focus:border-[#fbbf24]/50 transition-colors w-32"
                      />
                    </div>
                    <button 
                      onClick={() => {
                      const csvRows = [];
                      // Header
                      csvRows.push(['Type', 'Entity', 'Date', 'Amount', 'Notes'].join(','));
                      
                      // Sales
                      sales.forEach(s => {
                        const name = customers.find(c => c.id === s.customerId)?.name || 'نقدي';
                        csvRows.push(['Outward', name, new Date(s.date).toLocaleDateString(), s.totalAmount, s.notes || ''].join(','));
                      });
                      
                      // Inward
                      inwardBatches.forEach(b => {
                        const name = suppliers.find(s => s.id === b.supplierId)?.name || 'Unknown';
                        csvRows.push(['Inward', name, new Date(b.date).toLocaleDateString(), b.totalPurchase, b.notes || ''].join(','));
                      });
                      
                      // Transfers
                      transfers.forEach(t => {
                        const name = t.type === 'to_supplier' 
                          ? suppliers.find(s => s.id === t.entityId)?.name 
                          : customers.find(c => c.id === t.entityId)?.name;
                        csvRows.push(['Transfer', name, new Date(t.date).toLocaleDateString(), t.amount, t.bankName].join(','));
                      });

                      const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `alsaleh_report_${new Date().toISOString().split('T')[0]}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#fbbf24] text-emerald-950 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <BarChart3 size={14} />
                    تصدير CSV
                  </button>
                </div>
              </div>
                
              <div className="space-y-4">
                  {sales
                    .filter(s => {
                      const name = customers.find(c => c.id === s.customerId)?.name || 'نقدي';
                      return name.toLowerCase().includes(searchTerm.toLowerCase()) || (s.notes || '').toLowerCase().includes(searchTerm.toLowerCase());
                    })
                    .map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-white">مصرف: {customers.find(c => c.id === s.customerId)?.name || 'نقدي'}</p>
                        <p className="text-[10px] text-emerald-100/30">{new Date(s.date).toLocaleDateString('ar-SA')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#fbbf24]">{s.totalAmount.toLocaleString()} SR</p>
                        <p className="text-[8px] text-emerald-100/30">مدفوع: {s.paidAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  {inwardBatches
                    .filter(b => {
                      const name = suppliers.find(s => s.id === b.supplierId)?.name || '';
                      return name.toLowerCase().includes(searchTerm.toLowerCase()) || (b.notes || '').toLowerCase().includes(searchTerm.toLowerCase());
                    })
                    .map((b, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-white">وارد: {suppliers.find(s => s.id === b.supplierId)?.name}</p>
                        <p className="text-[10px] text-emerald-100/30">{new Date(b.date).toLocaleDateString('ar-SA')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-emerald-400">{b.totalPurchase.toLocaleString()} SR</p>
                        <p className="text-[8px] text-emerald-100/30">نقل: {b.transportTotal.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  {transfers
                    .filter(t => {
                      const name = t.type === 'to_supplier' 
                        ? suppliers.find(s => s.id === t.entityId)?.name 
                        : customers.find(c => c.id === t.entityId)?.name;
                      return (name || '').toLowerCase().includes(searchTerm.toLowerCase()) || t.bankName.toLowerCase().includes(searchTerm.toLowerCase());
                    })
                    .map((t, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-white">
                          {t.type === 'to_supplier' ? 'حوالة لمورد: ' : 'استلام من زبون: '}
                          {t.type === 'to_supplier' 
                            ? suppliers.find(s => s.id === t.entityId)?.name 
                            : customers.find(c => c.id === t.entityId)?.name
                          }
                        </p>
                        <p className="text-[10px] text-emerald-100/30">{new Date(t.date).toLocaleDateString('ar-SA')} - {t.bankName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-blue-400">{t.amount.toLocaleString()} SR</p>
                        <p className="text-[8px] text-emerald-100/30">حوالة شركة صرافة</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Stats Bar */}
      <div className="fixed bottom-28 left-6 right-6 z-40">
        <div className="backdrop-blur-2xl bg-emerald-950/80 border border-white/10 rounded-2xl p-3 flex justify-between items-center shadow-2xl">
          <div className="flex flex-col items-center flex-1 border-l border-white/5">
            <span className="text-[8px] font-bold text-emerald-400/50 uppercase tracking-widest">الإيرادات</span>
            <span className="text-xs font-black text-white">{stats.totalRevenues.toLocaleString()} SR</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-l border-white/5">
            <span className="text-[8px] font-bold text-emerald-400/50 uppercase tracking-widest">المصروفات</span>
            <span className="text-xs font-black text-white">{stats.totalExpenses.toLocaleString()} SR</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[8px] font-bold text-emerald-400/50 uppercase tracking-widest">صافي الأرباح</span>
            <span className="text-xs font-black text-[#fbbf24]">{stats.netProfit.toLocaleString()} SR</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none z-50">
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="backdrop-blur-3xl bg-emerald-950/80 border border-white/10 rounded-[2.5rem] p-4 flex justify-around items-center shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <NavItem icon={Home} label="الرئيسية" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <NavItem icon={BarChart3} label="التقارير" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
            <NavItem icon={Settings} label="الإعدادات" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </div>
        </div>
      </nav>

      {/* --- Modals --- */}

      {/* Inward Modal */}
      <AnimatePresence>
        {showInwardModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInwardModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-emerald-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setShowInwardModal(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <LogOut size={20} className="rotate-180" />
                </button>
                <h2 className="text-2xl font-black text-white text-center flex-1">تسجيل وارد جديد</h2>
              </div>
              
              <div className="space-y-6">
                {/* Supplier & Transporter */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 relative">
                    <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest px-1">المورد (الزارعي)</label>
                    <div className="relative">
                      <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="text"
                        placeholder="بحث عن مورد..."
                        value={inwardForm.supplierId ? suppliers.find(s => s.id === inwardForm.supplierId)?.name : supplierSearch}
                        onFocus={() => {
                          setShowSupplierList(true);
                          if (inwardForm.supplierId) {
                            setInwardForm({...inwardForm, supplierId: ''});
                            setSupplierSearch('');
                          }
                        }}
                        onChange={(e) => setSupplierSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-9 text-white text-sm focus:outline-none focus:border-[#fbbf24]/50 transition-colors"
                      />
                    </div>
                    
                    {showSupplierList && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-emerald-900 border border-white/10 rounded-2xl shadow-2xl z-[210] max-h-48 overflow-y-auto custom-scrollbar">
                        {suppliers
                          .filter(s => s.name.toLowerCase().includes(supplierSearch.toLowerCase()))
                          .map(s => (
                            <button
                              key={s.id}
                              onClick={() => {
                                setInwardForm({...inwardForm, supplierId: s.id});
                                setShowSupplierList(false);
                                setSupplierSearch('');
                              }}
                              className="w-full p-3 text-right text-xs text-white hover:bg-white/10 border-b border-white/5 last:border-0"
                            >
                              {s.name}
                            </button>
                          ))
                        }
                        {suppliers.filter(s => s.name.toLowerCase().includes(supplierSearch.toLowerCase())).length === 0 && (
                          <div className="p-3 text-center text-[10px] text-white/30">لا يوجد نتائج</div>
                        )}
                      </div>
                    )}

                    {inwardForm.supplierId && (
                      <div className="mt-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                        <span className="text-[9px] text-emerald-400/50 uppercase">الرصيد الحالي (له):</span>
                        <span className="text-xs font-bold text-white">
                          {suppliers.find(s => s.id === inwardForm.supplierId)?.balance.toLocaleString()} SR
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest px-1">المحمل</label>
                    <div className="relative">
                      <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="text"
                        placeholder="بحث عن محمل..."
                        value={inwardForm.transporterId ? transporters.find(t => t.id === inwardForm.transporterId)?.name : transporterSearch}
                        onFocus={() => {
                          setShowTransporterList(true);
                          if (inwardForm.transporterId) {
                            setInwardForm({...inwardForm, transporterId: ''});
                            setTransporterSearch('');
                          }
                        }}
                        onChange={(e) => setTransporterSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-9 text-white text-sm focus:outline-none focus:border-[#fbbf24]/50 transition-colors"
                      />
                    </div>

                    {showTransporterList && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-emerald-900 border border-white/10 rounded-2xl shadow-2xl z-[210] max-h-48 overflow-y-auto custom-scrollbar">
                        {transporters
                          .filter(t => t.name.toLowerCase().includes(transporterSearch.toLowerCase()))
                          .map(t => (
                            <button
                              key={t.id}
                              onClick={() => {
                                setInwardForm({...inwardForm, transporterId: t.id});
                                setShowTransporterList(false);
                                setTransporterSearch('');
                              }}
                              className="w-full p-3 text-right text-xs text-white hover:bg-white/10 border-b border-white/5 last:border-0"
                            >
                              {t.name}
                            </button>
                          ))
                        }
                        {transporters.filter(t => t.name.toLowerCase().includes(transporterSearch.toLowerCase())).length === 0 && (
                          <div className="p-3 text-center text-[10px] text-white/30">لا يوجد نتائج</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Transport Details */}
                <div className="bg-white/5 p-4 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">تفاصيل النقل</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setInwardForm({...inwardForm, transportType: 'weight'})}
                        className={cn("px-3 py-1 rounded-lg text-[10px] font-bold transition-all", inwardForm.transportType === 'weight' ? "bg-[#fbbf24] text-emerald-950" : "bg-white/5 text-white/40")}
                      >بالوزن</button>
                      <button 
                        onClick={() => setInwardForm({...inwardForm, transportType: 'count'})}
                        className={cn("px-3 py-1 rounded-lg text-[10px] font-bold transition-all", inwardForm.transportType === 'count' ? "bg-[#fbbf24] text-emerald-950" : "bg-white/5 text-white/40")}
                      >بالعدد</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" 
                      placeholder={inwardForm.transportType === 'weight' ? "الوزن (كيلو)" : "العدد (حبة)"}
                      value={inwardForm.transportValue || ''}
                      onChange={(e) => setInwardForm({...inwardForm, transportValue: Number(e.target.value)})}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                    />
                    <input 
                      type="number" 
                      placeholder="السعر المتفق عليه"
                      value={inwardForm.transportRate || ''}
                      onChange={(e) => setInwardForm({...inwardForm, transportRate: Number(e.target.value)})}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest">الأصناف الواردة</span>
                    <button 
                      onClick={() => setInwardForm({...inwardForm, items: [...inwardForm.items, { name: '', quantity: 0, price: 0 }]})}
                      className="text-[#fbbf24] hover:scale-110 transition-transform"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  {inwardForm.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input 
                        placeholder="الصنف"
                        value={item.name}
                        onChange={(e) => {
                          const newItems = [...inwardForm.items];
                          newItems[idx].name = e.target.value;
                          setInwardForm({...inwardForm, items: newItems});
                        }}
                        className="col-span-5 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                      />
                      <input 
                        type="number"
                        placeholder="العدد"
                        value={item.quantity || ''}
                        onChange={(e) => {
                          const newItems = [...inwardForm.items];
                          newItems[idx].quantity = Number(e.target.value);
                          setInwardForm({...inwardForm, items: newItems});
                        }}
                        className="col-span-3 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                      />
                      <input 
                        type="number"
                        placeholder="السعر"
                        value={item.price || ''}
                        onChange={(e) => {
                          const newItems = [...inwardForm.items];
                          newItems[idx].price = Number(e.target.value);
                          setInwardForm({...inwardForm, items: newItems});
                        }}
                        className="col-span-3 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                      />
                      <button 
                        onClick={() => {
                          const newItems = inwardForm.items.filter((_, i) => i !== idx);
                          setInwardForm({...inwardForm, items: newItems});
                        }}
                        className="col-span-1 text-red-400/50 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total Display */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-400/60 uppercase">إجمالي قيمة المشتريات</span>
                  <span className="text-lg font-black text-white">
                    {inwardForm.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toLocaleString()} SR
                  </span>
                </div>

                {/* Notes Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest px-1">ملاحظات إضافية</label>
                  <textarea 
                    placeholder="أضف أي ملاحظات هنا..."
                    value={inwardForm.notes}
                    onChange={(e) => setInwardForm({...inwardForm, notes: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none min-h-[80px] resize-none"
                  />
                </div>

                <button 
                  onClick={handleInwardSubmit}
                  className="w-full py-5 rounded-2xl bg-[#fbbf24] text-emerald-950 font-black text-lg shadow-xl shadow-[#fbbf24]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  حفظ الوارد وتحديث الأرصدة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Outward Modal */}
      <AnimatePresence>
        {showOutwardModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOutwardModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-emerald-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setShowOutwardModal(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <LogOut size={20} className="rotate-180" />
                </button>
                <h2 className="text-2xl font-black text-white text-center flex-1">تسجيل مصرف جديد</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest px-1">الزبون / المشتري</label>
                  <select 
                    value={outwardForm.customerId}
                    onChange={(e) => handleCustomerSelection(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none"
                  >
                    <option value="cash">نقدي (كاش)</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest">الأصناف المباعة</span>
                    <button 
                      onClick={() => setOutwardForm({...outwardForm, items: [...outwardForm.items, { name: '', quantity: 0, price: 0 }]})}
                      className="text-[#fbbf24] hover:scale-110 transition-transform"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  {outwardForm.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input 
                        placeholder="الصنف"
                        value={item.name}
                        onChange={(e) => {
                          const newItems = [...outwardForm.items];
                          newItems[idx].name = e.target.value;
                          setOutwardForm({...outwardForm, items: newItems});
                        }}
                        className="col-span-5 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                      />
                      <input 
                        type="number"
                        placeholder="العدد"
                        value={item.quantity || ''}
                        onChange={(e) => {
                          const newItems = [...outwardForm.items];
                          newItems[idx].quantity = Number(e.target.value);
                          setOutwardForm({...outwardForm, items: newItems});
                        }}
                        className="col-span-3 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                      />
                      <input 
                        type="number"
                        placeholder="السعر"
                        value={item.price || ''}
                        onChange={(e) => {
                          const newItems = [...outwardForm.items];
                          newItems[idx].price = Number(e.target.value);
                          setOutwardForm({...outwardForm, items: newItems});
                        }}
                        className="col-span-3 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Total Display */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <span className="text-xs font-bold text-[#fbbf24]/60 uppercase">إجمالي قيمة المبيعات</span>
                  <span className="text-lg font-black text-white">
                    {outwardForm.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toLocaleString()} SR
                  </span>
                </div>

                <div className="bg-white/5 p-4 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">الدفع والتسديد</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setOutwardForm({...outwardForm, paymentType: 'cash'})}
                        className={cn("px-3 py-1 rounded-lg text-[10px] font-bold", outwardForm.paymentType === 'cash' ? "bg-[#fbbf24] text-emerald-950" : "bg-white/5 text-white/40")}
                      >نقدي</button>
                      <button 
                        onClick={() => setOutwardForm({...outwardForm, paymentType: 'debt'})}
                        className={cn("px-3 py-1 rounded-lg text-[10px] font-bold", outwardForm.paymentType === 'debt' ? "bg-[#fbbf24] text-emerald-950" : "bg-white/5 text-white/40")}
                      >آجل (دين)</button>
                    </div>
                  </div>
                  <input 
                    type="number" 
                    placeholder="المبلغ المدفوع حالياً"
                    value={outwardForm.paidAmount || ''}
                    onChange={(e) => setOutwardForm({...outwardForm, paidAmount: Number(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                  />
                </div>

                {/* Notes Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest px-1">ملاحظات إضافية</label>
                  <textarea 
                    placeholder="أضف أي ملاحظات هنا..."
                    value={outwardForm.notes}
                    onChange={(e) => setOutwardForm({...outwardForm, notes: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none min-h-[80px] resize-none"
                  />
                </div>

                <button 
                  onClick={handleSaleSubmit}
                  className="w-full py-5 rounded-2xl bg-[#fbbf24] text-emerald-950 font-black text-lg shadow-xl hover:scale-[1.02] transition-all"
                >
                  تأكيد البيع وتحديث الحساب
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Transfer Modal */}
      <AnimatePresence>
        {showTransferModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTransferModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-emerald-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setShowTransferModal(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <LogOut size={20} className="rotate-180" />
                </button>
                <h2 className="text-2xl font-black text-white text-center flex-1">حوالة مالية (شركة صرافة)</h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTransferForm({...transferForm, type: 'to_supplier'})}
                    className={cn("flex-1 py-3 rounded-xl text-xs font-bold", transferForm.type === 'to_supplier' ? "bg-[#fbbf24] text-emerald-950" : "bg-white/5 text-white/40")}
                  >إرسال لمورد</button>
                  <button 
                    onClick={() => setTransferForm({...transferForm, type: 'from_customer'})}
                    className={cn("flex-1 py-3 rounded-xl text-xs font-bold", transferForm.type === 'from_customer' ? "bg-[#fbbf24] text-emerald-950" : "bg-white/5 text-white/40")}
                  >استقبال من زبون</button>
                </div>

                <select 
                  value={transferForm.entityId}
                  onChange={(e) => setTransferForm({...transferForm, entityId: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none"
                >
                  <option value="">اختر {transferForm.type === 'to_supplier' ? 'المورد' : 'الزبون'}</option>
                  {transferForm.type === 'to_supplier' 
                    ? suppliers.map(s => <option key={s.id} value={s.id}>{s.name} (له: {s.balance})</option>)
                    : customers.map(c => <option key={c.id} value={c.id}>{c.name} (عليه: {c.balance})</option>)
                  }
                </select>

                <input 
                  type="number" 
                  placeholder="المبلغ"
                  value={transferForm.amount || ''}
                  onChange={(e) => setTransferForm({...transferForm, amount: Number(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none"
                />

                <input 
                  placeholder="عبر شركة / بنك"
                  value={transferForm.bankName}
                  onChange={(e) => setTransferForm({...transferForm, bankName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none"
                />

                <button 
                  onClick={handleTransferSubmit}
                  className="w-full py-5 rounded-2xl bg-[#fbbf24] text-emerald-950 font-black text-lg shadow-xl hover:scale-[1.02] transition-all"
                >
                  تأكيد الحوالة وتصفية الرصيد
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Entity Modal (Suppliers/Customers/Transporters List) */}
      <AnimatePresence>
        {showEntityModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeEntityModal} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-emerald-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[80vh] custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={closeEntityModal}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <LogOut size={20} className="rotate-180" />
                </button>
                <h2 className="text-2xl font-black text-white text-center flex-1">
                  {showEntityModal === 'supplier' ? 'دليل الموردين' : 
                   showEntityModal === 'customer' ? 'دليل العملاء' : 
                   showEntityModal === 'transporter' ? 'دليل المحملين' :
                   showEntityModal === 'expenses' ? 'سجل المصاريف' : 'سجل الأصول'}
                </h2>
                {showEntityModal === 'customer' && (
                  <button 
                    onClick={() => {
                      setEditingCustomer(null);
                      setCustomerForm({ name: '', preferences: [], balance: 0 });
                      setShowAddCustomerModal(true);
                    }}
                    className="w-10 h-10 rounded-xl bg-[#fbbf24] flex items-center justify-center text-emerald-950 hover:scale-110 transition-transform"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>

              {/* Search Bar */}
              {(showEntityModal === 'supplier' || showEntityModal === 'customer' || showEntityModal === 'transporter') && (
                <div className="mb-4 relative">
                  <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="text"
                    placeholder="ابحث بالاسم أو الرقم..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pr-11 pl-4 text-white text-xs focus:outline-none focus:border-[#fbbf24]/50 transition-colors"
                  />
                </div>
              )}

              <div className="space-y-3">
                {showEntityModal === 'expenses' && (
                  <div className="p-8 text-center space-y-4">
                    <HandCoins size={48} className="mx-auto text-[#fbbf24]/20" />
                    <p className="text-emerald-100/40 text-sm">لا توجد مصاريف إضافية مسجلة حالياً. يتم احتساب تكاليف النقل تلقائياً.</p>
                  </div>
                )}
                {showEntityModal === 'assets' && (
                  <div className="p-8 text-center space-y-4">
                    <Warehouse size={48} className="mx-auto text-[#fbbf24]/20" />
                    <p className="text-emerald-100/40 text-sm">قائمة الأصول الثابتة فارغة حالياً.</p>
                  </div>
                )}
                {(showEntityModal === 'supplier' ? suppliers : 
                  showEntityModal === 'customer' ? customers : 
                  showEntityModal === 'transporter' ? transporters : [])
                  .filter((item: any) => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    (item.phone && item.phone.includes(searchTerm)) ||
                    (item.carNumber && item.carNumber.includes(searchTerm))
                  )
                  .map((item: any, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      if (showEntityModal === 'customer') {
                        setEditingCustomer(item);
                        setCustomerForm({ name: item.name, preferences: item.preferences || [], balance: item.balance });
                        setShowAddCustomerModal(true);
                      }
                    }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{item.name}</p>
                      <p className="text-[10px] text-emerald-100/30">
                        {showEntityModal === 'customer' ? `المفضل: ${(item.preferences || []).join(', ')}` : (item.phone || item.carNumber)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-black", item.balance > 0 ? "text-red-400" : "text-emerald-400")}>
                        {item.balance.toLocaleString()} SR
                      </p>
                      <p className="text-[8px] text-emerald-100/30">
                        {showEntityModal === 'supplier' ? 'له' : showEntityModal === 'customer' ? 'عليه' : 'مستحقات'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Customer Modal */}
      <AnimatePresence>
        {showAddCustomerModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddCustomerModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-emerald-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setShowAddCustomerModal(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <LogOut size={20} className="rotate-180" />
                </button>
                <h2 className="text-2xl font-black text-white text-center flex-1">
                  {editingCustomer ? 'تعديل بيانات زبون' : 'إضافة زبون جديد'}
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest px-1">اسم الزبون</label>
                  <input 
                    placeholder="أدخل اسم الزبون الكامل"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest px-1">أنواع القات المفضلة</label>
                  <div className="flex flex-wrap gap-2">
                    {['وكالة', 'نورالدين', 'تخازين', 'جلكسي', 'عنسي', 'همداني'].map(pref => (
                      <button 
                        key={pref}
                        onClick={() => {
                          const newPrefs = customerForm.preferences.includes(pref)
                            ? customerForm.preferences.filter(p => p !== pref)
                            : [...customerForm.preferences, pref];
                          setCustomerForm({...customerForm, preferences: newPrefs});
                        }}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          customerForm.preferences.includes(pref) ? "bg-[#fbbf24] text-emerald-950" : "bg-white/5 text-white/40"
                        )}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest px-1">الرصيد الحالي (مدين)</label>
                  <input 
                    type="number"
                    placeholder="0"
                    value={customerForm.balance || ''}
                    onChange={(e) => setCustomerForm({...customerForm, balance: Number(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none"
                  />
                </div>

                <button 
                  onClick={handleCustomerSubmit}
                  className="w-full py-5 rounded-2xl bg-[#fbbf24] text-emerald-950 font-black text-lg shadow-xl hover:scale-[1.02] transition-all"
                >
                  {editingCustomer ? 'تحديث البيانات' : 'إضافة الزبون'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return <Dashboard />;
}
