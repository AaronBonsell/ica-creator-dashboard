// === firebase.ts ===
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// === _app.tsx ===
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return <Component {...pageProps} user={user} />;
}

// === pages/login.tsx ===
import { auth, provider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <button
        className="bg-black text-white px-6 py-3 rounded-xl shadow-lg"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
}

// === pages/dashboard/index.tsx ===
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';
import { useEffect } from 'react';
import Layout from '@/components/Layout';

export default function Dashboard({ user }: any) {
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        <p>More features coming soon...</p>
      </div>
    </Layout>
  );
}

// === components/Layout.tsx ===
import Navbar from './Navbar';

export default function Layout({ children }: any) {
  return (
    <div>
      <Navbar />
      <main className="mt-16 px-4">{children}</main>
    </div>
  );
}

// === components/Navbar.tsx ===
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50 px-6 py-4 flex justify-between">
      <div className="font-bold text-xl">ICA Creator Portal</div>
      <div className="flex gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </nav>
  );
}

// === .env.local (do NOT push to GitHub) ===
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

// === tailwind.config.ts ===
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;

// === styles/globals.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;

