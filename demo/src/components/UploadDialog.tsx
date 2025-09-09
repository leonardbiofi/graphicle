import { useCallback, useState } from "react";
import { Upload, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload from "./FileUpload";
import { useCanvasStore } from "@/store/canvasStore";

const readGraphicleJsonFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export default function UploadDialog() {
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  // const { setNodes, setEdges } = useCanvasStore();
  const removeFile = (fileName: string) => {
    setFilesToUpload((prev) => {
      return prev.filter((f) => f.name !== fileName);
    });
  };

  const onFileUpload = useCallback(async () => {
    // read the file and setup the nodes and edges
    for (const file of filesToUpload) {
      const json = await readGraphicleJsonFile(file);
      console.log("JSON:", json);
      const { nodes, edges } = json;
      useCanvasStore.setState(() => ({ nodes, edges }));
    }
    setOpen(false);
  }, [filesToUpload, useCanvasStore]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer">Import from file</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>
            Drag and drop or browse for the json file to visualize your graph
            data{" "}
          </DialogDescription>
        </DialogHeader>
        {!filesToUpload.length && (
          <FileUpload
            multiple={false}
            formats={["json"]}
            onUpdateFiles={(files: File[]) => setFilesToUpload(files)}
          />
        )}
        {filesToUpload.length > 0 && (
          <ul>
            {filesToUpload.map((file) => (
              <li className="flex items-center justify-between">
                <span>{file.name}</span>
                <span>
                  <Trash
                    className="cursor-pointer hover:text-foreground text-zinc-500"
                    onClick={() => removeFile(file.name)}
                    size={16}
                  />
                </span>
              </li>
            ))}
          </ul>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={onFileUpload}>
            <Upload /> Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
