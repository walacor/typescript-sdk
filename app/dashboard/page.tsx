import React from "react";
import DashboardLayout from "@/layout/dahboard.layout";

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to Walacor Dashboard
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Manage your blog posts, profile, and settings all in one place.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">About Walacor</h2>
          <p className="text-gray-700 mb-4">
            Walacor is your ultimate blogging companion. Our platform provides
            powerful features and customizable components to enhance your
            blogging experience. Whether you're a beginner or an experienced
            blogger, Walacor offers the tools you need to create, manage, and
            grow your blog.
          </p>
          <p className="text-gray-700 mb-4">With Walacor, you can:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Create and manage your blog posts effortlessly</li>
            <li>
              Customize the blog application appearance with beautiful templates
            </li>
            <li>
              Optimize your content for search engines with built-in SEO tools
            </li>
            <li>
              Analyze your blog application performance with detailed analytics
            </li>
            <li>
              Engage with your audience through integrated social media features
            </li>
          </ul>
          <p className="text-gray-700">
            Explore the dashboard to get started and make the most of Walacor's
            features!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
