import { SubscriptionProvider } from './Pages/EmployerDashboard/SubscriptionContext';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <AppRoutes />
        <Toaster position="top-center" />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </SubscriptionProvider>
  );
}

export default App;
