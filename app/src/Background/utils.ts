export function getPathsFromSVG(svg: string) {
    const paths = Array.from(
        svg.matchAll(/<path d="(.*?)" fill="(.*?)" fill-opacity="(.*?)"\/>/gi)
    )
    return paths.map((path, i) => ({
        d: path[1],
        fill: path[2],
        fillOpacity: path[3],
    }))
}
