import { expect } from 'vitest';
import { describe } from 'vitest';
import { test } from 'vitest';

import { formatStages } from '@utils/process-files.utils.ts';
import { Stage } from '@utils/process-files.utils.ts';
import { processFiles } from '@utils/process-files.utils.ts';

const expectedFormattedOutput =
    `1 Feasibility
1.1 Qualification
1.2 Site Assessment
1.3 Proposal Review
2 Design
2.1 Architectural
2.2 Interior & Finishes
2.3 Finalization & Estimates
3 Permitting
3.1 Documentation
3.2 Submission
3.3 City Comments
4 Construction
4.1 Foundation
4.2 Electrical
4.3 Structure
4.4 Finishes`;

const mockStageData: Stage[][] = [
    [
        { stageName: 'permitting', name: 'Documentation', prerequisites: [] },
        { stageName: 'permitting', name: 'Submission', prerequisites: ['Documentation'] },
        { stageName: 'permitting', name: 'City Comments', prerequisites: ['Submission'] }
    ],
    [
        { stageName: 'feasibility', name: 'Qualification', prerequisites: [] },
        { stageName: 'feasibility', name: 'Site Assessment', prerequisites: ['Qualification'] },
        { stageName: 'feasibility', name: 'Proposal Review', prerequisites: ['Site Assessment'] }
    ],
    [
        { stageName: 'design', name: 'Architectural', prerequisites: [] },
        { stageName: 'design', name: 'Interior & Finishes', prerequisites: [] },
        {
            stageName: 'design',
            name: 'Finalization & Estimates',
            prerequisites: ['Architectural', 'Interior & Finishes']
        }
    ],
    [
        { stageName: 'construction', name: 'Foundation', prerequisites: [] },
        { stageName: 'construction', name: 'Electrical', prerequisites: ['Foundation'] },
        { stageName: 'construction', name: 'Structure', prerequisites: ['Foundation'] },
        { stageName: 'construction', name: 'Finishes', prerequisites: ['Electrical'] }
    ]
];

const mockFile = (name: string, text: string) => new File([text], name, { type: 'text/plain' });

describe('formatStages', () => {
    test('- empty stages and phases', () => {
        const stages: any[] = [];
        const phases: any[] = [];
        const result = formatStages(stages, phases);
        expect(result).toBe('');
    });

    test('should format stages with correct numbering and order', () => {
        const mockPhases = [
            'Feasibility',
            'Design',
            'Permitting',
            'Construction'
        ];

        const formattedString = formatStages(mockStageData, mockPhases);

        expect(formattedString).toContain(expectedFormattedOutput);
    });
});

describe('processFiles', () => {
    test('- empty files', async () => {
        const files = [] as File[];
        const result = await processFiles(files);
        expect(result).toBe('');
    });

    test('- missing phases.json', async () => {
        const files = [mockFile('stage1.json', '{}')];
        const result = await processFiles(files);
        expect(result).toBe('Your selection requires a phases.json file. Please upload it again with the other files you\'ve selected.');
    });
});
