import { useState } from "react";
import { Button } from "@mui/material";

import CreateSheet from "./CreateSheet";
import Popup from "@/layout/Popup";

const CreateSheetButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-end gap-x-2">
      {open && (
        <Popup setOpen={setOpen} title="Create Sheet">
          <CreateSheet />
        </Popup>
      )}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create Sheet
      </Button>
    </div>
  );
};

export default CreateSheetButton;
