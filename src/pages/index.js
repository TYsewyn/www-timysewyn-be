import React from "react";
import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";
import Helmet from "react-helmet";

export default () => {
  return (
    <Layout>
      <Helmet defer={false}>
        <meta property="profile:first_name" content="Tim" />
        <meta property="profile:last_name" content="Ysewyn" />
        <meta property="profile:username" content="tysewyn" />
        <meta property="profile:gender" content="male" />
      </Helmet>
      <ProfileCard />
    </Layout>
  );
};
