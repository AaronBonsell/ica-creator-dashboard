import { useEffect } from 'react';
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import { useRouter } from 'next/router';
    
    const Login = () => {
        const router = useRouter();
    
        useEffect(() => {
            const auth = firebase.auth();
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) router.push('/dashboard');
            });
            return () => unsubscribe();
        }, []);
    
        const handleLogin = async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
        };
    
        return (
            <div>
                <button onClick={handleLogin}>Login with Google</button>
            </div>
        );
    };
    
    export default Login;
    