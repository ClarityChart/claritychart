'use client';
import { useState } from 'react';
import { C } from './tokens';
import { Textarea, Btn, VoiceBtn, DocOutput } from './ui';
import { SCENARIOS, buildRNNoteSystem } from './rnScenarios';

export default function RNVisitNote({ onBack }) {
  const [stage, setStage] = useState('select'); // select | prompts | output
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const selectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setResponses({});
    setNote('');
    setError('');
    setStage('prompts');
  };

  const reset = () => {
    setStage('select');
    setSelectedScenario(null);
    setResponses({});
    setNote('');
    setError('');
  };

  const filledCount = Object.values(responses).filter(v => v?.trim()).length;
  const totalPrompts = selectedScenario?.prompts.length || 0;

  const generate = async () => {
    if (filledCount === 0) {
      setError('Please respond to at least one prompt before generating.');
      return;
    }
    setError(''); setLoading(true); setStage('output'); setNote('');
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: buildRNNoteSystem(selectedScenario, responses),
          messages: [{ role: 'user', content: 'Generate the RN visit note now.' }],
        }),
      });
      const d = await r.json();
      const text = d.content?.[0]?.text || '';
      if (!text) throw new Error('Empty response');
      setNote(text);
    } catch (e) {
      setError('Generation failed. Please try again.');
      setStage('prompts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`
        textarea::placeholder { color: rgba(196,168,130,0.3); }
        textarea:focus { outline: none; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(196,168,130,0.2); border-radius: 3px; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
      `}</style>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>

        {/* Header */}
        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>
              ‹ PLATFORM HOME
            </button>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, marginBottom: '4px' }}>RN VISIT NOTE</div>
            <div style={{ fontSize: '20px', color: C.text }}>
              {stage === 'select' ? 'Select Clinical Scenario' : stage === 'prompts' ? selectedScenario?.label : 'Visit Note'}
            </div>
            {selectedScenario && stage !== 'select' && (
              <div style={{ fontSize: '12px', color: C.goldDim, marginTop: '4px', fontStyle: 'italic' }}>{selectedScenario.description}</div>
            )}
          </div>
          {stage !== 'select' && (
            <Btn variant="ghost" onClick={reset}>← Scenarios</Btn>
          )}
        </div>

        {error && (
          <div style={{ background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: '2px', padding: '10px 16px', color: '#e07070', fontSize: '12px', fontFamily: C.mono, marginBottom: '20px' }}>
            ⚠ {error}
          </div>
        )}

        {/* Stage: Select Scenario */}
        {stage === 'select' && (
          <div>
            <div style={{ fontSize: '12px', color: C.goldDim, marginBottom: '20px' }}>
              Select the scenario that best matches this visit. You will be prompted for 8 clinical assessment points.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {SCENARIOS.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} onSelect={selectScenario} />
              ))}
            </div>
          </div>
        )}

        {/* Stage: Prompts */}
        {stage === 'prompts' && selectedScenario && (
          <div>
            {/* Progress indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
              <div style={{ flex: 1, height: '2px', background: C.border, borderRadius: '1px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: C.gold, width: `${(filledCount / totalPrompts) * 100}%`, transition: 'width 0.3s' }} />
              </div>
              <div style={{ fontSize: '11px', fontFamily: C.mono, color: C.goldDim, whiteSpace: 'nowrap' }}>
                {filledCount}/{totalPrompts} completed
              </div>
            </div>

            {selectedScenario.prompts.map((prompt, i) => (
              <div key={i} style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '16px' }}>
                  <div style={{ fontSize: '13px', color: responses[i]?.trim() ? C.text : C.textDim, lineHeight: 1.5, flex: 1 }}>
                    <span style={{ color: C.goldDim, fontFamily: C.mono, fontSize: '10px', marginRight: '8px' }}>{i + 1}.</span>
                    {prompt}
                  </div>
                  <VoiceBtn onTranscript={t => setResponses(r => ({ ...r, [i]: r[i] ? r[i] + ' ' + t : t }))} />
                </div>
                <Textarea
                  value={responses[i] || ''}
                  onChange={v => setResponses(r => ({ ...r, [i]: v }))}
                  placeholder="Dictate or type your response..."
                  rows={3}
                />
              </div>
            ))}

            <div style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: C.goldDim, fontFamily: C.mono, marginBottom: '8px' }}>READY TO GENERATE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: C.textDim }}>
                <div>Scenario: <span style={{ color: C.text }}>{selectedScenario.label}</span></div>
                <div>Prompts answered: <span style={{ color: filledCount > 0 ? C.green : '#e07070' }}>{filledCount} of {totalPrompts}</span></div>
                <div>Output: <span style={{ color: C.gold }}>Structured Visit Note</span></div>
                <div>Unfilled prompts: <span style={{ color: C.goldDim }}>omitted from note</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="secondary" onClick={reset}>← Scenarios</Btn>
              <Btn onClick={generate} disabled={filledCount === 0} style={{ padding: '12px 32px' }}>
                Generate Visit Note →
              </Btn>
            </div>
          </div>
        )}

        {/* Stage: Output */}
        {stage === 'output' && (
          <div>
            {loading && (
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', padding: '40px', textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '20px' }}>
                  GENERATING VISIT NOTE…
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.gold, animation: `bounce 1.2s ${i * 0.2}s infinite ease-in-out` }} />
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: C.goldDim, marginTop: '16px', fontFamily: C.mono }}>
                  {selectedScenario?.label} · {filledCount} prompts provided
                </div>
              </div>
            )}

            {note && (
              <>
                <DocOutput title={`RN Visit Note — ${selectedScenario?.label}`} content={note} />
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <Btn variant="secondary" onClick={() => setStage('prompts')}>← Edit Responses</Btn>
                  <Btn variant="secondary" onClick={reset}>New Visit Note</Btn>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ScenarioCard({ scenario, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onSelect(scenario)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 18px',
        background: hov ? C.bgCardHover : C.bgCard,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        borderRadius: '2px', cursor: 'pointer', textAlign: 'left',
        transition: 'all 0.15s', width: '100%',
      }}
    >
      <div style={{ width: '28px', height: '28px', borderRadius: '2px', background: 'rgba(196,168,130,0.08)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: C.mono, fontSize: '12px', color: C.goldDim, flexShrink: 0 }}>
        {scenario.id}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', color: C.text, marginBottom: '3px' }}>{scenario.label}</div>
        <div style={{ fontSize: '11px', color: C.goldDim, fontStyle: 'italic' }}>{scenario.description}</div>
      </div>
      <div style={{ fontSize: '10px', color: C.goldDim, fontFamily: C.mono, flexShrink: 0 }}>8 prompts</div>
      <span style={{ color: hov ? C.gold : C.border, fontSize: '16px', transition: 'all 0.15s', transform: hov ? 'translateX(2px)' : 'none', display: 'inline-block' }}>›</span>
    </button>
  );
}
