function quickestPath(portals) {
    const startLocation = 1;
    const targetLocation = 200;
    const minLocation = 1;
    const maxWalkSteps = 11;

    // สร้าง Map เพื่อเก็บพอร์ทัล
    const portalMap = new Map();
    for (const portal of portals) {
        if (!portalMap.has(portal.location)) {
            portalMap.set(portal.location, new Set());
        }
        portalMap.get(portal.location).add(portal.destination);
    }

    // Queue เก็บ { location: ตำแหน่งปัจจุบัน, turns: จำนวนเทิร์นที่ใช้ไปแล้ว, path: เส้นทางที่เดินมา }
    const queue = [];
    queue.push({ location: startLocation, turns: 0, path: [startLocation] });

    // Set เพื่อเก็บตำแหน่งที่เคยเยี่ยมชมแล้ว
    const visited = new Set();
    visited.add(startLocation);

    let head = 0; 

    while (head < queue.length) { // ทำการวนลูปจนกว่าจะสำรวจคิวหมด
        const { location, turns, path } = queue[head++];

        // ถ้าถึงตำแหน่งเป้าหมายแล้ว
        if (location === targetLocation) {
            console.log("\nTravel Path:");
            for (let i = 0; i < path.length - 1; i++) {
                const current = path[i];
                const next = path[i + 1];
                if (next > current) {
                    console.log(`เดินจาก ${current} ไป ${next} (เดินหน้า ${next - current} ก้าว)`);
                } 

            }
            return turns; // คืนค่าจำนวนเทิร์นที่น้อยที่สุด
        }

        // 2. ลองเดินหน้า (เดินได้สูงสุด maxWalkSteps ใน 1 เทิร์น)
        for (let steps = 1; steps <= maxWalkSteps; steps++) {
            const nextLocation = location + steps;
            if (nextLocation <= targetLocation + maxWalkSteps && !visited.has(nextLocation)) {
                visited.add(nextLocation);
                queue.push({
                    location: nextLocation,
                    turns: turns + 1,
                    path: [...path, nextLocation]
                });

                // ถ้ามีพอร์ทัลที่ตำแหน่งที่เดินไปถึง ให้ลองใช้พอร์ทัลต่อในเทิร์นเดียวกัน
                if (portalMap.has(nextLocation)) {
                    for (const dest of portalMap.get(nextLocation)) {
                        if (dest >= minLocation && !visited.has(dest)) {
                            visited.add(dest);
                            queue.push({
                                location: dest,
                                turns: turns + 1,
                                path: [...path, nextLocation, dest]
                            });
                        }
                    }
                }
            } else if (nextLocation > targetLocation + maxWalkSteps) { //ถ้าเดินไปไกลเกินหยุด
                break;
            }
        }

    }

    return -1; // หากไม่พบเส้นทางไปถึงเป้าหมาย
}

// --- ตัวอย่างการใช้งาน (จากข้อมูลในโจทย์) ---
const portals1 = [
    { location: 55, destination: 38 },
    { location: 14, destination: 35 },
    { location: 91, destination: 48 },
    { location: 30, destination: 8 },
    { location: 31, destination: 70 },
    { location: 63, destination: 83 },
    { location: 3, destination: 39 },
    { location: 47, destination: 86 },
    { location: 71, destination: 93 },
    { location: 21, destination: 4 },
    { location: 44, destination: 65 },
    { location: 96, destination: 66 },
    { location: 79, destination: 42 },
    { location: 87, destination: 54 },
    { location: 90, destination: 119 },
    { location: 120, destination: 149 },
    { location: 150, destination: 179 },
    { location: 180, destination: 200 },
];

console.log("ทางที่ใกล้สุดถ้าเดินไป 200:", quickestPath(portals1));