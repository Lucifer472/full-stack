import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import { Button, TextField } from "@mui/material";

import Loader from "@/layout/Loader";
import { apiUrl } from "@/constant";

interface CreateSheetProps {
  columnOnly?: boolean;
  headerId?: number;
  headerData?: string[];
}

const CreateSheet = ({
  columnOnly,
  headerData,
  headerId,
}: CreateSheetProps) => {
  const [fields, setFields] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    // @ts-expect-error elements
    const formElements = e.target.elements;
    const formValues = [];
    let SheetName = "New sheet";

    if (headerData) {
      headerData.forEach((h) => {
        formValues.push(h);
      });
    }

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        // @ts-expect-error Name Error Typescript
        if (formValues.name !== "sheetNameMain") {
          formValues.push(element.value);
        } else {
          SheetName = element.value;
        }
      }
    }

    if (!columnOnly) {
      fetch(apiUrl + "/create/sheet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sheetName: SheetName, columns: formValues }),
      }).then((res) =>
        res.json().then((r) => {
          if (r.success) {
            toast.success("Create Successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            setIsLoading(false);
          } else {
            toast.error("something went Wrong");
            setIsLoading(false);
          }
        })
      );
    } else if (headerId && headerData) {
      fetch(apiUrl + "/create/columns/" + headerId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columns: formValues }),
      }).then((res) =>
        res.json().then((r) => {
          if (r.success) {
            toast.success("Create Successfully!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            setIsLoading(false);
          } else {
            toast.error("something went Wrong");
            setIsLoading(false);
          }
        })
      );
    }
  };

  const elements = Array.from({ length: fields }, (_, index) => (
    <div
      className="flex flex-col items-start justify-start gap-y-2 px-2 py-4"
      key={index}
    >
      <label htmlFor={`${index}`} className="text-sm font-bold text-gray-700">
        Column {index + 1}
      </label>
      <TextField
        sx={{
          width: "100%",
        }}
        id={`${index}`}
        name={`${index}`}
        placeholder="Enter a Column Name..."
      />
    </div>
  ));

  return (
    <>
      {!isLoading ? (
        <form onSubmit={handleSubmit} className="mt-4 pb-6 overflow-y-scroll">
          {!columnOnly && (
            <div className="flex flex-col items-start justify-start gap-y-2 px-2 py-4">
              <label
                htmlFor="sheetNameMain"
                className="text-sm font-bold text-gray-700"
              >
                Sheet Name
              </label>
              <TextField
                sx={{
                  width: "100%",
                }}
                id="sheetNameMain"
                name="sheetNameMain"
                placeholder="Enter sheet name..."
              />
            </div>
          )}
          {elements}
          <div className="w-full space-y-4">
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => setFields(fields + 1)}
            >
              Add More Columns
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "crimson",
                ":hover": {
                  backgroundColor: "red",
                },
              }}
              onClick={() => setFields(fields - 1)}
              disabled={fields < 2}
            >
              Remove More Columns
            </Button>
            <Button variant="contained" type="submit" sx={{ width: "100%" }}>
              Submit
            </Button>
          </div>
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CreateSheet;
