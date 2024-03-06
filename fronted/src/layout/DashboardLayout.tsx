import Box from "@mui/material/Box";
import Main from "@/layout/Main";
import Sidebar from "@/layout/Sidebar";
import Header from "@/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
        }}
      >
        <Sidebar />
        <Main>{children}</Main>
      </Box>
    </>
  );
}
