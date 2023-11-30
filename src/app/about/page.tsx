// AboutPage.tsx

import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto my-8 p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">About Our Platform 🚀</h1>
      <p className="text-gray-700 leading-relaxed">
        Welcome to our digital platform designed to foster a collaborative learning environment
        among college students. Our platform is built using cutting-edge technologies to ensure a
        seamless and efficient experience for our users.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Technology Stack ⚙️</h2>
        <p className="text-gray-700 leading-relaxed">
          Our platform leverages the power of Next.js for both the frontend and backend, providing a
          fast and dynamic user interface. The integration between the frontend and backend is achieved
          through tRPC (Typed RPC), ensuring type-safe communication and reducing errors in the development process.
          For our database, we use Prisma, a modern database toolkit, to define schemas and interact with the database
          in a type-safe manner.
        </p>
        {/* You might consider adding images/logos for Next.js, tRPC, and Prisma here */}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Key Features 🔍</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Peer-to-peer doubt solving: Connect with fellow students to get help with your academic queries.</li>
          <li>Community-driven learning: Share your knowledge and contribute to the collective growth of the community.</li>
          <li>Latest Events: Stay informed about the most recent events, workshops, and activities in your college.</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">How It Works 🤔</h2>
        <p className="text-gray-700 leading-relaxed">
          Our platform is designed to be user-friendly. Simply sign up, create a profile, and start engaging with
          the community. You can ask questions, provide answers, and participate in discussions. Additionally,
          you'll receive updates on upcoming events and activities directly related to your college.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Join Us Today! 🎓</h2>
        <p className="text-gray-700 leading-relaxed">
          Ready to enhance your college experience? Join our platform today and become part of a vibrant community
          dedicated to collaborative learning and staying connected with the latest college happenings.
        </p>
       
      </div>
    </div>
  );
};

export default AboutPage;
