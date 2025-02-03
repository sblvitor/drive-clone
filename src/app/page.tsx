import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Folder, FileText, FileImage, FileMusic, Film, ChevronRight } from "lucide-react"

type MockDataItem = {
  id: number;
  name: string;
  type: "folder" | "file";
  fileType?: "document" | "image" | "audio" | "video";
  children?: MockDataItem[];
};

const mockData: MockDataItem[] = [
  {
    id: 1,
    name: "Documents",
    type: "folder",
    children: [
      {
        id: 2,
        name: "Work",
        type: "folder",
        children: [
          { id: 3, name: "Project Proposal.docx", type: "file", fileType: "document" },
          { id: 4, name: "Budget.xlsx", type: "file", fileType: "document" },
        ],
      },
      {
        id: 5,
        name: "Personal",
        type: "folder",
        children: [{ id: 6, name: "Resume.pdf", type: "file", fileType: "document" }],
      },
    ],
  },
  {
    id: 7,
    name: "Images",
    type: "folder",
    children: [
      { id: 8, name: "Vacation.jpg", type: "file", fileType: "image" },
      { id: 9, name: "Family.png", type: "file", fileType: "image" },
    ],
  },
  {
    id: 10,
    name: "Music",
    type: "folder",
    children: [{ id: 11, name: "Favorite Song.mp3", type: "file", fileType: "audio" }],
  },
  {
    id: 12,
    name: "Videos",
    type: "folder",
    children: [{ id: 13, name: "Birthday Party.mp4", type: "file", fileType: "video" }],
  },
  { id: 14, name: "Important Notes.txt", type: "file", fileType: "document" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-4">My Drive</h1>
        <Breadcrumbs
          items={[
            { name: "My Drive", href: "#" },
            { name: "Documents", href: "#documents" },
            { name: "Work", href: "#documents/work" },
          ]}
        />
      </header>
      <div className="flex justify-between items-center mb-6">
        <Input type="text" placeholder="Search in Drive" className="w-full max-w-md bg-gray-800 text-gray-100" />
        <Button variant="outline" className="ml-4">
          <Upload className="mr-2 h-4 w-4" /> New Upload
        </Button>
      </div>
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="px-4 py-3 border-b border-gray-700 font-medium grid grid-cols-12 gap-4">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Last modified</div>
          <div className="col-span-3">File size</div>
        </div>
        <ul>
          {mockData.map((item) => (
            <FileOrFolder key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function FileOrFolder({ item }: { item: MockDataItem }) {
  const FileIcon = item.type === "folder" ? Folder : getFileIcon(item.fileType)
  return (
    <li className="border-b border-gray-700 last:border-b-0">
      <Link
        href={`#${item.type}-${item.id}`}
        className="px-4 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-700 transition-colors"
      >
        <div className="col-span-6 flex items-center">
          <FileIcon className="w-5 h-5 mr-3 text-gray-400" />
          <span>{item.name}</span>
        </div>
        <div className="col-span-3 text-sm text-gray-400">
          {new Date().toLocaleDateString()} {/* Mock date */}
        </div>
        <div className="col-span-3 text-sm text-gray-400">
          {item.type === "folder" ? "--" : `${Math.floor(Math.random() * 1000)} KB`} {/* Mock file size */}
        </div>
      </Link>
    </li>
  )
}

function getFileIcon(fileType: "document" | "image" | "audio" | "video" | undefined) {
  switch (fileType) {
    case "document":
      return FileText
    case "image":
      return FileImage
    case "audio":
      return FileMusic
    case "video":
      return Film
    default:
      return FileText
  }
}

function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />}
            <Link
              href={item.href}
              className={`inline-flex items-center text-sm font-medium ${
                index === items.length - 1 ? "text-gray-100 cursor-default" : "text-blue-400 hover:text-blue-300"
              }`}
            >
              {index === 0 && <Folder className="w-4 h-4 mr-2" />}
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

