export interface Stage {
    stageName: string;
    name: string;
    prerequisites: string[];
}

export const formatStages = (stages: Stage[][], phases: string[]): string => {
    const output: string[] = [];
    // flatten the stages to avoid triple loops
    const flattenedStages = stages.reduce((a, b) => a.concat(b), []);
    phases.forEach((phase: string, i: number) => {
        const stagesObj = { [phase]: flattenedStages.filter(stage => stage.stageName === phase.toLowerCase()) };
        output.push(`${i + 1} ${phase}`);
        const currentPhase = stagesObj[phase].map((stage: Stage, j: number) => `${i + 1}.${j + 1} ${stage.name}`).join('\n');
        output.push(currentPhase);
    });

    return output.join('\n');
};

export const processFiles = async (files: File[]) => {
    if (files.length) {
        // while processing a file, if there are any syntax errors (i.e. JSON.parse -> Error) then throw error
        // take files in, look for file named phases.json, if it doesn't exist throw an error. Otherwise, parse json string
        const phasesFile = files.find(file => file.name === 'phases.json');
        if (!phasesFile) {
            return 'Your selection requires a phases.json file. Please upload it again with the other files you\'ve selected.';
        }

        // are there as many files as the length of phases?
        const phasesJson = JSON.parse(await phasesFile!.text());
        if (phasesJson.length !== files.length - 1) {
            return `Your phases file requires ${phasesJson.length} files, and you only gave ${files.length - 1} other files. Please make sure you uploaded all the correct files.`;
        }

        // ensure ordering of phases first
        let phases: string[] = [];
        for (const phase of phasesJson) {
            const { prerequisites, name } = phase;
            for (const prerequisite of prerequisites) {
                // is this phase already in the list?
                if (phases.includes(prerequisite)) {
                    // is the name already in the list?
                    if (phases.includes(name)) {
                        continue;
                    } else {
                        // insert prereq to be before name of phase
                        const prereqIdx = phases.indexOf(prerequisite) + 1;
                        // no .toSplicedMethod available for current ts version
                        phases = [...phases.splice(prereqIdx, 0, name)];
                    }
                } else {
                    if (phases.includes(name)) {
                        const prereqIdx = phases.indexOf(name);
                        phases = [...phases.splice(prereqIdx, 0, name)];
                    } else {
                        phases.push(prerequisite);
                        phases.push(name);
                    }
                }
            }
        }

        const stageFiles = files.filter(file => file.name !== 'phases.json');
        const stages: Stage[][] = await Promise.all(stageFiles.map(async file => {
            // need to know which file this stage came from
            const parsedStageFiles = JSON.parse(await file.text());
            const stageName = file.name.replace('.json', '');
            return parsedStageFiles.map((stage: File) => ({ stageName, ...stage }));
        }));

        return formatStages(stages, phases);
    }

    return '';
};

