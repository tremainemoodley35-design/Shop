import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db, OperationType, handleFirestoreError } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { LogIn, LogOut, ShieldCheck } from 'lucide-react';

export const Auth = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [role, setRole] = useState<string | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          // Create user doc if it doesn't exist
          const newUserData = {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            role: 'user',
            createdAt: serverTimestamp()
          };
          try {
            await setDoc(doc(db, 'users', u.uid), newUserData);
            setRole('user');
          } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, `users/${u.uid}`);
          }
        }
      } else {
        setRole(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error('Sign in failed', e);
    }
  };

  const handleSignOut = () => signOut(auth);

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Logged in as</p>
          <p className="text-xs font-bold text-gold">{user.displayName}</p>
        </div>
        <button 
          onClick={handleSignOut}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Sign Out"
        >
          <LogOut size={20} />
        </button>
        {role === 'admin' && (
          <div className="flex items-center gap-1 text-crimson animate-pulse">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Admin</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <button 
      onClick={handleSignIn}
      className="flex items-center gap-2 px-4 py-2 bg-gold text-ink font-bold text-xs uppercase tracking-widest hover:bg-white transition-all rounded-sm"
    >
      <LogIn size={16} />
      Sign In
    </button>
  );
};
