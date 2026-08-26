export type Bureau = {
  title: string
  description: string
  offices?: string[]
  services?: string[]
}

export type Department = {
  id: string
  code: string
  title: string
  description: string
  bureaus: Bureau[]
}

export const departments: Department[] = [
  {
    id: 'general-affairs',
    code: '3.A',
    title: 'General Affairs Service',
    description:
      'Supports the administrative and institutional functions of the Santa Council, bringing together bureaux responsible for personnel, civil status, legal matters, archives, and official correspondence.',
    bureaus: [
      {
        title: 'Human Resources Bureau',
        description: 'Manages personnel-related matters within the Santa Council.',
        offices: ['Personnel Office', 'Vocational Office'],
      },
      {
        title: 'Civil Status and Population Growth Affairs Bureau',
        description:
          'Manages services and records relating to the civil status and population of residents.',
        offices: ['Civil Status Office', 'Population Growth Affairs Office'],
        services: [
          'Birth declaration and registration',
          'Marriage registration',
          'Death declaration and registration',
          'Population-related records and information',
        ],
      },
      {
        title: 'Legal Affairs, Litigations and Insurance Bureau',
        description:
          'Handles legal and litigation-related matters concerning the Council, and manages insurance-related affairs.',
        offices: ['Legal Affairs Office', 'Litigation Office', 'Insurance Office'],
      },
      {
        title: 'Archives Bureau',
        description: 'Responsible for the organisation, preservation, and management of official Council records.',
      },
      {
        title: 'Mails, Registration and Filing Bureau',
        description: 'Receives, registers, circulates, and files incoming and outgoing correspondence.',
      },
    ],
  },
  {
    id: 'economic-financial',
    code: '3.B',
    title: 'Economic and Financial Service',
    description:
      'Supports the Council in managing its financial resources, supplies, equipment, revenue-generating activities, and local economic development initiatives.',
    bureaus: [
      {
        title: 'Budget and Financial Matters Bureau',
        description: 'Manages financial resources and monitors how public funds are collected and used.',
        offices: [
          'Revenue and Tax Base Office - identification and management of Council revenue sources',
          'Expenditure Monitoring Office - monitors Council expenditure and accountability',
        ],
      },
      {
        title: 'General Supplies and Means Bureau',
        description: 'Manages procurement, maintenance, and security of resources needed for the Council.',
        offices: [
          'Procurement Office - acquisition of goods and services',
          'Maintenance and Security Office - maintenance and security of assets',
        ],
      },
      {
        title: 'Council Equipment Management Bureau',
        description: 'Oversees Council-owned equipment and commercial facilities.',
        offices: ['Motor Parks Office', 'Markets and Slaughter Houses Office', 'Other Equipment Office'],
      },
      {
        title: 'Economic Promotion Bureau',
        description: 'Supports local economic development and income-generating initiatives.',
        offices: [
          'Micro Projects Support Office',
          'Planning and Income-Generating Activities Office',
          'Tourism and Economic Promotion Office',
        ],
      },
    ],
  },
  {
    id: 'planning-development',
    code: '3.C',
    title: 'Technical Service for Planning and Regional Development',
    description:
      'Supports the Council in planning, infrastructure development, construction regulation, roads, engineering, and water management.',
    bureaus: [
      {
        title: 'Planning and Construction Bureau',
        description: 'Oversees construction, land use, and physical development within the Council area.',
        offices: ['Construction Permit Office', 'Land and Survey Matters Office'],
      },
      {
        title: 'Roads and Bridges Bureau',
        description: 'Responsible for roads, bridges, drainage, and engineering infrastructure.',
        offices: ['Roads and Bridges Office', 'Civil Engineering Office', 'Rural Engineering Office'],
      },
      {
        title: 'Water Management Bureau',
        description: 'Oversees Council-related water services and local water infrastructure.',
        offices: ['Connection / Disconnection / Maintenance Office', 'Bills and Water Record Management Office'],
      },
    ],
  },
  {
    id: 'hygiene-sanitation',
    code: '3.D',
    title: 'Hygiene and Sanitation Service',
    description: 'Supports efforts to maintain clean, healthy, and environmentally safe communities across Santa.',
    bureaus: [
      {
        title: 'Hygiene and Sanitation Bureau',
        description: 'Focuses on sanitation, cleanliness, waste management, and drainage.',
        offices: ['Hygiene and Sanitation Office', 'Waste and Drainage Office'],
      },
      {
        title: 'Civil and Environmental Protection Bureau',
        description: 'Supports protection of communities, the environment, and Council forests and green spaces.',
        offices: [
          'Civil Protection Office',
          'Environmental and Natural Resources Office',
          'Wood, Council Forest and City Greens Office',
        ],
      },
    ],
  },
  {
    id: 'social-cultural',
    code: '3.E',
    title: 'Social and Cultural Service',
    description:
      "Supports social well-being, inclusion, and development: youth participation, sports and leisure, social protection, women's empowerment, and support for persons living with disabilities.",
    bureaus: [
      {
        title: 'Health and Social Action Bureau',
        description: 'Supports community well-being, social protection, and access to basic social services.',
        offices: [
          'Health and social welfare',
          'Community social support',
          'Youth development',
          'Sports and leisure activities',
        ],
      },
      {
        title: 'Women Empowerment Bureau',
        description: 'Supports participation, empowerment, and socio-economic advancement of women in Santa.',
      },
      {
        title: 'Persons Living with Disabilities Bureau',
        description: 'Promotes inclusion, participation, and social well-being of persons living with disabilities.',
      },
      {
        title: 'Social Action, Child Protection and Social Education',
        description:
          'Supports social protection, child welfare, and community awareness on issues affecting children and families.',
      },
    ],
  },
  {
    id: 'communication-cooperation',
    code: '3.F',
    title: 'Communication, Cooperation and Local Partnership Bureau',
    description: 'Supports communication between the Council, residents, community actors, and partner organisations.',
    bureaus: [
      {
        title: 'Public Relations Office',
        description: 'Shares information about Council programmes, services, decisions and activities.',
      },
      {
        title: 'Council Community Animator',
        description: 'Facilitates community participation and connects residents with relevant Council services.',
      },
      {
        title: 'Municipal Police',
        description: 'Supports the Council in maintaining order and enforcing applicable municipal regulations.',
      },
    ],
  },
]