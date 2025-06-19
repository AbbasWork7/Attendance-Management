import { SubscriptionProvider } from './Pages/EmployerDashboard/SubscriptionContext';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
        <Toaster position="top-center" />
      </div>
    </SubscriptionProvider>
  );
}

export default App;
