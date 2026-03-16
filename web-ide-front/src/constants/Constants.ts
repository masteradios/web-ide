  export const pages = ["File Explorer", "Search"]

  import type { INode } from "@/types/Node"
//n => n.parent === node.uri

//n => n.parent == node.parent+node.name

  export const dummyNodes: INode[] = [
  { name: "root", isFile: false, uri: "/root", isExpanded: false, isSelected: false, parent: "/", children: ["/root/src", "/root/public", "/root/package.json", "/root/.gitignore"] },
  { name: "src", isFile: false, uri: "/root/src", isExpanded: false, isSelected: false, parent: "/root", children: ["/root/src/index.ts", "/root/src/App.tsx", "/root/src/components"] },
  { name: "index.ts", isFile: true, uri: "/root/src/index.ts", isExpanded: false, isSelected: false, parent: "/root/src" },
  { name: "App.tsx", isFile: true, uri: "/root/src/App.tsx", isExpanded: false, isSelected: false, parent: "/root/src" },
  { name: "components", isFile: false, uri: "/root/src/components", isExpanded: false, isSelected: false, parent: "/root/src", children: ["/root/src/components/Button.tsx", "/root/src/components/Navbar.tsx"] },
  { name: "Button.tsx", isFile: true, uri: "/root/src/components/Button.tsx", isExpanded: false, isSelected: false, parent: "/root/src/components" },
  { name: "Navbar.tsx", isFile: true, uri: "/root/src/components/Navbar.tsx", isExpanded: false, isSelected: false, parent: "/root/src/components" },
  { name: "public", isFile: false, uri: "/root/public", isExpanded: false, isSelected: false, parent: "/root", children: ["/root/public/index.html"] },
  { name: "index.html", isFile: true, uri: "/root/public/index.html", isExpanded: false, isSelected: false, parent: "/root/public" },
  { name: "package.json", isFile: true, uri: "/root/package.json", isExpanded: false, isSelected: false, parent: "/root" },
  { name: ".gitignore", isFile: true, uri: "/root/.gitignore", isExpanded: false, isSelected: false, parent: "/root" },
]
