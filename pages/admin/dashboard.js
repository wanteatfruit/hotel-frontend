import AdminDashboard from "../../components/AdminDashboard";
import AdminLayout from "../../components/AdminLayout";
import axios from "axios";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";


export default function AdDashboard({}) {
  return (
    <>
      <AdminLayout>
        <AdminDashboard
        />
      </AdminLayout>
    </>
  );
}
