import { Switch, Route, Router, Redirect } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import { PatientSidebar } from "@/components/PatientSidebar";
import { DoctorSidebar } from "@/components/DoctorSidebar";
import LoginPage from "@/pages/login";
import PatientDashboard from "@/pages/patient-dashboard";
import DnaResults from "@/pages/dna-results";
import Recommendations from "@/pages/recommendations";
import KiBerater from "@/pages/ki-berater";
import DoctorDashboard from "@/pages/doctor-dashboard";
import DoctorPatientDetail from "@/pages/doctor-patient-detail";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component, role }: { component: () => JSX.Element; role?: string }) {
  const { user } = useAuth();
  if (!user) return <Redirect to="/" />;
  if (role && user.role !== role) return <Redirect to="/" />;
  return <Component />;
}

function PatientPlaceholder() {
  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-muted-foreground">Diese Seite ist im Prototyp noch nicht verfügbar.</p>
        </div>
      </main>
    </div>
  );
}

function DoctorPlaceholder() {
  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-muted-foreground">Diese Seite ist im Prototyp noch nicht verfügbar.</p>
        </div>
      </main>
    </div>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/patient/dashboard">
        {() => <ProtectedRoute component={PatientDashboard} role="PATIENT" />}
      </Route>
      <Route path="/patient/dna-results">
        {() => <ProtectedRoute component={DnaResults} role="PATIENT" />}
      </Route>
      <Route path="/patient/recommendations">
        {() => <ProtectedRoute component={Recommendations} role="PATIENT" />}
      </Route>
      <Route path="/patient/ki-berater">
        {() => <ProtectedRoute component={KiBerater} role="PATIENT" />}
      </Route>
      <Route path="/patient/:page">
        {() => <ProtectedRoute component={PatientPlaceholder} role="PATIENT" />}
      </Route>
      <Route path="/arzt/dashboard">
        {() => <ProtectedRoute component={DoctorDashboard} role="DOCTOR" />}
      </Route>
      <Route path="/arzt/patients/:id">
        {() => <ProtectedRoute component={DoctorPatientDetail} role="DOCTOR" />}
      </Route>
      <Route path="/arzt/patienten">
        {() => <ProtectedRoute component={DoctorDashboard} role="DOCTOR" />}
      </Route>
      <Route path="/arzt/:page">
        {() => <ProtectedRoute component={DoctorPlaceholder} role="DOCTOR" />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router hook={useHashLocation}>
            <AppRouter />
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
