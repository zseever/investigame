import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <main className="auth-cont">
      { showLogin ?
          <LoginForm setUser={setUser} />
          :
          <SignUpForm setUser={setUser} />
      }
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Not a user? Sign Up' : 'Already a user? Log In'}
      </button>
    </main>
  );
}