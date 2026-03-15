import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { TrendingUp, Plus, Tag, Package, X } from 'lucide-react';

export const AdminDashboard = ({ onClose }: { onClose: () => void }) => {
  const [sales, setSales] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [newDeal, setNewDeal] = useState({ title: '', discount: 0 });

  useEffect(() => {
    const salesQuery = query(collection(db, 'sales'), orderBy('timestamp', 'desc'), limit(10));
    const unsubscribeSales = onSnapshot(salesQuery, (snapshot) => {
      setSales(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (e) => handleFirestoreError(e, OperationType.LIST, 'sales'));

    const dealsQuery = query(collection(db, 'deals'), orderBy('active', 'desc'));
    const unsubscribeDeals = onSnapshot(dealsQuery, (snapshot) => {
      setDeals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (e) => handleFirestoreError(e, OperationType.LIST, 'deals'));

    return () => {
      unsubscribeSales();
      unsubscribeDeals();
    };
  }, []);

  const handleAddDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'deals'), {
        ...newDeal,
        active: true,
        createdAt: serverTimestamp()
      });
      setNewDeal({ title: '', discount: 0 });
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'deals');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl p-6 md:p-12 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-display font-bold tracking-tighter gold-glow">
            SUPER ADMIN <span className="text-white/20">DASHBOARD</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X size={32} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Monitor */}
          <div className="lg:col-span-2 glass-morphism p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-gold" />
              <h3 className="font-display font-bold uppercase tracking-widest">Live Sales Monitor</h3>
            </div>
            <div className="space-y-4">
              {sales.map(sale => (
                <div key={sale.id} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest">{sale.productId}</p>
                    <p className="text-[10px] text-white/40">{new Date(sale.timestamp?.toDate()).toLocaleString()}</p>
                  </div>
                  <p className="text-gold font-bold">{sale.currency} {sale.amount}</p>
                </div>
              ))}
              {sales.length === 0 && <p className="text-white/20 text-center py-12 italic">No recent sales detected.</p>}
            </div>
          </div>

          {/* Deals Management */}
          <div className="space-y-8">
            <div className="glass-morphism p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-8">
                <Tag className="text-gold" />
                <h3 className="font-display font-bold uppercase tracking-widest">Upload New Deal</h3>
              </div>
              <form onSubmit={handleAddDeal} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Deal Title</label>
                  <input 
                    value={newDeal.title}
                    onChange={e => setNewDeal({...newDeal, title: e.target.value})}
                    placeholder="e.g. SUMMER ROYALTY"
                    className="w-full bg-white/5 border border-white/10 p-3 text-xs uppercase tracking-widest outline-none focus:border-gold"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Discount %</label>
                  <input 
                    type="number"
                    value={newDeal.discount}
                    onChange={e => setNewDeal({...newDeal, discount: parseInt(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 p-3 text-xs uppercase tracking-widest outline-none focus:border-gold"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-gold text-ink font-bold py-3 text-xs uppercase tracking-widest hover:bg-white transition-all">
                  Publish Deal
                </button>
              </form>
            </div>

            <div className="glass-morphism p-8 rounded-sm">
              <div className="flex items-center gap-3 mb-8">
                <Package className="text-gold" />
                <h3 className="font-display font-bold uppercase tracking-widest">Active Deals</h3>
              </div>
              <div className="space-y-4">
                {deals.map(deal => (
                  <div key={deal.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{deal.title}</span>
                    <span className="text-gold font-bold">-{deal.discount}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
