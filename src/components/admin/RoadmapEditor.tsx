"use client"

import type React from "react"
import { useCallback, useState, useEffect } from "react"
import {
  ReactFlow,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  Handle,
  Position,
  MarkerType,
  Panel,
  type BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import "@/styles/react-flow-overrides.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown } from "lucide-react"
import { useTheme } from "next-themes"

import type { NodeProps, EdgeProps } from "@xyflow/react"

type TopicNodeData = {
  label: string
  description: string
  difficulty: string
  items?: undefined
}
type SubtopicNodeData = {
  label: string
  items: string[]
  description?: undefined
  difficulty?: undefined
}

const TopicNode = ({ data, selected }: NodeProps) => {
  const { resolvedTheme } = useTheme()
  const { label, description, difficulty } = data as TopicNodeData

  // Colors that work in both light and dark mode
  const colors: Record<string, string> = {
    beginner: "bg-emerald-500 dark:bg-emerald-600",
    intermediate: "bg-amber-500 dark:bg-amber-600",
    advanced: "bg-rose-500 dark:bg-rose-600",
  }

  const bgColor = colors[difficulty as string] || "bg-blue-500 dark:bg-blue-600"
  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={`min-w-[180px] rounded-lg ${selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
    >
      <Card className="border-2 shadow-lg">
        <CardHeader className={`${bgColor} text-white rounded-t-md py-2 px-3`}>
          <CardTitle className="text-base font-medium">{label}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 text-sm">{description || "Topic details..."}</CardContent>
      </Card>
      {/* Top & Bottom Handles for Topic-to-Topic connections */}
      <Handle
        type="target"
        position={Position.Top}
        className={`w-3 h-3 rounded-full border-2 ${isDark ? "border-gray-500 bg-gray-800" : "border-gray-400 bg-white"}`}
        id="topic-target-top"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className={`w-3 h-3 rounded-full border-2 ${isDark ? "border-gray-500 bg-gray-800" : "border-gray-400 bg-white"}`}
        id="topic-source-bottom"
      />
      {/* Right Handle for Topic-to-Subtopic connections */}
      <Handle
        type="source"
        position={Position.Right}
        className={`w-3 h-3 rounded-full border-2 ${isDark ? "border-amber-500 bg-gray-800" : "border-amber-400 bg-white"}`}
        id="subtopic-source-right"
      />
    </div>
  )
}

const SubtopicNode = ({ data, selected }: NodeProps) => {
  const { resolvedTheme } = useTheme()
  const { label, items } = data as SubtopicNodeData
  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={`min-w-[220px] max-w-[300px] ${selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
    >
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="bg-gray-50 dark:bg-gray-700 rounded-t-md py-2 px-3">
          <CardTitle className="text-base font-medium">{label}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 text-sm">
          {Array.isArray(items)
            ? items.map((item: string, idx: number) => (
                <div key={idx} className="mb-2 last:mb-0 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                  {item}
                </div>
              ))
            : "Subtopic content..."}
        </CardContent>
      </Card>
      {/* Left Handle for Subtopic connections */}
      <Handle
        type="target"
        position={Position.Left}
        className={`w-3 h-3 rounded-full border-2 ${isDark ? "border-amber-500 bg-gray-800" : "border-amber-400 bg-white"}`}
        id="subtopic-target-left"
      />
      {/* Right Handle for Subtopic-to-Subtopic connections */}
      <Handle
        type="source"
        position={Position.Right}
        className={`w-3 h-3 rounded-full border-2 ${isDark ? "border-amber-500 bg-gray-800" : "border-amber-400 bg-white"}`}
        id="subtopic-source-right"
      />
    </div>
  )
}

// Custom edge types
const SubtopicEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd }: EdgeProps) => {
  const { resolvedTheme } = useTheme()
  const edgePath = `M${sourceX},${sourceY} C${sourceX + (targetX - sourceX) * 0.5},${sourceY} ${
    sourceX + (targetX - sourceX) * 0.5
  },${targetY} ${targetX},${targetY}`

  const strokeClass = resolvedTheme === "dark" ? "stroke-amber-500" : "stroke-amber-400"

  return (
    <path
      id={id}
      className={strokeClass}
      strokeWidth={2}
      strokeDasharray="5,5"
      d={edgePath}
      fill="none"
      markerEnd={markerEnd}
    />
  )
}

// Initial data for the roadmap - empty for a clean slate
const initialNodes: Node<Record<string, unknown>>[] = []

const initialEdges: Edge<Record<string, unknown>>[] = []

// Define node and edge types
const nodeTypes = {
  topic: TopicNode,
  subtopic: SubtopicNode,
}

const edgeTypes = {
  subtopic: SubtopicEdge as React.FC<EdgeProps>,
}

interface RoadmapEditorProps {
  roadmapId?: string | null
}

export default function RoadmapEditor({ roadmapId }: RoadmapEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const { resolvedTheme } = useTheme()

  // JSON textarea state
  const [jsonValue, setJsonValue] = useState<string>("")
  const [jsonError, setJsonError] = useState<string>("")

  // Form states
  const [nodeName, setNodeName] = useState<string>("")
  const [nodeDescription, setNodeDescription] = useState<string>("")
  const [nodeDifficulty, setNodeDifficulty] = useState<string>("beginner")
  const [nodeType, setNodeType] = useState<"topic" | "subtopic">("topic")
  const [subtopicItems, setSubtopicItems] = useState<string>("")

  // Connection handling
  const onConnect = useCallback(
    (params: Connection) => {
      // Determine if this is a topic-to-topic or topic-to-subtopic connection
      const sourceNode = nodes.find((n) => n.id === params.source)
      const targetNode = nodes.find((n) => n.id === params.target)

      if (sourceNode && targetNode) {
        // If connecting from topic bottom to topic top
        if (params.sourceHandle === "topic-source-bottom" && params.targetHandle === "topic-target-top") {
          // Topic to topic connection (solid line)
          const newEdge: Edge = {
            ...params,
            id: `edge-${params.source}-${params.target}-${Date.now()}`,
            type: "default",
            animated: false,
            style: {
              stroke: resolvedTheme === "dark" ? "#64748b" : "#94a3b8",
              strokeWidth: 2,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: resolvedTheme === "dark" ? "#64748b" : "#94a3b8",
            },
          }
          setEdges((eds) => addEdge(newEdge, eds))
        }
        // If connecting from topic right to subtopic left
        else if (params.sourceHandle === "subtopic-source-right" && params.targetHandle === "subtopic-target-left") {
          // Topic to subtopic or subtopic to subtopic (dotted line)
          const newEdge: Edge = {
            ...params,
            id: `edge-${params.source}-${params.target}-${Date.now()}`,
            type: "subtopic",
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 15,
              height: 15,
              color: resolvedTheme === "dark" ? "#f59e0b" : "#f59e0b",
            },
          }
          setEdges((eds) => addEdge(newEdge, eds))
        }
      }
    },
    [nodes, setEdges, resolvedTheme],
  ) // Node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)

    if (node.type === "topic") {
      setNodeName((node.data as TopicNodeData).label || "")
      setNodeDescription((node.data as TopicNodeData).description || "")
      setNodeDifficulty((node.data as TopicNodeData).difficulty || "beginner")
      setNodeType("topic")
      setSubtopicItems("")
    } else if (node.type === "subtopic") {
      setNodeName((node.data as SubtopicNodeData).label || "")
      setNodeType("subtopic")
      setNodeDifficulty("beginner")
      setNodeDescription("")
      setSubtopicItems(
        Array.isArray((node.data as SubtopicNodeData).items) ? (node.data as SubtopicNodeData).items.join("\n") : "",
      )
    }
  }, [])

  // Effect to update edge colors when theme changes
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.type === "subtopic") {
          return edge
        } else {
          return {
            ...edge,
            style: {
              stroke: resolvedTheme === "dark" ? "#64748b" : "#94a3b8",
              strokeWidth: 2,
            },
            markerEnd: {
              ...((edge.markerEnd as object) || {}),
              color: resolvedTheme === "dark" ? "#64748b" : "#94a3b8",
              type: MarkerType.ArrowClosed,
            },
          }
        }
      }),
    )
  }, [resolvedTheme, setEdges])

  // Effect to sync nodes/edges to JSON textarea
  useEffect(() => {
    // Export all nodes (topics and subtopics) as top-level nodes
    const roadmapData = {
      id: `roadmap-${Date.now()}`,
      title: "Learning Roadmap",
      description: "Custom learning pathway",
      technology: "custom",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: node.data,
        position: node.position,
      })),
      connections: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type || "default",
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      })),
    }
    setJsonValue(JSON.stringify(roadmapData, null, 2))
    setJsonError("")
  }, [nodes, edges])

  // Effect to load roadmap data when roadmapId changes
  useEffect(() => {
    if (roadmapId) {
      // In a real implementation, we would fetch the roadmap data from the API
      console.log(`Loading roadmap data for ID: ${roadmapId}`)
      // For now, we'll just show a message
      setJsonValue(
        JSON.stringify(
          {
            id: roadmapId,
            title: "Loaded Roadmap",
            description: "This roadmap was loaded from the server",
            technology: "custom",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            nodes: [],
            connections: [],
          },
          null,
          2,
        ),
      )
    }
  }, [roadmapId])

  // Handle click on empty canvas to unselect nodes
  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
    setNodeName("")
    setNodeDescription("")
    setNodeDifficulty("beginner")
    setNodeType("topic")
    setSubtopicItems("")
  }, [])

  // Update selected node
  const updateSelectedNode = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    if (!selectedNode) return

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          if (node.type === "topic") {
            return {
              ...node,
              data: {
                ...node.data,
                label: nodeName,
                description: nodeDescription,
                difficulty: nodeDifficulty,
              },
            } as Node<Record<string, unknown>>
          } else if (node.type === "subtopic") {
            return {
              ...node,
              data: {
                ...node.data,
                label: nodeName,
                items: subtopicItems.split("\n").filter((item) => item.trim()),
              },
            } as Node<Record<string, unknown>>
          }
        }
        return node
      }),
    )
  }
  // Add a new node
  const addNode = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    const newId = `${nodeType}-${Date.now()}`
    const centerX = window.innerWidth / 2

    // Create node based on type
    if (nodeType === "topic") {
      const newNode: Node<Record<string, unknown>> = {
        id: newId,
        type: "topic",
        data: {
          label: nodeName || "New Topic",
          description: nodeDescription || "Topic description",
          difficulty: nodeDifficulty,
        },
        position: {
          x: centerX - 100,
          y: nodes.length * 180 + 50,
        },
      }
      setNodes((nds) => [...nds, newNode as Node<Record<string, unknown>>])
    } else {
      const newNode: Node<Record<string, unknown>> = {
        id: newId,
        type: "subtopic",
        data: {
          label: nodeName || "New Subtopic",
          items: subtopicItems.split("\n").filter((item) => item.trim()),
        },
        position: {
          x: centerX + 300,
          y: nodes.length * 100 + 50,
        },
      }
      setNodes((nds) => [...nds, newNode as Node<Record<string, unknown>>])
    }

    // Clear form
    setNodeName("")
    setNodeDescription("")
    setSubtopicItems("")
    setSelectedNode(null)
  }
  // Delete selected node
  const deleteNode = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    if (!selectedNode) return

    // Remove node
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))

    // Remove connected edges
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id))

    // Reset form
    setNodeName("")
    setNodeDescription("")
    setSubtopicItems("")
    setSelectedNode(null)
  }

  // Save the roadmap data
  const saveRoadmap = () => {
    // Export all nodes (topics and subtopics) as top-level nodes
    const roadmapData = {
      id: `roadmap-${Date.now()}`,
      title: "Learning Roadmap",
      description: "Custom learning pathway",
      technology: "custom",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: node.data,
        position: node.position,
      })),
      connections: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type || "default",
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      })),
    }

    // Log the structured data to console
    console.log("Roadmap data to be saved:", JSON.stringify(roadmapData, null, 2))

    // Show a message to indicate data is ready
    alert("Roadmap data has been logged to the console.")
  }

  // Load roadmap from JSON textarea
  const loadFromJson = () => {
    try {
      const data = JSON.parse(jsonValue)
      if (!data.nodes || !data.connections) {
        setJsonError("Invalid roadmap structure: missing nodes or connections.")
        return
      }
      // Restore all nodes and edges from flat arrays
      const newNodes: Node<Record<string, unknown>>[] = (data.nodes || []).map((node: {
        id: string;
        type: string;
        data: Record<string, unknown>;
        position: { x: number; y: number };
      }) => ({
        id: node.id,
        type: node.type,
        data: node.data,
        position: node.position,
      }))
      const newEdges: Edge<Record<string, unknown>>[] = (data.connections || []).map((conn: {
        id: string;
        source: string;
        target: string;
        type?: string;
        sourceHandle?: string;
        targetHandle?: string;
      }) => ({
        id: conn.id,
        source: conn.source,
        target: conn.target,
        type: conn.type || "default",
        sourceHandle: conn.sourceHandle,
        targetHandle: conn.targetHandle,
      }))
      setNodes(newNodes)
      setEdges(newEdges)
      setJsonError("")
    } catch (e: unknown) {
      setJsonError("Invalid JSON: " + (e instanceof Error ? e.message : String(e)))
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left side form */}
        <div className="w-full lg:w-1/3 xl:w-1/4 space-y-4 order-2 lg:order-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{selectedNode ? "Edit Node" : "Add New Node"}</CardTitle>{" "}
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Node Type</label>
                  <Select
                    value={nodeType}
                    onValueChange={(value: string) => setNodeType(value as "topic" | "subtopic")}
                    disabled={!!selectedNode}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select node type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="topic">Topic (Main)</SelectItem>
                      <SelectItem value="subtopic">Subtopic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    placeholder="Enter node title"
                  />
                </div>

                {nodeType === "topic" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        value={nodeDescription}
                        onChange={(e) => setNodeDescription(e.target.value)}
                        placeholder="Enter description"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Difficulty</label>
                      <Select value={nodeDifficulty} onValueChange={setNodeDifficulty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                {nodeType === "subtopic" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Items (one per line)</label>
                    <textarea
                      value={subtopicItems}
                      onChange={(e) => setSubtopicItems(e.target.value)}
                      placeholder="Enter items (one per line)"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-vertical"
                    />
                  </div>
                )}

                <div className="pt-2 flex gap-2">
                  {selectedNode ? (
                    <>
                      {" "}
                      <Button onClick={(e) => updateSelectedNode(e)} className="flex-1">
                        Update
                      </Button>
                      <Button onClick={(e) => deleteNode(e)} variant="destructive">
                        Delete{" "}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={(e) => addNode(e)} className="w-full">
                      Add Node
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-emerald-500 dark:bg-emerald-600 w-3 h-3 mt-1"></div>
                  <span>Green: Beginner topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-amber-500 dark:bg-amber-600 w-3 h-3 mt-1"></div>
                  <span>Amber: Intermediate topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-rose-500 dark:bg-rose-600 w-3 h-3 mt-1"></div>
                  <span>Red: Advanced topics</span>
                </li>{" "}
                <li className="mt-4">
                  <ArrowDown className="inline mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Connect topics vertically with solid lines</span>
                </li>
                <li>
                  <span className="inline-block w-8 border-t-2 border-dashed border-amber-400 dark:border-amber-500"></span>
                  <span className="ml-2">Connect to subtopics with dotted lines</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right side flow diagram */}
        <div className="w-full lg:w-2/3 xl:w-3/4 order-1 lg:order-2">
          <div className="border rounded-lg shadow-sm h-[400px] md:h-[500px] lg:h-[600px] bg-slate-50 dark:bg-gray-800">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              minZoom={0.2}
              maxZoom={1.5}
              fitViewOptions={{ padding: 0.2 }}
              proOptions={{ hideAttribution: true }}
            >
              {" "}
              <Background color="#555" gap={16} size={1} variant={"dots" as BackgroundVariant} className="" />
              <Controls
                position="bottom-right"
                className="bg-card border border-border text-card-foreground 
                [&>button]:text-foreground [&>button]:bg-background [&>button]:border-border
                [&>button>svg]:fill-current [&>button>svg]:text-foreground
                dark:[&>button]:bg-gray-800 dark:[&>button]:border-gray-700 dark:[&>button>svg]:text-gray-300"
                showInteractive={false}
              />
              <Panel
                position="top-right"
                className="bg-card text-card-foreground p-2 rounded shadow-sm text-xs hidden md:block"
              >
                Drag nodes to position | Click to edit | Connect handles to create paths
              </Panel>
            </ReactFlow>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <Button onClick={saveRoadmap} className="px-6" variant="default">
          Save Roadmap
        </Button>
      </div>

      {/* JSON Textarea Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm">Edit Roadmap JSON</span>
          <Button size="sm" variant="secondary" onClick={loadFromJson} className="ml-2">
            Load from JSON
          </Button>
        </div>
        <textarea
          value={jsonValue}
          onChange={(e) => setJsonValue(e.target.value)}
          className="w-full min-h-[150px] md:min-h-[220px] font-mono text-xs rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-vertical"
          spellCheck={false}
        />
        {jsonError && <div className="text-red-500 text-xs mt-1">{jsonError}</div>}      <div className="text-xs text-muted-foreground mt-1">
          Paste or edit the roadmap JSON above and click &quot;Load from JSON&quot; to update the visual editor.
        </div>
      </div>

      <div className="text-sm text-muted-foreground mt-4">
        This roadmap editor allows you to visualize a learning path with main topics (connected vertically) and
        subtopics (connected with dotted lines).
      </div>
    </div>
  )
}
