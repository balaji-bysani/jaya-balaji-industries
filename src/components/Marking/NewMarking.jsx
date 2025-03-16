import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";

export default function NewMarking({ isOpen, onClose, onAdd, existingData }) {
  const [quarryName, setQuarryName] = useState("");
  const [alliance, setAlliance] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [newBlock, setNewBlock] = useState({ length: "", breadth: "", height: "" });

  useEffect(() => {
    if (isOpen) {
      if (existingData) {
        setQuarryName(existingData.quarryName);
        setAlliance(existingData.alliance);
        setBlocks(existingData.blocks);
      } else {
        setQuarryName("");
        setAlliance("");
        setBlocks([]);
      }
      setNewBlock({ length: "", breadth: "", height: "" });
    }
  }, [isOpen, existingData]);

  const calculateVolume = (length, breadth, height, alliance) => {
    const l = parseFloat(length) - parseFloat(alliance);
    const b = parseFloat(breadth) - parseFloat(alliance);
    const h = parseFloat(height) - parseFloat(alliance);
    if (l > 0 && b > 0 && h > 0) {
      return ((l * b * h) / 1000000).toFixed(3);
    }
    return 0;
  };

  const handleAddBlock = () => {
    if (newBlock.length && newBlock.breadth && newBlock.height) {
      const volume = calculateVolume(newBlock.length, newBlock.breadth, newBlock.height, alliance);
      setBlocks([...blocks, { ...newBlock, id: blocks.length + 1, volume }]);
      setNewBlock({ length: "", breadth: "", height: "" });
    }
  };

  const handleSubmit = () => {
    onAdd({ id: existingData ? existingData.id : Date.now(), quarryName, alliance, blocks });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{existingData ? "Edit Marking" : "Add New Marking"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Quarry Name</label>
            <select value={quarryName} onChange={(e) => setQuarryName(e.target.value)} className="w-full border p-2 rounded-md">
              <option value="">Select Quarry</option>
              <option value="Quarry A">Quarry A</option>
              <option value="Quarry B">Quarry B</option>
              <option value="Quarry C">Quarry C</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Alliance (cm)</label>
            <Input type="number" value={alliance} onChange={(e) => setAlliance(e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Input type="number" placeholder="Length (cm)" value={newBlock.length} onChange={(e) => setNewBlock({ ...newBlock, length: e.target.value })} />
          <Input type="number" placeholder="Breadth (cm)" value={newBlock.breadth} onChange={(e) => setNewBlock({ ...newBlock, breadth: e.target.value })} />
          <Input type="number" placeholder="Height (cm)" value={newBlock.height} onChange={(e) => setNewBlock({ ...newBlock, height: e.target.value })} />
          <Button onClick={handleAddBlock}>Add Block</Button>
        </div>

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Length (cm)</TableHead>
              <TableHead>Breadth (cm)</TableHead>
              <TableHead>Height (cm)</TableHead>
              <TableHead>Volume (m³)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.map((block, index) => (
              <TableRow key={index}>
                <TableCell>{block.length}</TableCell>
                <TableCell>{block.breadth}</TableCell>
                <TableCell>{block.height}</TableCell>
                <TableCell>{block.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}