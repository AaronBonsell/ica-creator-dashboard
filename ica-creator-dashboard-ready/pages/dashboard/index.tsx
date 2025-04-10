import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [products, setProducts] = useState<any[]>([]);
  const [salesData, setSalesData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for Firebase to load user state
    if (!user) {
      router.push('/login'); // Redirect to login if no user is logged in
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Fetch products from Firestore (or another database source)
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsArray = querySnapshot.docs.map(doc => doc.data());
        setProducts(productsArray);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Example sales data
    setSalesData({
      totalRevenue: 5000,
      orders: 120,
      popularProduct: 'T-shirt with logo',
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-semibold">Welcome to your Dashboard, {user?.displayName}!</h1>

      {/* Display Sales Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-medium">Total Revenue</h3>
          <p className="text-2xl">${salesData.totalRevenue}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-medium">Total Orders</h3>
          <p className="text-2xl">{salesData.orders}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="text-lg font-medium">Popular Product</h3>
          <p className="text-2xl">{salesData.popularProduct}</p>
        </div>
      </div>

      {/* Display Products */}
      <h2 className="text-xl font-semibold mt-6">Your Products</h2>
      <div className="grid grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="p-4 border rounded shadow-sm">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-xl font-semibold">${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found. Add products to start selling.</p>
        )}
      </div>
    </div>
  );
};
