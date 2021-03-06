import Layout from "../components/Layout";
import Login from "../components/Login";
import checkLoggedIn from "../lib/checkLoggedIn";
import withApollo from "../lib/withApollo";
import redirect from "../lib/redirect";

const LoginPage = ({ loggedInUser }) => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

LoginPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser) {
    redirect(context, "/");
  }

  return { loggedInUser };
};

export default withApollo(LoginPage);
