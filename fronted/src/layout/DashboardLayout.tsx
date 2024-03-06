import Box from "@mui/material/Box";
import Main from "@/layout/Main";

// import Nav from "./nav";
// import Main from "./main";
// import Header from "./header";

// ----------------------------------------------------------------------

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header onOpenNav={() => setOpenNav(true)} /> */}

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}
