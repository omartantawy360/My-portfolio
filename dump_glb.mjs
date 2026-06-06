import fs from 'fs';
import path from 'path';

// Just simple read of GLB buffer to extract node names.
// A full GLTF parser is complex, but we can search for strings.
const filePath = 'C:/Users/omart/OneDrive/Documents/GitHub/My-portfolio/public/assets/cyber_room.glb';
const buffer = fs.readFileSync(filePath);

// GLB has a JSON chunk. The JSON chunk contains node names.
// Find the "JSON" chunk type: 0x4E4F534A
let jsonChunkLength = buffer.readUInt32LE(12);
let jsonChunkType = buffer.readUInt32LE(16);
if (jsonChunkType === 0x4E4F534A) {
  const jsonString = buffer.toString('utf8', 20, 20 + jsonChunkLength);
  const json = JSON.parse(jsonString);
  const nodeNames = json.nodes.map((n, i) => n.name || `Node_${i}`);
  const meshNames = json.meshes ? json.meshes.map((m, i) => m.name || `Mesh_${i}`) : [];
  const materialNames = json.materials ? json.materials.map((m, i) => m.name || `Material_${i}`) : [];
  
  console.log("Nodes:");
  console.log(nodeNames);
  console.log("\nMaterials:");
  console.log(materialNames);
} else {
  console.log("Not a valid GLB JSON chunk");
}
