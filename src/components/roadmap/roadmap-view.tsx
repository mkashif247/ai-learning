import { PracticeModal } from '@/components/learning/practice-modal';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Clock, Play, BookOpen, ExternalLink, ChevronRight, Code2, X } from 'lucide-react';

// ... existing code ...

export const RoadmapView = ({ phases, roadmapId, onTopicClick }: RoadmapViewProps) => {
  const [updatingTopic, setUpdatingTopic] = useState<string | null>(null);
  const [practicingTopic, setPracticingTopic] = useState<Topic | null>(null);

  // ... existing functions ...

  return (
    <div className="space-y-4">
      {/* Practice Modal */}
      {practicingTopic && (
        <PracticeModal
          topic={practicingTopic}
          roadmapTitle="Learning Roadmap" // Ideally pass this prop down
          onClose={() => setPracticingTopic(null)}
        />
      )}

      {/* ... Accordion ... */}
      <Accordion type="multiple" defaultValue={phases.map((p) => p.id)} className="space-y-4">
        {phases.map((phase, phaseIndex) => {
          // ... existing map ...
              <AccordionContent>
                <div className="px-6 pb-6 pt-2 space-y-3">
                  {phase.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={cn(
                        'group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer',
                        topic.status === 'done'
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : topic.status === 'in-progress'
                            ? 'bg-amber-500/5 border-amber-500/20'
                            : 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900'
                      )}
                      onClick={() => onTopicClick(topic, phase.id)}
                    >
                      {/* ... existing topic content ... */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPracticingTopic(topic);
                        }}
                        className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-violet-400 hover:bg-zinc-700 transition-colors ml-2"
                        title="Practice Code"
                      >
                        <Code2 className="h-4 w-4" />
                      </button>
                      
                      <div className="flex items-center gap-4 shrink-0 text-zinc-500">
                        {/* ... existing time/chevron ... */}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

interface TopicContentProps {
  topic: Topic;
  onClose: () => void;
  onPractice: () => void;
}

export const TopicContent = ({ topic, onClose, onPractice }: TopicContentProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-start justify-between gap-6">
            <div>
              {/* ... badges ... */}
              <div className="flex items-center gap-3 mb-3">
                 {/* ... existing badges ... */}
              </div>
              <h2 className="text-2xl font-bold text-zinc-100">{topic.title}</h2>
              <p className="text-zinc-400 mt-2 text-base leading-relaxed">{topic.description}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                onClick={onPractice}
                className="gap-2 bg-violet-600 hover:bg-violet-700 text-white"
              >
                <Code2 className="h-4 w-4" />
                Practice
              </Button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* ... existing content ... */}
      </div>
    </div>
  );
};
