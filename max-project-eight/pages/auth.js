import { getSession } from 'next-auth/react';
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps = async context => {
  const session = await getSession({ req: context.req })

  if (session) {
    return {  
      redirect: {
        destination: '/profile',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

export default AuthPage;
