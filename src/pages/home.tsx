import React from "react";
import AppLayout from "@/components/Layout";
import PostList from "@/components/PostList";

const HomePage: React.FC = () => {
  return (
    <AppLayout>
      <PostList />
    </AppLayout>
  );
};

export default HomePage;
