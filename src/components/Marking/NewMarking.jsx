import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useLocation, useNavigate } from "react-router-dom";

export default function NewMarking() {
  const location = useLocation();
  const navigate = useNavigate();

  const [markings, setMarkings] = useState(() => {
    const savedMarkings = localStorage.getItem("markings");
    return savedMarkings ? JSON.parse(savedMarkings) : [];
  });
  

  const [quarryName, setQuarryName] = useState("");
  const [alliance, setAlliance] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [newBlock, setNewBlock] = useState({ length: "", breadth: "", height: "" });

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
    const newMarking = {
      id: Date.now(),
      quarryName,
      alliance,
      blocks,
    };
  
    const updatedMarkings = [...markings, newMarking];
    setMarkings(updatedMarkings);
    localStorage.setItem("markings", JSON.stringify(updatedMarkings));
  
    navigate("/marking"); // Go back after saving
  };
  


  return (
    <div>
      <h1>Add New Marking</h1>

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
          {blocks.map((block, index) => (
            <TableRow key={block.id}>
              <TableCell>{block.length}</TableCell>
              <TableCell>{block.breadth}</TableCell>
              <TableCell>{block.height}</TableCell>
              <TableCell>{block.volume}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleRemoveBlock(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  );
}
