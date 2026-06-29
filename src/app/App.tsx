import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layouts/root";
import { TypographyPage } from "@/pages/typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 час, шрифты не меняются
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to={"/typography"} replace />} />
          <Route element={<RootLayout />}>
            <Route path="/typography" element={<TypographyPage />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
