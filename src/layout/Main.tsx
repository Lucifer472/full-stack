import Box from "@mui/material/Box";

const Main = ({ children, ...other }: { children: React.ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        py: `10px`,
        position: "relatives",
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default Main;
