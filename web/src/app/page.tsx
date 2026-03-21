export default function Home() {
  return (
    <>
      <main className="workshop-app">
        <header className="workshop-hero" id="top">
          <div className="workshop-eyebrow">Strategist OS · Mobile</div>
          <h1>Direct intelligence with clarity, structure, and calm.</h1>
          <p>
            This app organizes the full Strategist Operating System into one visual flow. Start with
            intention, move into system thinking, question for leverage, act with precision, and
            reflect until wisdom becomes instinct.
          </p>

          <div className="workshop-memory">
            <div className="workshop-memory-label">Memorize the flow</div>
            <strong>DEFINE → MODEL → INTERROGATE → EXECUTE → REFLECT</strong>
          </div>

          <div className="workshop-mini-flow">
            <div className="workshop-mini-pill">
              Step 1 · Define (Yi) <span className="text-[var(--muted)]">Intent</span>
            </div>
            <div className="workshop-mini-pill">
              Step 2 · Model (Li) <span className="text-[var(--muted)]">System</span>
            </div>
            <div className="workshop-mini-pill">
              Step 3 · Interrogate <span className="text-[var(--muted)]">Questions</span>
            </div>
            <div className="workshop-mini-pill">
              Step 4 · Execute <span className="text-[var(--muted)]">Action</span>
            </div>
            <div className="workshop-mini-pill">
              Step 5 · Reflect <span className="text-[var(--muted)]">Refinement</span>
            </div>
          </div>
        </header>

        <section className="workshop-section" id="system">
          <div className="workshop-section-title">
            <h2>Core operating system</h2>
            <span>Tap any card to expand</span>
          </div>

          <details className="workshop-details-card" open>
            <summary>
              <div className="workshop-summary-grid">
                <div className="workshop-step-badge blue">01</div>
                <div>
                  <div className="workshop-step-kicker">Step 1</div>
                  <div className="workshop-step-title">DEFINE (Yi)</div>
                  <p className="workshop-step-sub">
                    Set direction before solving. This is your intent, your desired end state, and your
                    reason for entering the problem at all.
                  </p>
                </div>
                <div className="workshop-chev" aria-hidden>
                  ⌄
                </div>
              </div>
            </summary>
            <div className="workshop-card-body">
              <p className="workshop-lead">
                Define answers one question first: <strong>What am I trying to accomplish?</strong>{" "}
                Without this step, intelligence becomes scattered. With it, thinking gains direction.
              </p>

              <div className="workshop-callout">
                <strong>Yi is your chosen aim.</strong> It is not yet the system itself. It is the
                intention you bring into reality: the outcome, the time horizon, the constraints, and
                the standard for success.
              </div>

              <div className="workshop-info-grid">
                <div className="workshop-info-box">
                  <h3>What Define must answer</h3>
                  <ul>
                    <li>What is the outcome I want?</li>
                    <li>Why does it matter?</li>
                    <li>What are my real constraints?</li>
                    <li>How will I know this worked?</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h3>Good copy for your own prompts</h3>
                  <p>
                    “I want to achieve <strong>X</strong> within <strong>Y</strong> conditions, while
                    optimizing for <strong>Z</strong>.”
                  </p>
                </div>
              </div>

              <div className="workshop-muted-quote">
                “Intent sets direction. If the destination is vague, even perfect maps will not save
                you.”
              </div>
            </div>
          </details>

          <div className="workshop-arrow" aria-hidden>
            ↓
          </div>

          <details className="workshop-details-card" open>
            <summary>
              <div className="workshop-summary-grid">
                <div className="workshop-step-badge green">02</div>
                <div>
                  <div className="workshop-step-kicker">Step 2</div>
                  <div className="workshop-step-title">MODEL (Li)</div>
                  <p className="workshop-step-sub">
                    See the structure of reality. This is where you stop reacting to surface events and
                    begin seeing the system producing them.
                  </p>
                </div>
                <div className="workshop-chev" aria-hidden>
                  ⌄
                </div>
              </div>
            </summary>
            <div className="workshop-card-body">
              <p className="workshop-lead">
                Modeling is the discipline of asking: <strong>What system am I operating in?</strong>{" "}
                This is the heart of structured thinking. Inside Model lives the full five-part
                framework you practiced.
              </p>

              <div className="workshop-callout green">
                <strong>Important distinction:</strong> the goal in Define and the goal inside Model are
                related, but not identical. Define is <em>your chosen objective</em>. The goal inside
                Model is <em>what this system is actually designed to do</em>.
              </div>

              <div className="workshop-stack">
                <details className="workshop-details-nested" open>
                  <summary>
                    <div className="workshop-nested-top">
                      <div>
                        <div className="workshop-nested-label">Model framework</div>
                        <div className="workshop-nested-title">Goal</div>
                        <p className="workshop-nested-sub">What is this system actually trying to achieve?</p>
                      </div>
                      <div className="workshop-chev" aria-hidden>
                        ⌄
                      </div>
                    </div>
                  </summary>
                  <div className="workshop-nested-body">
                    <p>
                      This is the system-level aim. It must describe the function of the system, not just
                      your personal wish. A weak answer is vague. A strategist answer names quality,
                      duration, and real-world output.
                    </p>
                    <div className="workshop-chip-row">
                      <div className="workshop-chip">Weak: “Have energy”</div>
                      <div className="workshop-chip">Strong: “Sustain high-quality energy throughout the day”</div>
                    </div>
                  </div>
                </details>

                <details className="workshop-details-nested">
                  <summary>
                    <div className="workshop-nested-top">
                      <div>
                        <div className="workshop-nested-label">Model framework</div>
                        <div className="workshop-nested-title">Components</div>
                        <p className="workshop-nested-sub">What are the parts that make this system what it is?</p>
                      </div>
                      <div className="workshop-chev" aria-hidden>
                        ⌄
                      </div>
                    </div>
                  </summary>
                  <div className="workshop-nested-body">
                    <p>
                      Components include visible parts like people, tools, processes, and time blocks,
                      and hidden parts like emotional state, structure, trust, incentives, and rhythm. If
                      you miss key components, your strategy will be built on an incomplete map.
                    </p>
                  </div>
                </details>

                <details className="workshop-details-nested">
                  <summary>
                    <div className="workshop-nested-top">
                      <div>
                        <div className="workshop-nested-label">Model framework</div>
                        <div className="workshop-nested-title">Interactions</div>
                        <p className="workshop-nested-sub">How do the parts affect one another over time?</p>
                      </div>
                      <div className="workshop-chev" aria-hidden>
                        ⌄
                      </div>
                    </div>
                  </summary>
                  <div className="workshop-nested-body">
                    <p>
                      Interactions create chain reactions and feedback loops. This is where patterns come
                      from. Strategists do not merely list variables; they trace how one condition produces
                      another.
                    </p>
                    <ul>
                      <li>Positive loop: clarity → progress → confidence → stronger execution</li>
                      <li>Negative loop: confusion → mistakes → frustration → avoidance</li>
                    </ul>
                  </div>
                </details>

                <details className="workshop-details-nested">
                  <summary>
                    <div className="workshop-nested-top">
                      <div>
                        <div className="workshop-nested-label">Model framework</div>
                        <div className="workshop-nested-title">Constraints</div>
                        <p className="workshop-nested-sub">What limits the performance of the system?</p>
                      </div>
                      <div className="workshop-chev" aria-hidden>
                        ⌄
                      </div>
                    </div>
                  </summary>
                  <div className="workshop-nested-body">
                    <p>
                      Constraints are the reality you must design within: time, energy, environment, tools,
                      rules, training level, attention, fatigue, and available resources. Strategy is not
                      fantasy. Strategy is design under real conditions.
                    </p>
                  </div>
                </details>

                <details className="workshop-details-nested">
                  <summary>
                    <div className="workshop-nested-top">
                      <div>
                        <div className="workshop-nested-label">Model framework</div>
                        <div className="workshop-nested-title">Leverage</div>
                        <p className="workshop-nested-sub">Where does small change create disproportionate impact?</p>
                      </div>
                      <div className="workshop-chev" aria-hidden>
                        ⌄
                      </div>
                    </div>
                  </summary>
                  <div className="workshop-nested-body">
                    <p>
                      Leverage is where strategy lives. The strategist hunts for the 20% of variables that
                      drive 80% of outcomes. If you see leverage, you stop wasting effort and begin moving
                      systems.
                    </p>
                    <div className="workshop-chip-row">
                      <div className="workshop-chip">Not brute force</div>
                      <div className="workshop-chip">Not random action</div>
                      <div className="workshop-chip">Targeted influence</div>
                    </div>
                  </div>
                </details>
              </div>

              <div className="workshop-muted-quote">“Do not fight problems directly. Find the system producing them.”</div>
            </div>
          </details>

          <div className="workshop-arrow" aria-hidden>
            ↓
          </div>

          <details className="workshop-details-card">
            <summary>
              <div className="workshop-summary-grid">
                <div className="workshop-step-badge amber">03</div>
                <div>
                  <div className="workshop-step-kicker">Step 3</div>
                  <div className="workshop-step-title">INTERROGATE</div>
                  <p className="workshop-step-sub">
                    Question the system until leverage becomes visible. This is the bridge between raw
                    information and extracted intelligence.
                  </p>
                </div>
                <div className="workshop-chev" aria-hidden>
                  ⌄
                </div>
              </div>
            </summary>
            <div className="workshop-card-body">
              <p className="workshop-lead">
                After you model the system, you interrogate it. You ask sharper questions than surface
                thinking would ever ask. This is how elite questioning turns a model into strategy.
              </p>

              <div className="workshop-info-grid">
                <div className="workshop-info-box">
                  <h3>Five elite question types</h3>
                  <ul>
                    <li>
                      <strong>First principles:</strong> What are the fundamental truths here?
                    </li>
                    <li>
                      <strong>Blind spots:</strong> What am I not seeing?
                    </li>
                    <li>
                      <strong>Lever identification:</strong> What matters most?
                    </li>
                    <li>
                      <strong>Optimization:</strong> How do we make this 10x better?
                    </li>
                    <li>
                      <strong>Strategic path:</strong> What is the most efficient sequence of moves?
                    </li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h3>Copywriting pattern</h3>
                  <p>
                    “Given this model, what is most likely to break, what is highest leverage, and what move
                    changes the whole field?”
                  </p>
                </div>
              </div>

              <div className="workshop-callout amber">
                A weak user asks, “What should I do?” A strategist asks, “What are the leverage points,
                risks, and highest-probability sequence?”
              </div>
            </div>
          </details>

          <div className="workshop-arrow" aria-hidden>
            ↓
          </div>

          <details className="workshop-details-card">
            <summary>
              <div className="workshop-summary-grid">
                <div className="workshop-step-badge red">04</div>
                <div>
                  <div className="workshop-step-kicker">Step 4</div>
                  <div className="workshop-step-title">EXECUTE</div>
                  <p className="workshop-step-sub">
                    Turn leverage into motion. Action matters, but only after direction and structure are
                    clear.
                  </p>
                </div>
                <div className="workshop-chev" aria-hidden>
                  ⌄
                </div>
              </div>
            </summary>
            <div className="workshop-card-body">
              <p className="workshop-lead">
                Execution is the sequence of moves that acts on leverage. Good execution is not frantic.
                It is chosen, ordered, and measurable.
              </p>
              <div className="workshop-info-grid">
                <div className="workshop-info-box">
                  <h3>Execution questions</h3>
                  <ul>
                    <li>What is the next move?</li>
                    <li>What order should actions happen in?</li>
                    <li>Which action has the highest upside with lowest friction?</li>
                    <li>How will I measure whether this worked?</li>
                  </ul>
                </div>
              </div>
              <div className="workshop-callout red">
                Strategy without action is philosophy. Action without strategy is noise. Execution is where
                insight becomes reality.
              </div>
            </div>
          </details>

          <div className="workshop-arrow" aria-hidden>
            ↓
          </div>

          <details className="workshop-details-card">
            <summary>
              <div className="workshop-summary-grid">
                <div className="workshop-step-badge purple">05</div>
                <div>
                  <div className="workshop-step-kicker">Step 5</div>
                  <div className="workshop-step-title">REFLECT</div>
                  <p className="workshop-step-sub">
                    Refinement turns one action into accumulated wisdom. Reflection is how the strategist
                    becomes sharper over time.
                  </p>
                </div>
                <div className="workshop-chev" aria-hidden>
                  ⌄
                </div>
              </div>
            </summary>
            <div className="workshop-card-body">
              <p className="workshop-lead">
                Reflection asks whether your action moved reality closer to the aim. This is how you stop
                repeating mistakes and start building judgment.
              </p>
              <div className="workshop-info-grid">
                <div className="workshop-info-box">
                  <h3>Reflection prompts</h3>
                  <ul>
                    <li>What worked?</li>
                    <li>What failed?</li>
                    <li>What changed in the system?</li>
                    <li>What should I keep, remove, or refine?</li>
                  </ul>
                </div>
              </div>
              <div className="workshop-callout purple">
                Calm reflection is not hesitation. It is the discipline that converts experience into
                foresight.
              </div>
            </div>
          </details>
        </section>

        <section className="workshop-section" id="examples">
          <div className="workshop-section-title">
            <h2>Worked examples</h2>
            <span>Three systems you practiced</span>
          </div>

          <div className="workshop-examples-intro">
            <div className="workshop-divider-label">How to use these</div>
            <p className="workshop-lead mt-0 mb-2">
              Each example starts with a scenario, then walks through the five-part Model framework: Goal,
              Components, Interactions, Constraints, and Leverage. Use them as templates for your own
              real-life thinking.
            </p>
            <p className="workshop-small">
              Remember: Define sets your direction. Model shows the structure. These examples are
              demonstrations of Step 2 in practice.
            </p>
          </div>

          <details className="workshop-details-example" open>
            <summary>
              <div className="workshop-example-top">
                <div>
                  <div className="workshop-example-label">Example 1</div>
                  <div className="workshop-example-title">Personal Energy System</div>
                  <p className="workshop-example-sub">
                    Scenario: Some days you wake up clear and energized. Other days you feel foggy,
                    distracted, and low-energy. You want to understand why your energy fluctuates and how to
                    stabilize it.
                  </p>
                </div>
                <div className="workshop-chev" aria-hidden>
                  ⌄
                </div>
              </div>
            </summary>
            <div className="workshop-example-body">
              <div className="workshop-stack mt-[14px]">
                <div className="workshop-info-box">
                  <h4>Goal</h4>
                  <p>Sustain high-quality physical, mental, and emotional energy throughout the day.</p>
                </div>
                <div className="workshop-info-box">
                  <h4>Components</h4>
                  <ul>
                    <li>Sleep quality and timing</li>
                    <li>Nutrition timing and food quality</li>
                    <li>Hydration</li>
                    <li>Movement and exercise</li>
                    <li>Stress and emotional state</li>
                    <li>Environment: light, noise, routine, space</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Interactions</h4>
                  <ul>
                    <li>Poor sleep → lower energy → weaker food choices → bigger crash later</li>
                    <li>Good morning routine → stronger momentum → calmer mood → better output</li>
                    <li>Stress → mental fatigue → lower clarity → less effective decisions</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Constraints</h4>
                  <ul>
                    <li>Work schedule</li>
                    <li>Physical fatigue</li>
                    <li>Limited time</li>
                    <li>Environmental inconsistency</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Leverage</h4>
                  <ul>
                    <li>Sleep timing consistency</li>
                    <li>First meal quality</li>
                    <li>Early hydration</li>
                    <li>Simple morning routine</li>
                  </ul>
                </div>
              </div>
              <div className="workshop-muted-quote">
                The lesson: do not label yourself “low energy.” Find the system conditions producing the
                feeling.
              </div>
            </div>
          </details>

          <details className="workshop-details-example">
            <summary>
              <div className="workshop-example-top">
                <div>
                  <div className="workshop-example-label">Example 2</div>
                  <div className="workshop-example-title">Learning System (ASVAB / Math)</div>
                  <p className="workshop-example-sub">
                    Scenario: Some topics click quickly, some feel difficult, retention is inconsistent, and
                    your performance varies. You want to understand how your learning process works so you
                    can improve it.
                  </p>
                </div>
                <div className="workshop-chev" aria-hidden>
                  ⌄
                </div>
              </div>
            </summary>
            <div className="workshop-example-body">
              <div className="workshop-stack mt-[14px]">
                <div className="workshop-info-box">
                  <h4>Goal</h4>
                  <p>Build deep understanding and reliable problem-solving speed under test conditions.</p>
                </div>
                <div className="workshop-info-box">
                  <h4>Components</h4>
                  <ul>
                    <li>Concept understanding</li>
                    <li>Input: lessons and explanations</li>
                    <li>Practice problems</li>
                    <li>Feedback and correction</li>
                    <li>Progression structure</li>
                    <li>Focus level and emotional state</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Interactions</h4>
                  <ul>
                    <li>Clear explanation → better practice → confidence → stronger retention</li>
                    <li>Confusion → mistakes → frustration → avoidance → slower growth</li>
                    <li>Good feedback → corrected thinking → higher accuracy next round</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Constraints</h4>
                  <ul>
                    <li>Limited time</li>
                    <li>Mental fatigue</li>
                    <li>Topics with uneven difficulty</li>
                    <li>Performance pressure</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Leverage</h4>
                  <ul>
                    <li>Principle → Example → Practice</li>
                    <li>Progressive drills from easy to elite</li>
                    <li>Immediate feedback</li>
                    <li>Extracting the pattern after each problem</li>
                  </ul>
                </div>
              </div>
              <div className="workshop-muted-quote">
                The lesson: learning improves fastest when the system is designed well, not when effort is
                merely increased.
              </div>
            </div>
          </details>

          <details className="workshop-details-example">
            <summary>
              <div className="workshop-example-top">
                <div>
                  <div className="workshop-example-label">Example 3</div>
                  <div className="workshop-example-title">You + AI System</div>
                  <p className="workshop-example-sub">
                    Scenario: Sometimes AI gives powerful insights, sometimes answers feel generic, and
                    sometimes you do not know what to ask. You want to consistently extract high-quality
                    intelligence.
                  </p>
                </div>
                <div className="workshop-chev" aria-hidden>
                  ⌄
                </div>
              </div>
            </summary>
            <div className="workshop-example-body">
              <div className="workshop-stack mt-[14px]">
                <div className="workshop-info-box">
                  <h4>Goal</h4>
                  <p>
                    Consistently extract high-quality, actionable intelligence that improves thinking,
                    decisions, and execution.
                  </p>
                </div>
                <div className="workshop-info-box">
                  <h4>Components</h4>
                  <ul>
                    <li>You: clarity, structure, patience, context</li>
                    <li>AI: reasoning, pattern synthesis, response generation</li>
                    <li>Prompt quality</li>
                    <li>Response quality</li>
                    <li>Feedback loop and refinement</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Interactions</h4>
                  <ul>
                    <li>Clear prompt → strong answer → better thinking → stronger next prompt</li>
                    <li>Vague prompt → generic answer → confusion → weaker follow-up</li>
                    <li>More context → more targeted reasoning → more useful output</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Constraints</h4>
                  <ul>
                    <li>Unclear thinking</li>
                    <li>Lack of structure</li>
                    <li>Limited context</li>
                    <li>Fatigue and attention limits</li>
                  </ul>
                </div>
                <div className="workshop-info-box">
                  <h4>Leverage</h4>
                  <ul>
                    <li>Clear intent before asking</li>
                    <li>Structured prompts</li>
                    <li>Iterating instead of accepting the first answer</li>
                    <li>Asking for principles, blind spots, and leverage points</li>
                  </ul>
                </div>
              </div>
              <div className="workshop-muted-quote">
                The lesson: AI often mirrors the quality of your thinking. Better input creates better
                intelligence.
              </div>
            </div>
          </details>
        </section>

        <section className="workshop-section" id="lesson">
          <div className="workshop-section-title">
            <h2>Daily review</h2>
            <span>One screen summary</span>
          </div>

          <div className="workshop-examples-intro">
            <div className="workshop-divider-label">Review prompt</div>
            <p className="workshop-lead mt-0">
              Before entering any problem, ask: <strong>What do I want?</strong>
              Then ask: <strong>What system is producing this situation?</strong>
              Then ask: <strong>What am I missing, and where is the leverage?</strong>
            </p>
            <div className="workshop-chip-row">
              <div className="workshop-chip">Define the aim</div>
              <div className="workshop-chip">Model the system</div>
              <div className="workshop-chip">Interrogate for leverage</div>
              <div className="workshop-chip">Execute with sequence</div>
              <div className="workshop-chip">Reflect and refine</div>
            </div>
          </div>
        </section>
      </main>

      <nav className="workshop-tabbar" aria-label="Section navigation">
        <a href="#top">Top</a>
        <a href="#system">System</a>
        <a href="#examples">Examples</a>
        <a href="#lesson">Review</a>
      </nav>
    </>
  );
}
