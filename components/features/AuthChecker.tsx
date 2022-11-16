import { useEffect } from 'react';
import { selectAuthState, setAuthState } from '../../stores/authSlice';
import { selectProfileState, setProfileState } from '../../stores/profileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { JwtHelper } from '../../jwtHelper';
import { useRouter } from 'next/router';
import { getProfile } from '../../apis/auth';

const jwtHelper = new JwtHelper();

const AuthChecker = () => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const profileState = useSelector(selectProfileState);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === '/login' || router.asPath === '/signup') return;

    const jwt = localStorage.getItem('AUTHEN_KEY');
    if (jwt === null) router.push('/login');

    // verify jwt token age
    const jwtInfo = jwtHelper.decodeToken(jwt?.toString());
    if (Date.now() >= jwtInfo.exp * 1000) {
      router.push('/login');
    } else {
      dispatch(setAuthState(true));
    }
  }, [router, router.asPath, dispatch]);

  useEffect(() => {
    if (!authState) return;
    // if auth state is true then check if there is no profile state is set
    // then request a new one
    if (profileState.role === '') {
      const fetchProfileData = async () => {
        try {
          const res = await getProfile();
          if (res.statusCode === 200) {
            dispatch(setProfileState(res.data));
          }
        } catch (e: any) {
          router.push('/login');
        }
      };

      fetchProfileData().catch(console.error);
    }
  }, [profileState, authState, dispatch, router]);

  return <></>;
};

export default AuthChecker;
