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
        setBlocks(existingData.blocks.map(block => ({
          ...block,
          volume: calculateVolume(block.length, block.breadth, block.height, existingData.alliance)
        })));
      } else {
        resetForm();
      }
    }
  }, [isOpen, existingData]);

  const resetForm = () => {
    setQuarryName("");
    setAlliance("");
    setBlocks([]);
    setNewBlock({ length: "", breadth: "", height: "" });
  };

  const calculateVolume = (length, breadth, height, alliance) => {
    const l = Math.max(0, parseFloat(length) - parseFloat(alliance));
    const b = Math.max(0, parseFloat(breadth) - parseFloat(alliance));
    const h = Math.max(0, parseFloat(height) - parseFloat(alliance));

    return isNaN(l) || isNaN(b) || isNaN(h) || l === 0 || b === 0 || h === 0 ? "0.000" : ((l * b * h) / 1000000).toFixed(3);
  };

  const handleAddBlock = () => {
    if (!newBlock.length || !newBlock.breadth || !newBlock.height) {
      alert("Please enter valid block dimensions.");
      return;
    }

    const volume = calculateVolume(newBlock.length, newBlock.breadth, newBlock.height, alliance);

    setBlocks([...blocks, { ...newBlock, id: Date.now(), volume }]);
    setNewBlock({ length: "", breadth: "", height: "" });
  };

  const handleBlockChange = (index, key, value) => {
    const updatedBlocks = blocks.map((block, i) =>
      i === index
        ? { ...block, [key]: value, volume: calculateVolume(key === "length" ? value : block.length, key === "breadth" ? value : block.breadth, key === "height" ? value : block.height, alliance) }
        : block
    );
    setBlocks(updatedBlocks);
  };

  const handleRemoveBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!quarryName || !alliance) {
      alert("Please fill in all required fields.");
      return;
    }

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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.length > 0 ? (
              blocks.map((block, index) => (
                <TableRow key={block.id}>
                  <TableCell>
                    <Input type="number" value={block.length} onChange={(e) => handleBlockChange(index, "length", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input type="number" value={block.breadth} onChange={(e) => handleBlockChange(index, "breadth", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input type="number" value={block.height} onChange={(e) => handleBlockChange(index, "height", e.target.value)} />
                  </TableCell>
                  <TableCell>{block.volume}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleRemoveBlock(index)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">No blocks added.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
