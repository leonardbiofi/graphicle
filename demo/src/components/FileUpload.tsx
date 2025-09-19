import { ChangeEvent, DragEventHandler, useRef, useState } from "react";
import { Button } from "./ui/button";
import clsx from "clsx";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 100000000;

type ListFiles = { [filename: string]: File };
interface FileUploadProps {
  maxFileSizeInBytes?: typeof DEFAULT_MAX_FILE_SIZE_IN_BYTES;
  multiple: boolean;
  formats: string[];
  onUpdateFiles: (files: File[]) => void;
}

export default function FileUpload({
  onUpdateFiles,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  multiple,
  formats,
}: FileUploadProps) {
  const fileInputFieldRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<ListFiles>({});
  const [dragOver, setDragOver] = useState<boolean>(false);
  const filesAreSelected = Object.keys(files).length > 0;
  let dragCounter = useRef(0);

  const handleUploadClick = () => {
    if (fileInputFieldRef.current) fileInputFieldRef.current.click();
  };

  const handleNewFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;

    if (newFiles?.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };
  const addNewFiles = (newFiles: FileList): ListFiles => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!multiple) return { file };

        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files: { [filename: string]: File }) => {
    const filesAsArray = convertNestedObjectToArray(files);
    onUpdateFiles(filesAsArray);
  };

  const convertNestedObjectToArray = (nestedObj: ListFiles) => {
    return Object.keys(nestedObj).map((key) => nestedObj[key]);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);

      const files = newFiles.reduce<ListFiles>((acc, f) => {
        const filename: string = f.name;
        acc[filename] = f;
        return acc;
      }, {});

      setFiles((prevFiles) => ({ ...prevFiles, ...files }));
      callUpdateFilesCb(files);
    }
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      setDragOver(true); // Only set true when first entering
    }
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOver(false); // All drag contexts have left
    }
  };

  return (
    <>
      <div
        className={clsx(
          "text-center mb-2  rounded-2xl p-5 border border-zinc-200 dark:border-zinc-600",
          dragOver && "bg-emerald-600/10"
        )}
        onDrop={handleDrop}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <p>Drag and drop your files here</p>
        <p className="text-xs">(Accepted formats: {formats.join(", ")})</p>

        <input
          className=""
          hidden
          type="file"
          ref={fileInputFieldRef}
          onChange={handleNewFileUpload}
          title=""
          value=""
          accept={formats.join(",")}
          multiple={multiple}
        />

        <div className="flex gap-1 justify-center">
          {!filesAreSelected && (
            <div className="flex flex-col gap-2">
              <p className="text-zinc-400">No files selected.</p>

              <Button type="button" variant="ghost" onClick={handleUploadClick}>
                Browse files
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
