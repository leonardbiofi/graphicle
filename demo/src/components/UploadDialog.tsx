import { useCallback, useState } from "react";
import { Upload, Trash, LoaderCircle } from "lucide-react";
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
import { getGraphicle } from "./GraphicleProvider";
import parser from "@/lib/parser";
import { graphLoader } from "@/lib/graphLoader";
import { useForceLayoutStore } from "@/store/layoutStore";

type AcceptedFormats = "json" | "graphml" | "sif";

const acceptedFormats: AcceptedFormats[] = ["json", "graphml", "sif"];

const isAcceptedFormat = (ext: string): ext is AcceptedFormats => {
  return acceptedFormats.includes(ext as AcceptedFormats);
};

export default function UploadDialog() {
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const setActive = useForceLayoutStore((state) => state.setActive);
  const [loadingGraph, setLoadingGraph] = useState<boolean>(false);
  // const { setNodes, setEdges } = useGraphicleStore();
  const removeFile = (fileName: string) => {
    setFilesToUpload((prev) => {
      return prev.filter((f) => f.name !== fileName);
    });
  };

  const onFileUpload = useCallback(async () => {
    setLoadingGraph(true);
    setActive(false);
    // read the file and setup the nodes and edges
    for (const file of filesToUpload) {
      if (!file) continue;

      // Get file extension
      const fileExt = file.name.split(".").at(-1);
      // Select the correct parser function
      if (!fileExt || !isAcceptedFormat(fileExt)) {
        console.error(
          `Unsupported file format: ${fileExt}. Accepted formats are ${acceptedFormats.join(
            ","
          )}`
        );
        continue;
      }
      const json = await parser[fileExt](file);
      const { nodes, edges } = json;
      useForceLayoutStore.setState(() => ({ active: false }));

      graphLoader({ nodes, edges });
      getGraphicle()?.viewport?.fitView();
    }
    setLoadingGraph(false);
    setOpen(false);
  }, [filesToUpload]);
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
            formats={acceptedFormats}
            onUpdateFiles={(files: File[]) => setFilesToUpload(files)}
          />
        )}
        {filesToUpload.length > 0 && (
          <ul>
            {filesToUpload.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between w-[370px]"
              >
                <span className="truncate max-w-2/3">{file.name}</span>
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
          <Button type="submit" onClick={onFileUpload} disabled={loadingGraph}>
            {loadingGraph ? (
              <span className="animate-spin">
                <LoaderCircle />
              </span>
            ) : (
              <Upload />
            )}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
