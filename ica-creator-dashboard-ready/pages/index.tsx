import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-indigo-600">Welcome to ICABranding</h1>
        <p className="text-lg text-gray-600">
          Helping creators and influencers grow their personal brand through branded merchandise and
          brand partnerships.
        </p>

        <div className="space-x-4">
          <Link href="/login">
            <a className="px-6 py-3 bg-blue-500 text-white rounded-lg">Log In</a>
          </Link>
          <Link href="/signup">
            <a className="px-6 py-3 bg-green-500 text-white rounded-lg">Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
