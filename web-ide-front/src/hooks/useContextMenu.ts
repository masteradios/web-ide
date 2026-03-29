import { useEffect, useState } from 'react'
import type { INode } from '@/types/Node'

export const useContextMenu = () => {
    const [clicked, setClicked] = useState(false)
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const [activeContextNode, setActiveContextNode] = useState<INode | null>(null)

    useEffect(() => {
        const handleClick = () => {
            setClicked(false)
            setActiveContextNode(null)  // reset on any click
        }
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])

    return {
        clicked, setClicked,
        coords, setCoords,
        activeContextNode, setActiveContextNode
    }
}