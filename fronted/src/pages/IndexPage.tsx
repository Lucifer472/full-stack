import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Circle, FileUpload } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { UploadNotes } from "@/constant";
import Loader from "@/layout/Loader";
import toast from "react-hot-toast";

const IndexPage = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Temp State Only Development
  const [temp, setTemp] = useState(true);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Handle file input change here
    if (event.target.files) {
      const selectedFiles = event.target.files[0];
      setFile(selectedFiles);
    }
  };

  useEffect(() => {
    const handleFileUpload = () => {
      if (file && temp) {
        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);
        fetch("http://localhost:8800/api/upload/sheet", {
          method: "POST",
          body: formData,
        }).then((res) => {
          if (res.status === 200) {
            toast.success("File Uploaded Successfully");
            setLoading(false);
            setTemp(false);
          } else {
            toast.error("Something Went Wrong!");
            setLoading(false);
            setTemp(false);
          }
        });
      }
    };
    handleFileUpload();
  }, [file, temp]);

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      const droppedFiles = event.dataTransfer.files;
      console.log(droppedFiles);

      // Trigger the file input change event manually
      if (fileInputRef.current && droppedFiles.length > 0) {
        // @ts-expect-error File is Never
        fileInputRef.current.files = droppedFiles;

        // @ts-expect-error FileRef Problems
        handleFileInputChange({ target: fileInputRef.current });
      }
    }
  };

  return (
    <section className="global-container w-full">
      {loading && <Loader />}
      <div className="flex flex-col gap-y-4 w-full">
        <div className="w-full bg-white flex items-start justify-start px-4 py-6 rounded-md shadow border border-slate-100">
          <h2 className="text-lg text-gray-800 font-semibold">
            Employee Data Upload (.xlsx and .csv)
          </h2>
        </div>
        <div className="w-full bg-white p-4 rounded-md shadow border border-slate-100">
          <input
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            type="file"
            id="excel-upload"
            name="excel-upload"
            accept=".xlsx,.csv"
          />
          <label
            htmlFor="excel-upload"
            className="w-full rounded-md border border-sky-500 border-dashed min-h-56 bg-sky-100 flex flex-col items-center justify-center
             gap-y-2 cursor-pointer"
            // @ts-expect-error DragEven Error
            onDrop={handleDrop}
          >
            <IconButton>
              <FileUpload />
            </IconButton>
            <Typography
              component={"p"}
              sx={{
                fontWeight: "600",
                color: "#232a2f",
              }}
            >
              Drag & Drop File, Or{" "}
              <Typography
                component={"span"}
                sx={{ fontWeight: "600", color: "#1877F2" }}
              >
                Browse
              </Typography>{" "}
            </Typography>
            <Typography
              component={"p"}
              sx={{ fontSize: "12px", fontWeight: "700", color: "gray" }}
            >
              Supports Excel & Csv Files Only
            </Typography>
          </label>
          <Box
            component={"div"}
            className="flex flex-col items-start justify-start gap-y-2 mt-4 w-full"
          >
            <Typography
              component={"h2"}
              sx={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              Notes:
            </Typography>
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              aria-label="contacts"
            >
              {UploadNotes.map((u, index) => (
                <ListItem
                  sx={{
                    width: "100%",
                  }}
                  key={index}
                >
                  <ListItemIcon>
                    <Circle
                      sx={{
                        width: "16px",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={u}
                    sx={{
                      width: "100%",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default IndexPage;
