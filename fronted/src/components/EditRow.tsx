import { apiUrl } from "@/constant";
import { RootState } from "@/state/store";
import { Button, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";

const EditRow = ({ headerValue }: { headerValue: string[] }) => {
  const row = useSelector((state: RootState) => state.rowSelect.row);
  const [defaultValue, setDefaultValue] = useState<null | string[]>(null);

  useEffect(() => {
    if (row) {
      fetch(apiUrl + "/fetch/row/" + row[0], {
        method: "GET",
      }).then((res) =>
        res.json().then((r) => {
          if (r.success) {
            setDefaultValue(r.success.values);
          } else {
            toast.error("Something went Wrong!");
          }
        })
      );
    }
  }, [row]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-expect-error elements
    const formElements = e.target.elements;
    const formValues = [];

    // Loop through form elements and store their values in formValues object
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        formValues.push(element.value);
      }
    }
    
    // @ts-expect-error rows
    fetch(apiUrl + "/update/row/" + row[0], {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ changedValue: formValues }),
    }).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      } else {
        toast.error("Something Went Wrong!");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="mt-4 pb-6">
      {defaultValue &&
        headerValue.map((h, index) => (
          <div
            className="flex flex-col items-start justify-start gap-y-2 px-2 py-4"
            key={index}
          >
            <label
              htmlFor={`${h} ${index}`}
              className="text-sm font-bold text-gray-700"
            >
              {h}
            </label>
            <TextField
              sx={{
                width: "350px",
              }}
              id={`${h} ${index}`}
              name={`${h} ${index}`}
              defaultValue={defaultValue[index].toString()}
            />
          </div>
        ))}
      <Button variant="contained" type="submit" sx={{ width: "100%" }}>
        Submit
      </Button>
    </form>
  );
};

export default EditRow;
