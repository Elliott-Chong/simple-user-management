"use client";
import * as XLSX from "xlsx";
import React from "react";
import { useDropzone } from "react-dropzone";
type Props = {
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
};

const ReadExcel = ({ setEmails }: Props) => {
  const { getInputProps, getRootProps } = useDropzone({
    async onDropAccepted(files) {
      const file = files[0];
      if (!file) return;
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
      });

      setEmails(jsonData.flat() as string[]);
    },
  });
  return (
    <div {...getRootProps()} className="rounded-md border border-dashed p-4">
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default ReadExcel;
