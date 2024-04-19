import { createRoot } from 'react-dom/client';
import './reset.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Detail from "./pages/Detail.jsx";
import { InvoiceProvider } from "./context/InvoiceContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "detail/:id",
                element: <Detail />
            }
        ]
    }
]);

const root = createRoot(document.getElementById('root'));
root.render(
    <InvoiceProvider>
        <RouterProvider router={router} />
    </InvoiceProvider>
);
