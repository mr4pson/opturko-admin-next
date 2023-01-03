import LoginForm from '../../components/login/LoginForm';
import { useAppSelector } from '../../redux/hooks';
import { TAuthState } from '../../redux/types';

const Login: React.FC = () => {
  const { loading } = useAppSelector<TAuthState>((state) => state.auth);

  return (
    <>
      <LoginForm loading={loading} />
    </>
  );
};

export default Login;
