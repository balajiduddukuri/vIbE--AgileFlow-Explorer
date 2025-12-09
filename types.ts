export enum NodeType {
  DOCUMENT = 'DOCUMENT',
  MEETING = 'MEETING',
  WORKSHOP = 'WORKSHOP',
  DECISION = 'DECISION',
  PHASE = 'PHASE',
  ACTION = 'ACTION',
  TERMINAL = 'TERMINAL'
}

export interface NodeData {
  id: string;
  label: string;
  type: NodeType;
  description?: string;
  responsibility?: string;
  participants?: string;
  content?: string; // The "Content" section from the OCR
  activities?: string[]; // The "Activities" section from the OCR
  inputs?: string[];
  outputs?: string[];
  x?: number; // Logical grid position X
  y?: number; // Logical grid position Y
  column?: string; // For column-based layout
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
