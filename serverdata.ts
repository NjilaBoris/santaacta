export type InfoRow = { label: string; description: string }
export type InfoCard = { title: string; description: string; rows?: InfoRow[] }
export type Step = { number: number; text: string }

export type ContentBlock =
  | { type: 'intro'; text: string }
  | { type: 'info-cards'; cards: InfoCard[] }
  | { type: 'dash-list'; title?: string; items: string[]; note?: string }
  | { type: 'steps'; title: string; steps: Step[]; note?: string }
  | { type: 'plain-list'; items: string[]; note?: string }
  | { type: 'report-form' }

export type ServiceSection = {
  id: string
  code: string
  title: string
  blocks: ContentBlock[]
}

export const servicesIntro = {
  eyebrow: 'Council Services',
  title: 'Services for residents',
  description:
    'Civil registration, permits, market management and hygiene: the services residents interact with most directly.',
}

export const services: ServiceSection[] = [
  {
    id: 'civil-registration',
    code: '5.A',
    title: 'Civil Registration',
    blocks: [
      {
        type: 'intro',
        text: 'The Santa Council Civil Status Registry provides essential civil registration services, including the registration and documentation of births, marriages, and deaths.',
      },
      {
        type: 'info-cards',
        cards: [
          {
            title: 'Birth declaration & certificate',
            description:
              "A birth certificate is an official document that records the birth of a child and establishes their legal identity. Births should be declared and registered through the Civil Status Registry.",
            rows: [
              {
                label: 'Who can declare',
                description:
                  'For births in a health facility: the head of the establishment, a medical officer, or another authorised witness to the delivery. For home births: consult the local authority and the Civil Status Registry.',
              },
              {
                label: 'When to declare',
                description:
                  'Within the legally prescribed period. Late registration follows an additional procedure; confirm requirements with the Registry.',
              },
              {
                label: 'What you may need',
                description:
                  "Birth declaration from the health facility, parents' identification documents, information on the child, and any other document requested by the Registry.",
              },
            ],
          },
          {
            title: 'Marriage registration & certificate',
            description:
              'Marriage registration is the official process through which a civil marriage is declared and recorded. Couples should complete the required formalities before the ceremony.',
            rows: [
              {
                label: 'Typically required',
                description:
                  'Birth certificates of both spouses, proof of marital status, ID or passport, declaration of intention to marry, witness IDs, photographs, and family information where required.',
              },
              {
                label: 'Special circumstances',
                description:
                  'Additional documents may apply if a spouse is widowed, divorced, entering a polygamous marriage, a member of the armed forces or gendarmerie, or registering following a court judgment.',
              },
            ],
          },
          {
            title: 'Death declaration & certificate',
            description:
              "A death declaration is the official registration of a person's death, enabling the Registry to issue the death certificate.",
            rows: [
              {
                label: 'Who can declare',
                description:
                  'Declarable at Santa Council where Santa is the place of death, burial, residence or birth of the deceased, by the head of family, a relative, or anyone with full knowledge of the death.',
              },
              { label: 'Time limit', description: 'The death should be declared within 90 days.' },
              { label: 'Witnesses', description: 'The declaration must be certified by two witnesses.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'building-demolition-permits',
    code: '5.B',
    title: 'Building & Demolition Permits',
    blocks: [
      {
        type: 'dash-list',
        title: 'Building permit',
        items: [
          'Architectural plans of the proposed building',
          'Site and situation plan',
          'Building specifications and cost estimates',
          'Structural / engineering documents where applicable',
          'Relevant town-planning documentation',
          'Payment of applicable Council and administrative fees',
          'Site inspection, where required',
        ],
      },
      {
        type: 'steps',
        title: 'Demolition permit',
        steps: [
          { number: 1, text: 'Submit a formal application to the Mayor through the appropriate Council service.' },
          { number: 2, text: 'Provide the required supporting documents and applicable fees.' },
          { number: 3, text: "Allow the Council's technical team to assess the proposed demolition, where required." },
          { number: 4, text: 'Obtain the necessary authorisation before commencing demolition.' },
        ],
        note: "Requirements, fees and technical standards should be confirmed with the Santa Council Town Planning / Development service before work begins.",
      },
    ],
  },
  {
    id: 'market-management',
    code: '5.C',
    title: 'Market Management',
    blocks: [
      {
        type: 'intro',
        text: 'The Santa Council manages municipal markets across Santa Subdivision, supporting orderly trading and maintaining market facilities.',
      },
      {
        type: 'dash-list',
        items: [
          'Management of municipal markets and trading spaces',
          'Maintenance and improvement of market facilities',
          'Support for orderly and lawful trading',
          'Management of market stalls and commercial spaces',
          'Sanitation and cleanliness within market areas',
          'Addressing concerns affecting traders and market users',
        ],
      },
      { type: 'report-form' },
    ],
  },
  {
    id: 'hygiene-sanitation',
    code: '5.D',
    title: 'Hygiene & Sanitation',
    blocks: [
      {
        type: 'intro',
        text: 'The Santa Council supports cleanliness and healthy living conditions across the municipality through sanitation activities, inspections, and waste management services.',
      },
      {
        type: 'plain-list',
        items: [
          'Collection and disposal of waste from markets, public spaces and other designated areas',
          'Cleaning and maintenance of public places',
          'Inspection of building sites for hygiene and sanitation compliance',
          'Inspection of unhygienic environments: public toilets, roadsides, drainage, areas around homes',
          'Monitoring of conditions that may pose risks to public health',
          'Community sensitisation on sanitation and waste disposal',
        ],
        note: 'Residents are encouraged to keep their surroundings clean and report sanitation concerns through the appropriate Council channels.',
      },
    ],
  },
]