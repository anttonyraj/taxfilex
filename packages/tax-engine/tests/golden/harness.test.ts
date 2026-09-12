import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compute, EngineInput, LineId } from '../../src/index.js';

interface ScenarioFile {
  scenarioId: string;
  description: string;
  input: EngineInput;
  expected: {
    lines: Record<string, number>;
    forms: string[];
    scopeFlagCodes: string[];
    warningsCount?: number;
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scenariosDir = path.resolve(__dirname, '../../../../docs/scenarios');

describe('Tax Engine Golden Scenario Harness (25+ Scenarios)', () => {
  const scenarioFiles = fs
    .readdirSync(scenariosDir)
    .filter((file) => file.endsWith('.json'))
    .sort();

  it('contains at least 25 golden test scenarios', () => {
    expect(scenarioFiles.length).toBeGreaterThanOrEqual(25);
  });

  for (const filename of scenarioFiles) {
    const filePath = path.join(scenariosDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const scenario = JSON.parse(content) as ScenarioFile;

    it(`executes ${scenario.scenarioId}: ${scenario.description}`, () => {
      const result = compute(scenario.input);

      // Verify every expected line matches exactly
      for (const [lineId, expectedValue] of Object.entries(scenario.expected.lines)) {
        const lineResult = result.lines[lineId as LineId];
        expect(lineResult, `Line ${lineId} should be present in ReturnResult`).toBeDefined();
        expect(
          lineResult?.value,
          `Line ${lineId} value mismatch in ${scenario.scenarioId}`
        ).toBe(expectedValue);

        // Non-negotiable rule: Every number is traceable
        expect(
          lineResult?.ruleId,
          `Line ${lineId} must have a valid ruleId`
        ).toMatch(/^RULE-TY2026-/);
        expect(
          lineResult?.sources.length,
          `Line ${lineId} must have at least one source trace`
        ).toBeGreaterThanOrEqual(1);

        for (const source of lineResult?.sources ?? []) {
          expect(source.boxOrLine).toBeTruthy();
          expect(source.description).toBeTruthy();
        }
      }

      // Verify expected forms
      expect(result.forms.sort()).toEqual(scenario.expected.forms.sort());

      // Verify scope flags
      const actualFlagCodes = result.scopeFlags.map((f) => f.code).sort();
      expect(actualFlagCodes).toEqual(scenario.expected.scopeFlagCodes.sort());

      // Verify warnings count if specified
      if (typeof scenario.expected.warningsCount === 'number') {
        expect(result.warnings.length).toBe(scenario.expected.warningsCount);
      }
    });
  }
});
