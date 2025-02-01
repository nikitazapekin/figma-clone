export const calculateBounds = (x1: number, y1: number, x2: number, y2: number) => {
    const leftX = Math.min(x1, x2);
    const topY = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    return { leftX, topY, width, height };
};
