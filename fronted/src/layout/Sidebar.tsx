import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setOpen } from "@/state/slices/SidebarSlice";

import {
  Close,
  TableChartSharp,
  UploadFile,
  WorkspacesSharp,
} from "@mui/icons-material";
import { Box, ListItemButton, Stack } from "@mui/material";

import RouterLink from "@/routes/RouterLink";

interface ListItemProp {
  paths: string;
  title: string;
  icon: React.ElementType;
}

const ListItem = ({ paths, title, icon: Icon }: ListItemProp) => {
  const location = useLocation();
  return (
    <ListItemButton
      component={RouterLink}
      href={paths}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "rgb(99, 115, 129)",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(paths == location.pathname && {
          color: "rgb(24, 119, 242)",
          fontWeight: "fontWeightSemiBold",
          backgroundColor: "rgba(24, 119, 242, 0.08)",
          "&:hover": {
            backgroundColor: "rgba(24, 119, 242, 0.16)",
          },
        }),
      }}
      className="w-full"
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        <Icon />
      </Box>

      <Box component="span" sx={{ fontWeight: "600", fontSize: "14px" }}>
        {title}
      </Box>
    </ListItemButton>
  );
};

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  return (
    <div
      className={`absolute top-0 ${
        isOpen ? "left-0" : "left-[-300px]"
      } transition-all duration-300 ease-in`}
    >
      <div className="w-[250px] min-h-screen h-full bg-white border-r border-slate-100 shadow-md flex flex-col gap-y-2">
        <div className="w-full flex items-end justify-end p-2">
          <button onClick={() => dispatch(setOpen())}>
            <Close />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[100px]">
          <img
            src="/assets/logo.svg"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <h2 className="mt-2 text-gray-600 font-semibold pb-2 border-b border-slate-100">
            Employee Dashboard
          </h2>
        </div>
        <div className="flex flex-col items-center justify-start gap-y-4 w-full">
          <Stack component="nav" spacing={0.5} sx={{ px: 2, width: "100%" }}>
            <ListItem icon={UploadFile} title="Upload Excel" paths="/" />
            <ListItem
              icon={WorkspacesSharp}
              title="View Excel"
              paths="/sheets"
            />
            <ListItem icon={TableChartSharp} title="Charts" paths="/charts" />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
