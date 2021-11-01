export const unitToCssArray = (unit) => {
    if (!unit) return 0

    if (Array.isArray(unit)) {
        if (unit.length === 1) {
            const item = unit[1]
            return [item, item, item, item]
        }
        if (unit.length === 2) {
            const x = unit[1]
            const y = unit[0]
            return [y, x, y, x]
        }
        if (unit.length === 3) {
            const top = unit[0]
            const bottom = unit[2]
            const x = unit[1]
            return [top, x, bottom, x]
        }
        return unit
    }

    return [unit, unit, unit, unit]
}