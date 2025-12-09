import { NodeData, NodeType } from './types';

export const PROCESS_NODES: NodeData[] = [
  // --- INITIATION ---
  {
    id: 'business-needs',
    label: 'Business Needs Document',
    type: NodeType.DOCUMENT,
    responsibility: 'Project Sponsor',
    description: 'Outlines the high-level deliverables and analyzes the necessities of the project.',
    content: 'What needs to be created, High-Level Deliverables, needs of the project will be analyzed.',
    column: 'initiation'
  },
  {
    id: 'business-case',
    label: 'Business Case',
    type: NodeType.DOCUMENT,
    responsibility: 'Project Sponsor',
    description: 'Evaluates the economic feasibility and strategic justification for the project.',
    content: 'Economic Feasibility Study.',
    column: 'initiation'
  },
  {
    id: 'benefits-plan',
    label: 'Benefits Management Plan',
    type: NodeType.DOCUMENT,
    responsibility: 'Project Sponsor',
    description: 'Defines how and when the benefits of the project will be delivered and measured.',
    content: 'How and when Benefits of the project will be derived and measured.',
    column: 'initiation'
  },
  {
    id: 'project-charter',
    label: 'Project Charter',
    type: NodeType.DOCUMENT,
    responsibility: 'Project Sponsor',
    description: 'Purpose: Formal Authorization',
    content: 'Name of the Project Manager, Responsibilities and Authority and Name of the Project Sponsor, Responsibilities and Authority, High level information.',
    column: 'initiation'
  },
  {
    id: 'go-no-go',
    label: 'Go / No-Go Decision',
    type: NodeType.DECISION,
    description: 'Determine if the project should proceed based on initiation documents.',
    column: 'initiation'
  },

  // --- SETUP / KICKOFF ---
  {
    id: 'methodology',
    label: 'Select Methodology',
    type: NodeType.DECISION,
    description: 'If Methodology = Agile, follow the process of methodology selected.',
    column: 'setup'
  },
  {
    id: 'kick-off',
    label: 'KICK OFF MEETING',
    type: NodeType.MEETING,
    participants: 'Scrum Team (PO, SM and Dev Team)',
    description: 'Initial meeting to align the Scrum Team on ground rules and project objectives.',
    content: 'Ground Rules.',
    column: 'setup'
  },
  {
    id: 'vision-statement',
    label: 'Project Vision Statement',
    type: NodeType.DOCUMENT,
    responsibility: 'Product Owner',
    description: 'Defines the long-term goals, key features, and differentiators of the product.',
    content: 'Project Objectives, Product/solution Description, Differentiators, Key Features and benefits.',
    column: 'setup'
  },
  {
    id: 'team-charter',
    label: 'Team Charter',
    type: NodeType.DOCUMENT,
    responsibility: 'Dev Team',
    description: 'Establishes the working agreements, values, and ground rules for the development team.',
    content: 'Ground Rules and team agreements.',
    column: 'setup'
  },
  {
    id: 'initial-backlog',
    label: 'Initial Product Backlog',
    type: NodeType.DOCUMENT,
    responsibility: 'Product Owner',
    description: 'A high-level list of initial requirements, typically at the Epic or Feature level.',
    content: 'High level requirements will be written (Requirements at Epic or themes or Features level).',
    column: 'setup'
  },

  // --- PLANNING / ROADMAP ---
  {
    id: 'user-story-workshop',
    label: 'USER STORY WRITING WORKSHOP',
    type: NodeType.WORKSHOP,
    participants: 'Scrum Team (PO, SM and Dev Team)',
    description: 'Collaborative session to create user stories and define acceptance criteria.',
    content: 'User stories will be written in the product backlog. DOD (Definition of Done) and DOR (Definition of Ready) will be written by Dev Team.',
    column: 'planning'
  },
  {
    id: 'product-backlog',
    label: 'Product Backlog',
    type: NodeType.DOCUMENT,
    responsibility: 'Product Owner / Dev Team',
    description: 'The authoritative source of work for the team, ordered by value/priority.',
    content: 'Prioritized list of work for the development team that is derived from the roadmap and its requirements.',
    column: 'planning'
  },
  {
    id: 'est-prior-workshop',
    label: 'ESTIMATION / PRIORITIZATION WORKSHOP',
    type: NodeType.WORKSHOP,
    participants: 'Scrum Team (PO, SM and Dev Team)',
    description: 'Workshop to estimate the effort for user stories and prioritize them.',
    content: 'Story points will be given be Dev Team and User stories will be prioritized by Product Owner.',
    column: 'planning'
  },
  {
    id: 'roadmap',
    label: 'Project/Product Roadmap',
    type: NodeType.DOCUMENT,
    responsibility: 'Product owner',
    description: 'Visual timeline outlining the strategic direction and major milestones of the product.',
    content: 'Shows strategy and direction the project/product will take.',
    column: 'planning'
  },
  {
    id: 'release-planning',
    label: 'RELEASE PLANNING MEETING',
    type: NodeType.MEETING,
    participants: 'Scrum Team (PO, SM and Dev Team)',
    description: 'Meeting to determine the release schedule, sprint cadence, and estimated costs.',
    content: 'PO along with Team will decide: How many releases, How many sprints in each releases and sprints duration. Cost will be estimated.',
    column: 'planning'
  },
  {
    id: 'release-schedule',
    label: 'Release Schedule',
    type: NodeType.DOCUMENT,
    responsibility: 'Product Owner and Dev Team',
    description: 'Timeline indicating when specific product releases are planned to occur.',
    content: 'Plan showing when releases will happen.',
    column: 'planning'
  },
  {
    id: 'release-backlog',
    label: 'Release Backlog',
    type: NodeType.DOCUMENT,
    responsibility: 'Product Owner and Dev Team',
    description: 'A subset of the Product Backlog selected for a specific upcoming release.',
    content: 'Will have user stories that must be implemented in each release planned.',
    column: 'planning'
  },

  // --- SPRINT CYCLE ---
  {
    id: 'sprint-zero',
    label: 'Sprint Zero (Optional)',
    type: NodeType.ACTION,
    description: 'Basic Preparation before starting working sprint.',
    column: 'sprint'
  },
  {
    id: 'sprint-planning',
    label: 'SPRINT PLANNING MEETING',
    type: NodeType.MEETING,
    participants: 'Scrum Team (PO, Dev Team, SM)',
    description: 'Meeting to plan the work for the upcoming Sprint and define the Sprint Goal.',
    activities: [
      'Sprint goal will be defined by Dev team.',
      'Dev Team will pick user stories from Product Backlog and forms sprint backlog.',
      'If any clarifications on the user stories needed, Dev team will clarify with PO.',
      'Dev team will decompose user stories in to tasks.',
      'User stories will be assigned to Devteam by themselves.'
    ],
    column: 'sprint'
  },
  {
    id: 'dor-check',
    label: 'DoR Check',
    type: NodeType.DECISION,
    description: 'Does the work meet the Definition of Ready (DOR)?',
    column: 'sprint'
  },
  {
    id: 'sprint-backlog',
    label: 'Sprint Backlog',
    type: NodeType.DOCUMENT,
    description: 'The set of Product Backlog items selected for the Sprint.',
    column: 'sprint'
  },
  {
    id: 'execution',
    label: 'Execution of the Sprint',
    type: NodeType.ACTION,
    description: 'The daily work performed by the Development Team to implement user stories.',
    activities: [
      'Dev team will execute the tasks.',
      'Daily Standup Meeting: What\'s been done? What needs to be done? Any impediments?'
    ],
    column: 'sprint'
  },
  {
    id: 'daily-standup',
    label: 'Daily Standup Meeting',
    type: NodeType.MEETING,
    participants: 'SM and Dev Team',
    description: 'A short daily meeting to synchronize activities and plan for the next 24 hours.',
    activities: [
      'What\'s been done since last meeting?',
      'What needs to be done before the next meeting?',
      'Any Issues or impediments?'
    ],
    column: 'sprint'
  },
  {
    id: 'dod-check',
    label: 'DoD Check',
    type: NodeType.DECISION,
    description: 'Does the User Story (US) meet the Definition of Done (DOD)?',
    column: 'sprint'
  },
  {
    id: 'sprint-review',
    label: 'Sprint Review Meeting',
    type: NodeType.MEETING,
    participants: 'Scrum Team (PO, SM and Dev Team)',
    description: 'Meeting at the end of the Sprint to inspect the Increment and adapt the Product Backlog.',
    activities: [
      'Dev team will show the demo of user stories that meets DOD to PO.',
      'PO will accept or reject user stories and also provide changes/feedback.',
      'PO along with other scrum team members will discuss where to fit changes in Product Backlog.'
    ],
    column: 'sprint'
  },
  {
    id: 'sprint-retro',
    label: 'Sprint Retrospective Meeting',
    type: NodeType.MEETING,
    participants: 'Scrum Team (PO, SM and Dev Team)',
    description: 'Meeting to inspect the team\'s processes and create a plan for improvements.',
    activities: [
      'What went well and what not went well will be discussed.',
      'Any corrective or preventive measure will be defined.'
    ],
    column: 'sprint'
  },
  {
    id: 'grooming',
    label: 'Grooming or Refinement',
    type: NodeType.WORKSHOP,
    description: 'Ongoing process of adding detail, estimates, and order to items in the Product Backlog.',
    column: 'sprint'
  },

  // --- RELEASE / CLOSURE ---
  {
    id: 'hardening',
    label: 'Hardening Sprint (Optional)',
    type: NodeType.ACTION,
    description: 'Perform activities that will help to launch the product (stabilization).',
    column: 'release'
  },
  {
    id: 'release-decision',
    label: 'Release Planned?',
    type: NodeType.DECISION,
    description: 'Is a release planned for this cycle?',
    column: 'release'
  },
  {
    id: 'go-live',
    label: 'Go-Live / Hand-Over to Customer',
    type: NodeType.TERMINAL,
    description: 'Releasing the product increment to customers.',
    column: 'release'
  },
  {
    id: 'project-closure',
    label: 'Project Closure',
    type: NodeType.TERMINAL,
    description: 'Formal closing of the project if this was the last release.',
    column: 'release'
  }
];

export const PHASES = [
  { id: 'initiation', label: 'Initiation' },
  { id: 'setup', label: 'Setup & Kickoff' },
  { id: 'planning', label: 'Planning & Roadmap' },
  { id: 'sprint', label: 'Sprint Cycle' },
  { id: 'release', label: 'Release & Closure' }
];

// Data Validation
(function validateProcessNodes() {
  const seenIds = new Set<string>();
  const errors: string[] = [];

  PROCESS_NODES.forEach((node, index) => {
    // Check required fields
    if (!node.id) {
      errors.push(`Node at index ${index} is missing required field 'id'.`);
    } else {
      // Check for uniqueness if id exists
      if (seenIds.has(node.id)) {
        errors.push(`Duplicate ID detected: '${node.id}' at index ${index}.`);
      }
      seenIds.add(node.id);
    }

    if (!node.label) {
      errors.push(`Node at index ${index} (id: ${node.id || 'unknown'}) is missing required field 'label'.`);
    }

    if (!node.type) {
      errors.push(`Node at index ${index} (id: ${node.id || 'unknown'}) is missing required field 'type'.`);
    }
  });

  if (errors.length > 0) {
    console.error('[Data Validation] Found inconsistencies in PROCESS_NODES:', errors);
  } else {
    // console.log('[Data Validation] PROCESS_NODES data is valid.');
  }
})();
